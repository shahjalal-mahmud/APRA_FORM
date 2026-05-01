/**
 * Google Apps Script — Paste this entire file into your Apps Script editor.
 *
 * Setup steps:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Delete any existing code and paste this entire file
 * 3. Click "Save" (floppy disk icon)
 * 4. Click "Deploy" → "New deployment"
 * 5. Type: Web App
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click "Deploy" and copy the Web App URL
 * 9. Paste that URL into your .env file as VITE_GOOGLE_SCRIPT_URL
 *
 * IMPORTANT: Every time you edit this script, you must create a NEW deployment
 * (not update the existing one) for changes to take effect.
 */

// Column headers — must match question IDs from questions.json in order
const HEADERS = [
  'submitted_at',
  'q1', 'q2', 'q3', 'q4',
  'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12',
  'q13', 'q14', 'q15', 'q16',
  'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24',
  'q25', 'q26', 'q27', 'q28', 'q29',
  'q30', 'q31', 'q32', 'q33', 'q34',
  'q35', 'q36', 'q37', 'q38', 'q39',
  'q40', 'q41', 'q42', 'q43', 'q44',
  'q45', 'q46', 'q47', 'q48',
  'q49', 'q50', 'q51', 'q52',
  'q53', 'q54', 'q55', 'q56',
  'q57', 'q58', 'q59a', 'q59b', 'q59c',
]

// Human-readable labels for the header row in the sheet
const HEADER_LABELS = {
  submitted_at: 'Submitted At',
  q1: 'Participant Name',
  q2: 'Email',
  q3: 'Mobile Number',
  q4: 'Consent to Participate',
  q5: 'Academic Position',
  q6: 'Affiliation Type',
  q7: 'Institution Name',
  q8: 'Institution Location',
  q9: 'Field of Research',
  q10: 'Years in Research',
  q11: 'Total Peer Reviews',
  q12: 'Most Recent Review',
  q13: 'Familiar with LLMs',
  q14: 'Used LLM in Academic Context',
  q15: 'Understands LLM in Peer Review',
  q16: 'LLMs Useful for Research',
  q17: 'Used LLM in Peer Review',
  q18: 'Regularly Uses LLMs in Reviews',
  q19: 'LLMs for Understanding Technical Content',
  q20: 'LLMs for Summarizing Manuscripts',
  q21: 'LLMs for Drafting Review Comments',
  q22: 'LLMs for Grammar Correction',
  q23: 'LLMs for Technical Explanations',
  q24: 'Relies Substantially on LLM Outputs',
  q25: 'Uses General-Purpose AI Tools',
  q26: 'Uses Coding-Specific AI Tools',
  q27: 'Uses Writing Assistant AI Tools',
  q28: 'Uses Multiple LLM Tools Combined',
  q29: 'Uses LLMs in Majority of Reviews',
  q30: 'LLMs Reduced Review Time',
  q31: 'LLMs Made Reviewing Faster',
  q32: 'LLMs Reduced Cognitive Effort',
  q33: 'LLMs Help Meet Deadlines',
  q34: 'LLMs Reduced Stress',
  q35: 'LLMs Improved Review Quality',
  q36: 'LLMs Improved Feedback Structure',
  q37: 'LLMs Help Identify Issues',
  q38: 'LLMs Improved Report Logic',
  q39: 'LLMs Increased Confidence',
  q40: 'LLMs Reduced Critical Thinking',
  q41: 'LLMs Produce Incorrect Outputs',
  q42: 'Accepts LLM Suggestions Without Verifying',
  q43: 'LLMs Reduced Originality',
  q44: 'LLMs Introduce Bias',
  q45: 'Disclosure Should Be Required',
  q46: 'LLMs Ethically Acceptable if Transparent',
  q47: 'Undisclosed LLM Use Threatens Integrity',
  q48: 'Risk of Confidential Content Leaking',
  q49: 'Some Reviewers Use LLMs Undisclosed',
  q50: 'Undisclosed LLM Use Gives Unfair Advantage',
  q51: 'Hidden LLM Use Diminished Trust',
  q52: 'Secret LLM Use Reduces Transparency',
  q53: 'LLM Users Complete Reviews Faster',
  q54: 'LLM Users Produce Higher Quality Reviews',
  q55: 'Non-Users at Disadvantage',
  q56: 'Unequal Access Creates Unfair Competition',
  q57: 'Consent for Research Use',
  q58: 'Confirmation of Information',
  q59a: 'Participant Full Name (Signature)',
  q59b: 'Digital Signature',
  q59c: 'Signature Date',
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headerRow = HEADERS.map(h => HEADER_LABELS[h] || h)
      sheet.appendRow(headerRow)

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length)
      headerRange.setBackground('#1a1a2e')
      headerRange.setFontColor('#ffffff')
      headerRange.setFontWeight('bold')
      headerRange.setFontSize(10)
      sheet.setFrozenRows(1)
    }

    // Parse incoming data
    const data = JSON.parse(e.postData.contents)

    // Build the row in header order
    const row = HEADERS.map(key => {
      const val = data[key]
      if (val === undefined || val === null) return ''
      return String(val)
    })

    sheet.appendRow(row)

    // Auto-resize columns periodically (every 10 rows)
    if (sheet.getLastRow() % 10 === 0) {
      sheet.autoResizeColumns(1, HEADERS.length)
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// GET handler for testing the script is deployed correctly
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Survey endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON)
}