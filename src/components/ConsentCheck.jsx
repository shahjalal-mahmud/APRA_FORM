export default function ConsentCheck({ questionId, options, value, onChange, error }) {
  return (
    <div id={`q-${questionId}`} className="flex flex-col gap-3">
      {options.map((option, idx) => {
        const isSelected = value === option
        // "agree" / "confirm" options are positive (idx 0), rest are decline
        const isPositive = idx === 0
        return (
          <label
            key={idx}
            className={`
              flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-150 select-none
              ${isSelected
                ? isPositive
                  ? 'border-success bg-success/8 text-success'
                  : 'border-error bg-error/8 text-error'
                : 'border-base-300 bg-base-100 text-base-content hover:border-base-content/30 hover:bg-base-200/50'
              }
            `}
          >
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={isSelected}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span className={`
              flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center
              transition-all duration-150
              ${isSelected
                ? isPositive ? 'border-success bg-success' : 'border-error bg-error'
                : 'border-base-content/30 bg-base-100'
              }
            `}>
              {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium leading-relaxed">{option}</span>
          </label>
        )
      })}

      {error && (
        <p className="mt-1 text-xs text-error flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}