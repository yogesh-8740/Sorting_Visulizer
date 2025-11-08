"use client"

import { forwardRef, useEffect, useState } from "react"
import { generateArray, bubbleSort, insertionSort, selectionSort, quickSort, mergeSort } from "@/lib/sorting-algorithms"

interface CanvasProps {
  arraySize: number
  algorithm: string
  isRunning: boolean
  ascending: boolean
  speed: number
  onStatsUpdate?: (stats: SortStats) => void
}

export interface SortStats {
  comparisons: number
  swaps: number
  elapsedTime: number
}

const SortingCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ arraySize, algorithm, isRunning, ascending, speed, onStatsUpdate }, ref) => {
    const [array, setArray] = useState<number[]>([])
    const [comparingIndices, setComparingIndices] = useState<number[]>([])
    const [sortedIndices, setSortedIndices] = useState<number[]>([])
    const [isSorting, setIsSorting] = useState(false)
    const [stats, setStats] = useState<SortStats>({ comparisons: 0, swaps: 0, elapsedTime: 0 })
    const startTimeRef = useState<number>(0)[1]
    const sortGeneratorRef = useRef<Generator<{ array: number[]; comparing: number[]; sorted: number[] }, void> | null>(
      null,
    )

    // Initialize array
    useEffect(() => {
      const newArray = generateArray(arraySize)
      setArray(newArray)
      setComparingIndices([])
      setSortedIndices([])
      setStats({ comparisons: 0, swaps: 0, elapsedTime: 0 })
    }, [arraySize])

    // Sorting execution loop
    useEffect(() => {
      if (!isRunning || isSorting) return

      const delay = 101 - speed
      const startTime = Date.now()

      const runSort = async () => {
        setIsSorting(true)

        // Generate sort generator based on algorithm
        let generator
        if (algorithm === "bubble") {
          generator = bubbleSort([...array], ascending)
        } else if (algorithm === "insertion") {
          generator = insertionSort([...array], ascending)
        } else if (algorithm === "selection") {
          generator = selectionSort([...array], ascending)
        } else if (algorithm === "quick") {
          generator = quickSort([...array], ascending)
        } else if (algorithm === "merge") {
          generator = mergeSort([...array], ascending)
        }

        let stepCount = 0
        while (generator) {
          const { value, done } = generator.next()

          if (done) break

          setArray(value.array)
          setComparingIndices(value.comparing)
          setSortedIndices(value.sorted)

          stepCount++
          const newStats = {
            comparisons: stepCount,
            swaps: stepCount,
            elapsedTime: Date.now() - startTime,
          }
          setStats(newStats)
          onStatsUpdate?.(newStats)

          await new Promise((resolve) => setTimeout(resolve, delay))
        }

        setSortedIndices([...Array(array.length).keys()])
        setComparingIndices([])
        setStats((prev) => ({ ...prev, elapsedTime: Date.now() - startTime }))
        setIsSorting(false)
      }

      runSort()
    }, [isRunning, algorithm, ascending, speed, array, arraySize, isSorting, onStatsUpdate])

    // Canvas rendering
    useEffect(() => {
      if (!ref || typeof ref === "function") return

      const canvas = ref.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = width
      canvas.height = height

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "#1a1a2e")
      gradient.addColorStop(1, "#0f0f1e")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      if (array.length === 0) return

      const barWidth = width / array.length
      const maxVal = Math.max(...array)
      const padding = 10

      array.forEach((val, idx) => {
        const barHeight = (val / maxVal) * (height - padding * 2)
        const x = idx * barWidth
        const y = height - barHeight - padding

        if (sortedIndices.includes(idx)) {
          ctx.fillStyle = "#10b981" // Green - sorted
        } else if (comparingIndices.includes(idx)) {
          ctx.fillStyle = "#ff6b6b" // Red - comparing
        } else {
          ctx.fillStyle = "#6366f1" // Indigo - default
        }

        // Draw bar with rounded corners effect
        ctx.beginPath()
        ctx.moveTo(x + 2, y + barHeight)
        ctx.lineTo(x + 2, y + 4)
        ctx.quadraticCurveTo(x + 2, y, x + 4, y)
        ctx.lineTo(x + barWidth - 4, y)
        ctx.quadraticCurveTo(x + barWidth - 2, y, x + barWidth - 2, y + 4)
        ctx.lineTo(x + barWidth - 2, y + barHeight)
        ctx.fill()
      })

      // Draw grid lines for reference
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const y = (height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }, [array, comparingIndices, sortedIndices, ref])

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {algorithm.toUpperCase()} - {ascending ? "Ascending" : "Descending"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {arraySize} elements • Speed: {speed}%
            </p>
          </div>
          <div className="text-sm text-muted-foreground space-y-1 text-right">
            <p>
              Comparisons: <span className="text-primary font-semibold">{stats.comparisons}</span>
            </p>
            <p>
              Time: <span className="text-primary font-semibold">{(stats.elapsedTime / 1000).toFixed(2)}s</span>
            </p>
          </div>
        </div>
        <canvas
          ref={ref}
          width={800}
          height={300}
          className="w-full border border-border rounded-md bg-linear-to-b from-card to-background"
        />
      </div>
    )
  },
)

SortingCanvas.displayName = "SortingCanvas"

import { useRef } from "react"

export default SortingCanvas
