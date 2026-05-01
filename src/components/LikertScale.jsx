const LABELS = {
  1: 'Strongly\nDisagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly\nAgree',
}

const COLOR_CLASSES = {
  1: {
    selected: 'bg-error text-error-content border-error',
    hover: 'hover:border-error hover:text-error',
  },
  2: {
    selected: 'bg-warning text-warning-content border-warning',
    hover: 'hover:border-warning hover:text-warning',
  },
  3: {
    selected: 'bg-base-content text-base-100 border-base-content',
    hover: 'hover:border-base-content hover:text-base-content',
  },
  4: {
    selected: 'bg-success text-success-content border-success',
    hover: 'hover:border-success hover:text-success',
  },
  5: {
    selected: 'bg-success text-success-content border-success',
    hover: 'hover:border-success hover:text-success',
  },
}

export default function LikertScale({ questionId, value, onChange, error }) {
  return (
    <div id={`q-${questionId}`} className="w-full">
      {/* Mobile: vertical stack with full labels */}
      <div className="flex flex-col gap-2 sm:hidden">
        {[1, 2, 3, 4, 5].map(n => {
          const isSelected = value === n
          const colors = COLOR_CLASSES[n]
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 text-left
                transition-all duration-150 font-medium
                ${isSelected
                  ? `${colors.selected} shadow-sm`
                  : `border-base-300 bg-base-100 text-base-content ${colors.hover}`
                }
              `}
            >
              <span className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2
                ${isSelected ? 'border-current bg-white/20' : 'border-current/30'}
              `}>
                {n}
              </span>
              <span className="text-sm">{LABELS[n].replace('\n', ' ')}</span>
            </button>
          )
        })}
      </div>

      {/* Desktop: horizontal pill group */}
      <div className="hidden sm:flex gap-2 justify-between">
        {[1, 2, 3, 4, 5].map(n => {
          const isSelected = value === n
          const colors = COLOR_CLASSES[n]
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                flex-1 flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border-2
                transition-all duration-150 cursor-pointer
                ${isSelected
                  ? `${colors.selected} shadow-sm scale-[1.03]`
                  : `border-base-300 bg-base-100 text-base-content/70 ${colors.hover}`
                }
              `}
            >
              <span className="text-lg font-bold">{n}</span>
              <span className="text-[10px] text-center leading-tight font-medium whitespace-pre-line">
                {LABELS[n]}
              </span>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs text-error flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}