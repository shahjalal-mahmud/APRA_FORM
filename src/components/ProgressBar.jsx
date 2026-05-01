export default function ProgressBar({ currentIndex, total }) {
  const percent = Math.round((currentIndex / total) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-base-content/60 tracking-wide uppercase">
          Section {currentIndex + 1} of {total}
        </span>
        <span className="text-xs font-semibold text-primary">
          {percent}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-base-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}