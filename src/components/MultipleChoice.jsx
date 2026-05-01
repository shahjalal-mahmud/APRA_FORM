export default function MultipleChoice({ questionId, options, value, onChange, error }) {
  return (
    <div id={`q-${questionId}`} className="flex flex-col gap-2">
      {options.map((option, idx) => {
        const isSelected = value === option
        return (
          <label
            key={idx}
            className={`
              flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-150 select-none
              ${isSelected
                ? 'border-primary bg-primary/8 text-primary'
                : 'border-base-300 bg-base-100 text-base-content hover:border-primary/40 hover:bg-base-200/50'
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
              flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-150
              ${isSelected ? 'border-primary' : 'border-base-content/30'}
            `}>
              {isSelected && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
              )}
            </span>
            <span className="text-sm font-medium leading-snug">{option}</span>
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