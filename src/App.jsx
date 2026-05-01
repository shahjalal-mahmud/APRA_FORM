import { useFormState } from './hooks/useFormState'
import ProgressBar from './components/ProgressBar'
import SectionPage from './components/SectionPage'

function ThankYouScreen() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center gap-5 py-12">
          <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-base-content">Thank You!</h1>
            <p className="text-base-content/60 text-sm leading-relaxed">
              Your responses have been submitted successfully. Your participation in this research is greatly appreciated.
            </p>
          </div>
          <div className="divider my-0" />
          <p className="text-xs text-base-content/40 leading-relaxed">
            Hidden AI in Peer Review: Investigating the Impact of Undisclosed LLM Usage on Fairness and Trust
          </p>
        </div>
      </div>
    </div>
  )
}

function ErrorScreen({ onRetry }) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center gap-5 py-12">
          <div className="w-20 h-20 rounded-full bg-error/15 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-base-content">Submission Failed</h1>
            <p className="text-base-content/60 text-sm leading-relaxed">
              Something went wrong while submitting your responses. Your answers are saved — please try again.
            </p>
          </div>
          <button
            onClick={onRetry}
            className="btn btn-primary btn-wide"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const {
    sections,
    currentSection,
    currentSectionIndex,
    totalSections,
    isFirstSection,
    isLastSection,
    answers,
    errors,
    submitStatus,
    setAnswer,
    goNext,
    goBack,
    submitForm,
    retrySubmit,
  } = useFormState()

  if (submitStatus === 'success') return <ThankYouScreen />
  if (submitStatus === 'error') return <ErrorScreen onRetry={retrySubmit} />

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-300 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xs font-semibold text-base-content/70 leading-tight line-clamp-1">
              Hidden AI in Peer Review — Research Survey
            </h1>
          </div>
          {/* Progress */}
          <ProgressBar currentIndex={currentSectionIndex} total={totalSections} />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-32">
        <SectionPage
          section={currentSection}
          answers={answers}
          errors={errors}
          onAnswer={setAnswer}
        />
      </main>

      {/* Sticky bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-sm border-t border-base-300 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={goBack}
            disabled={isFirstSection}
            className="btn btn-ghost btn-sm gap-1.5 flex-shrink-0 disabled:opacity-30"
            aria-label="Go to previous section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Section dots — hidden on very small screens */}
          <div className="hidden xs:flex flex-1 justify-center gap-1 overflow-hidden px-2">
            {sections.map((_, i) => (
              <div
                key={i}
                className={`
                  h-1.5 rounded-full transition-all duration-300 flex-shrink-0
                  ${i === currentSectionIndex
                    ? 'w-5 bg-primary'
                    : i < currentSectionIndex
                    ? 'w-1.5 bg-primary/40'
                    : 'w-1.5 bg-base-300'
                  }
                `}
              />
            ))}
          </div>

          <div className="flex-1 xs:flex-none" />

          {/* Next / Submit button */}
          {isLastSection ? (
            <button
              onClick={submitForm}
              disabled={submitStatus === 'loading'}
              className="btn btn-primary btn-sm gap-1.5 min-w-24"
            >
              {submitStatus === 'loading' ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Submitting
                </>
              ) : (
                <>
                  Submit
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={goNext}
              className="btn btn-primary btn-sm gap-1.5 min-w-24"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}