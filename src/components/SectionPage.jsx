import QuestionRenderer from './QuestionRenderer'

// Section icon mapping
const SECTION_ICONS = {
  1: '👤',
  2: '🎓',
  3: '🤖',
  4: '⚙️',
  5: '🔍',
  6: '⚡',
  7: '✨',
  8: '⚠️',
  9: '⚖️',
  10: '🔒',
  11: '📊',
  12: '✍️',
}

export default function SectionPage({ section, answers, errors, onAnswer }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-base-300">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-hidden="true">
            {SECTION_ICONS[section.id] || '📋'}
          </span>
          <h2 className="text-xl font-bold text-base-content">
            {section.title}
          </h2>
        </div>
        {section.description && (
          <p className="text-sm text-base-content/60 leading-relaxed pl-10">
            {section.description}
          </p>
        )}
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-8">
        {section.questions.map((question, idx) => (
          <div
            key={question.id}
            className={`
              rounded-2xl p-4 sm:p-5 border transition-all duration-200
              ${errors[question.id]
                ? 'border-error/40 bg-error/3'
                : 'border-base-200 bg-base-100'
              }
            `}
          >
            <QuestionRenderer
              question={question}
              value={answers[question.id]}
              onChange={val => onAnswer(question.id, val)}
              error={errors[question.id]}
              index={idx}
            />
          </div>
        ))}
      </div>
    </div>
  )
}