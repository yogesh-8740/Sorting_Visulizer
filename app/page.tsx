"use client"

import { useState, useRef } from "react"
import SortingCanvas, { type SortStats } from "@/components/sorting-canvas"
import ControlPanel from "@/components/control-panel"
import Header from "@/components/header"

export default function Home() {
  const [arraySize, setArraySize] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [algorithm, setAlgorithm] = useState<"bubble" | "insertion" | "selection" | "quick" | "merge">("bubble")
  const [ascending, setAscending] = useState(true)
  const [speed, setSpeed] = useState(50)
  const [stats, setStats] = useState<SortStats>({ comparisons: 0, swaps: 0, elapsedTime: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border border-border p-6">
              <SortingCanvas
                ref={canvasRef}
                arraySize={arraySize}
                algorithm={algorithm}
                isRunning={isRunning}
                ascending={ascending}
                speed={speed}
                onStatsUpdate={setStats}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-1">
            <ControlPanel
              arraySize={arraySize}
              setArraySize={setArraySize}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              ascending={ascending}
              setAscending={setAscending}
              speed={speed}
              setSpeed={setSpeed}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
