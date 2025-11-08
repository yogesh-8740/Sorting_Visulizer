export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Sorting Visualizer</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Watch sorting algorithms in action • Learn algorithm complexity
            </p>
          </div>
          <div className="hidden md:block text-right text-sm text-muted-foreground">
            <p>5 Algorithms</p>
            <p className="text-xs mt-1">React + Next.js</p>
          </div>
        </div>
      </div>
    </header>
  )
}
