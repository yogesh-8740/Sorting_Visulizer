"use client"
import { Play, Pause, RotateCcw, Settings2 } from "lucide-react"
import { useState } from "react"

interface ControlPanelProps {
  arraySize: number
  setArraySize: (size: number) => void
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  algorithm: string
  setAlgorithm: (algo: "bubble" | "insertion" | "selection" | "quick" | "merge") => void
  ascending: boolean
  setAscending: (asc: boolean) => void
  speed: number
  setSpeed: (speed: number) => void
}

export default function ControlPanel({
  arraySize,
  setArraySize,
  isRunning,
  setIsRunning,
  algorithm,
  setAlgorithm,
  ascending,
  setAscending,
  speed,
  setSpeed,
}: ControlPanelProps) {
  const algorithms: Array<"bubble" | "insertion" | "selection" | "quick" | "merge"> = [
    "bubble",
    "insertion",
    "selection",
    "quick",
    "merge",
  ]
  const algorithmInfo: Record<string, string> = {
    bubble: "O(n²) - Simple but slow",
    insertion: "O(n²) - Good for small data",
    selection: "O(n²) - Minimal swaps",
    quick: "O(n log n) - Fast average",
    merge: "O(n log n) - Stable sort",
  }

  const [showInfo, setShowInfo] = useState(false)

  const handleReset = () => {
    setIsRunning(false)
    window.location.reload()
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 h-fit sticky top-4">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Controls</h2>
      </div>

      {/* Algorithm Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Algorithm</label>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 hover:bg-muted rounded transition-colors"
            title="Show algorithm info"
          >
            <Settings2 size={16} className="text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-2">
          {algorithms.map((algo) => (
            <div key={algo}>
              <button
                onClick={() => {
                  if (!isRunning) setAlgorithm(algo)
                }}
                disabled={isRunning}
                className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  algorithm === algo
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {algo.charAt(0).toUpperCase() + algo.slice(1)}
              </button>
              {showInfo && algorithm === algo && (
                <p className="text-xs text-muted-foreground mt-1 px-2 py-1 bg-background rounded">
                  {algorithmInfo[algo]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Array Size */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Array Size: <span className="text-primary">{arraySize}</span>
        </label>
        <input
          type="range"
          min="10"
          max="200"
          value={arraySize}
          onChange={(e) => {
            if (!isRunning) setArraySize(Number(e.target.value))
          }}
          disabled={isRunning}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>10</span>
          <span>200</span>
        </div>
      </div>

      {/* Speed */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Speed: <span className="text-primary">{speed}%</span>
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Sort Direction */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Direction</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!isRunning) setAscending(true)
            }}
            disabled={isRunning}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              ascending ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ↑ Ascending
          </button>
          <button
            onClick={() => {
              if (!isRunning) setAscending(false)
            }}
            disabled={isRunning}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              !ascending ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ↓ Descending
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <Pause size={18} />
              Pause
            </>
          ) : (
            <>
              <Play size={18} />
              Start
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-md font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Info */}
      <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
        <p>
          • <span className="text-[#10b981]">Green</span>: Sorted
        </p>
        <p>
          • <span className="text-[#ff6b6b]">Red</span>: Comparing
        </p>
        <p>
          • <span className="text-[#6366f1]">Indigo</span>: Unsorted
        </p>
      </div>
    </div>
  )
}
