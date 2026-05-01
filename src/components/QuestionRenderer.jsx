import LikertScale from './LikertScale'
import MultipleChoice from './MultipleChoice'
import ConsentCheck from './ConsentCheck'

function TextInput({ question, value, onChange, error }) {
  const inputProps = {
    id: `input-${question.id}`,
    value: value || '',
    onChange: e => onChange(e.target.value),
    placeholder: question.placeholder || '',
    className: `input input-bordered w-full text-base ${error ? 'input-error' : ''}`,
  }

  return (
    <div id={`q-${question.id}`}>
      {question.type === 'email' && <input type="email" {...inputProps} />}
      {question.type === 'tel' && <input type="tel" {...inputProps} />}
      {question.type === 'text' && <input type="text" {...inputProps} />}
      {question.type === 'date' && (
        <input
          type="date"
          id={`input-${question.id}`}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={`input input-bordered w-full text-base ${error ? 'input-error' : ''}`}
        />
      )}
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

export default function QuestionRenderer({ question, value, onChange, error, index }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Question label */}
      <div className="flex gap-2.5 items-start">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`input-${question.id}`}
            className="text-sm font-semibold text-base-content leading-relaxed"
          >
            {question.label}
            {question.required && (
              <span className="text-error ml-1" aria-label="required">*</span>
            )}
          </label>
          {question.help_text && (
            <p className="text-xs text-base-content/50 leading-relaxed">
              {question.help_text}
            </p>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="pl-8">
        {(question.type === 'text' || question.type === 'email' || question.type === 'tel' || question.type === 'date') && (
          <TextInput question={question} value={value} onChange={onChange} error={error} />
        )}

        {question.type === 'likert' && (
          <LikertScale
            questionId={question.id}
            value={value}
            onChange={onChange}
            error={error}
          />
        )}

        {question.type === 'single_choice' && (
          <MultipleChoice
            questionId={question.id}
            options={question.options}
            value={value}
            onChange={onChange}
            error={error}
          />
        )}

        {question.type === 'single_checkbox' && (
          <ConsentCheck
            questionId={question.id}
            options={question.options}
            value={value}
            onChange={onChange}
            error={error}
          />
        )}
      </div>
    </div>
  )
}