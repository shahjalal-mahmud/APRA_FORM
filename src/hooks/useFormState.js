import { useState, useCallback } from 'react'
import questionsData from '../data/questions.json'

const STORAGE_KEY = 'apra_survey_answers'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveToStorage(answers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // ignore storage errors
  }
}

export function useFormState() {
  const totalSections = questionsData.sections.length
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [answers, setAnswers] = useState(() => loadFromStorage())
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState('idle') // idle | loading | success | error

  const currentSection = questionsData.sections[currentSectionIndex]
  const isLastSection = currentSectionIndex === totalSections - 1
  const isFirstSection = currentSectionIndex === 0

  const setAnswer = useCallback((questionId, value) => {
    setAnswers(prev => {
      const next = { ...prev, [questionId]: value }
      saveToStorage(next)
      return next
    })
    setErrors(prev => {
      if (prev[questionId]) {
        const next = { ...prev }
        delete next[questionId]
        return next
      }
      return prev
    })
  }, [])

  function validateSection(section) {
    const newErrors = {}
    for (const q of section.questions) {
      if (!q.required) continue
      const val = answers[q.id]
      if (val === undefined || val === null || val === '') {
        newErrors[q.id] = 'This field is required.'
      }
    }
    return newErrors
  }

  function goNext() {
    const errs = validateSection(currentSection)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // scroll to first error
      const firstId = Object.keys(errs)[0]
      setTimeout(() => {
        const el = document.getElementById(`q-${firstId}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }
    setErrors({})
    setCurrentSectionIndex(i => Math.min(i + 1, totalSections - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setErrors({})
    setCurrentSectionIndex(i => Math.max(i - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submitForm() {
    const errs = validateSection(currentSection)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitStatus('loading')

    // Flatten answers into a row object with readable labels
    const row = {}
    for (const section of questionsData.sections) {
      for (const q of section.questions) {
        row[q.id] = answers[q.id] ?? ''
      }
    }
    row['submitted_at'] = new Date().toISOString()

    try {
      const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL
      if (!SCRIPT_URL) throw new Error('VITE_GOOGLE_SCRIPT_URL not set')

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      })

      // no-cors means we can't read the response, assume success
      setSubmitStatus('success')
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitStatus('error')
    }
  }

  function retrySubmit() {
    setSubmitStatus('idle')
  }

  const overallProgress = Math.round(
    ((currentSectionIndex) / totalSections) * 100
  )

  return {
    sections: questionsData.sections,
    currentSection,
    currentSectionIndex,
    totalSections,
    isFirstSection,
    isLastSection,
    answers,
    errors,
    submitStatus,
    overallProgress,
    setAnswer,
    goNext,
    goBack,
    submitForm,
    retrySubmit,
  }
}