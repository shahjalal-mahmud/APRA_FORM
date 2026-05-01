# APRA Form — Research Survey Web App

> **Hidden AI in Peer Review: Investigating the Impact of Undisclosed LLM Usage on Fairness and Trust**
>
> A mobile-first, multi-section survey web application built with React, Tailwind CSS, and DaisyUI. Responses are automatically saved to Google Sheets via Google Apps Script — no backend server required.

---

## Table of Contents

- [APRA Form — Research Survey Web App](#apra-form--research-survey-web-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Google Sheets Integration](#google-sheets-integration)
    - [Step 1 — Create the Google Sheet](#step-1--create-the-google-sheet)
    - [Step 2 — Set Up Apps Script](#step-2--set-up-apps-script)
    - [Step 3 — Deploy as Web App](#step-3--deploy-as-web-app)
    - [Step 4 — Connect to the App](#step-4--connect-to-the-app)
    - [How the Sheet is Structured](#how-the-sheet-is-structured)
  - [Survey Structure](#survey-structure)
  - [Question Types](#question-types)
    - [`text`](#text)
    - [`email`](#email)
    - [`tel`](#tel)
    - [`date`](#date)
    - [`single_choice`](#single_choice)
    - [`single_checkbox`](#single_checkbox)
    - [`likert`](#likert)
  - [Adding or Editing Questions](#adding-or-editing-questions)
  - [Deployment to Netlify](#deployment-to-netlify)
    - [Option A — Deploy via Netlify CLI](#option-a--deploy-via-netlify-cli)
    - [Option B — Deploy via GitHub (Recommended)](#option-b--deploy-via-github-recommended)
    - [Netlify Redirect Rule](#netlify-redirect-rule)
  - [Component Reference](#component-reference)
    - [`App.jsx`](#appjsx)
    - [`useFormState.js` (hook)](#useformstatejs-hook)
    - [`SectionPage.jsx`](#sectionpagejsx)
    - [`QuestionRenderer.jsx`](#questionrendererjsx)
    - [`LikertScale.jsx`](#likertscalejsx)
    - [`MultipleChoice.jsx`](#multiplechoicejsx)
    - [`ConsentCheck.jsx`](#consentcheckjsx)
    - [`ProgressBar.jsx`](#progressbarjsx)
  - [How Validation Works](#how-validation-works)
  - [Draft Auto-Save](#draft-auto-save)
  - [Troubleshooting](#troubleshooting)
  - [References](#references)
  - [License](#license)

---

## Overview

This project is a custom survey web application created for academic research purposes. It replicates the functionality of Google Forms but runs as a fully self-hosted, branded single-page application (SPA) deployed on Netlify.

The survey collects responses from researchers in the Computer Science & Engineering field about their usage of Large Language Models (LLMs) during the peer review process. It covers 59 questions across 12 thematic sections, from demographic profiling to ethical attitudes and trust perceptions.

All responses are submitted directly to a Google Sheets spreadsheet through a Google Apps Script Web App endpoint, with no intermediate database or server.

---

## Features

- **Mobile-first design** — optimized for smartphone users, with large touch targets, vertical layouts for Likert scales, and a sticky bottom navigation bar
- **12-section multi-step flow** — users complete one section at a time and navigate forward and backward freely
- **Per-section validation** — required fields are checked before advancing; errors scroll into view automatically
- **Draft auto-save** — answers are saved to `localStorage` so users can close the tab and resume later without losing progress
- **Google Sheets integration** — submissions append a new row to your spreadsheet in real time, with auto-generated human-readable column headers
- **Fully responsive** — fluid layout from 320px phones up to wide desktop screens
- **Thank-you screen** — displayed after successful submission
- **Error recovery** — if submission fails, answers are retained and the user can retry without re-filling the form
- **Zero backend cost** — runs entirely as a static site; only Google Sheets and Netlify free tiers are needed

---

## Tech Stack

| Layer             | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| UI Framework      | [React 19](https://react.dev/)                                          |
| Build Tool        | [Vite 8](https://vite.dev/)                                             |
| Styling           | [Tailwind CSS 4](https://tailwindcss.com/)                              |
| Component Library | [DaisyUI 5](https://daisyui.com/)                                       |
| Data Layer        | Static JSON (`questions.json`)                                          |
| Form Submission   | [Google Apps Script](https://developers.google.com/apps-script) Web App |
| Storage           | Google Sheets                                                           |
| Hosting           | [Netlify](https://netlify.com/)                                         |

---

## Project Structure

```
apra-form/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── questions.json          # All survey questions and section config
│   ├── components/
│   │   ├── SectionPage.jsx         # Renders one full section of questions
│   │   ├── QuestionRenderer.jsx    # Routes a question to the correct input type
│   │   ├── ProgressBar.jsx         # Animated progress bar and section counter
│   │   ├── LikertScale.jsx         # 1–5 agreement scale (mobile + desktop layouts)
│   │   ├── MultipleChoice.jsx      # Radio-button card list for single-select questions
│   │   └── ConsentCheck.jsx        # Yes/No checkbox cards for consent questions
│   ├── hooks/
│   │   └── useFormState.js         # Central state: navigation, answers, validation, submit
│   ├── App.jsx                     # Root component — layout, header, nav, screens
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind + DaisyUI imports
├── google-apps-script.js           # Script to paste into Google Apps Script editor
├── .env.example                    # Environment variable template
├── .env                            # Your local environment variables (git-ignored)
├── .gitignore
├── vite.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- A **Google account** (for Google Sheets integration)
- A **Netlify account** (for deployment) — [Sign up free](https://netlify.com/)

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/apra-form.git
cd apra-form
```

**2. Install dependencies:**

```bash
npm install
```

**3. Copy the environment variable template:**

```bash
cp .env.example .env
```

**4. Start the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The submit button will not work until you complete the Google Sheets integration below and set your `VITE_GOOGLE_SCRIPT_URL` in the `.env` file.

---

### Environment Variables

The app uses a single environment variable:

| Variable                 | Description                                 | Required |
| ------------------------ | ------------------------------------------- | -------- |
| `VITE_GOOGLE_SCRIPT_URL` | The deployed Google Apps Script Web App URL | Yes      |

Your `.env` file should look like this:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
```

> **Important:** Vite only exposes environment variables prefixed with `VITE_` to the browser. Never put sensitive secrets in this file — the URL is intentionally public-facing.

---

## Google Sheets Integration

This app uses Google Apps Script as a free serverless endpoint. When the user submits the form, the app sends a POST request with all answers as JSON to your Apps Script URL. The script appends a new row to your Google Sheet.

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com/) and create a new blank spreadsheet
2. Name it something like `APRA Survey Responses`
3. Leave the sheet empty — the script will auto-create the header row on the first submission

### Step 2 — Set Up Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with the Apps Script editor
3. **Delete all existing code** in the editor
4. Open `google-apps-script.js` from this repository and **copy the entire contents**
5. Paste it into the Apps Script editor
6. Click the **floppy disk icon** (or press `Ctrl+S` / `Cmd+S`) to save
7. Name the project something like `APRA Survey Handler`

### Step 3 — Deploy as Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description:** `Survey form endpoint v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. If prompted, click **Authorize access** and grant the requested permissions (this allows the script to write to your Sheet)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycby...long_id.../exec
   ```

> **Critical:** Every time you edit the Apps Script code, you must create a **new deployment** — not update the existing one. The URL changes with each new deployment. Updating an existing deployment does NOT apply your code changes.

### Step 4 — Connect to the App

Paste the Web App URL you copied into your `.env` file:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
```

Restart the dev server (`npm run dev`) and test a full submission. You should see a new row appear in your Google Sheet within a few seconds.

### How the Sheet is Structured

On the first submission, the script automatically creates a header row with human-readable column names. Each subsequent submission adds one row. The columns are:

| Column | Content                              |
| ------ | ------------------------------------ |
| A      | Submitted At (ISO timestamp)         |
| B      | Participant Name                     |
| C      | Email                                |
| D      | Mobile Number                        |
| E      | Consent to Participate               |
| F–M    | Researcher profile (q5–q12)          |
| N–Q    | LLM awareness (q13–q16)              |
| R–Y    | LLM usage behavior (q17–q24)         |
| Z–AD   | Type & depth of use (q25–q29)        |
| AE–AI  | Efficiency impact (q30–q34)          |
| AJ–AN  | Quality impact (q35–q39)             |
| AO–AS  | Negative effects (q40–q44)           |
| AT–AW  | Ethics & trust (q45–q48)             |
| AX–BA  | Hidden usage & fairness (q49–q52)    |
| BB–BE  | Comparative impact (q53–q56)         |
| BF–BJ  | Final consent & signature (q57–q59c) |

Likert scale answers are stored as integers (1–5). All other answers are stored as strings.

---

## Survey Structure

The survey is divided into 12 sections. Users complete one section at a time.

| #   | Section Title                                | Questions | Type                      |
| --- | -------------------------------------------- | --------- | ------------------------- |
| 1   | Personal Details                             | q1–q4     | Text, Email, Tel, Consent |
| 2   | Researcher Profile                           | q5–q12    | Multiple Choice           |
| 3   | LLM Awareness & Baseline                     | q13–q16   | Likert (1–5)              |
| 4   | LLM Usage Behavior                           | q17–q24   | Likert (1–5)              |
| 5   | Type & Depth of LLM Use                      | q25–q29   | Likert (1–5)              |
| 6   | Efficiency Impact                            | q30–q34   | Likert (1–5)              |
| 7   | Quality Impact                               | q35–q39   | Likert (1–5)              |
| 8   | Negative Effects of LLM Use                  | q40–q44   | Likert (1–5)              |
| 9   | Ethics & Trust in LLM-Assisted Reviewing     | q45–q48   | Likert (1–5)              |
| 10  | Hidden LLM Usage & Its Effect on Fairness    | q49–q52   | Likert (1–5)              |
| 11  | Comparative Impact — LLM Users vs. Non-Users | q53–q56   | Likert (1–5)              |
| 12  | Final Consent and Digital Signature          | q57–q59c  | Consent, Text, Date       |

---

## Question Types

The app supports five question types, defined in `questions.json` via the `"type"` field:

### `text`

A standard single-line text input. Used for names, institution names, and locations.

```json
{
  "id": "q1",
  "type": "text",
  "label": "Participant Name",
  "placeholder": "Full name",
  "required": true
}
```

### `email`

An email input with browser-level format validation.

### `tel`

A telephone input. Accepts any format — validation is not enforced beyond the required check.

### `date`

A native date picker. Renders as `DD/MM/YYYY` depending on the user's locale.

### `single_choice`

A list of radio-button cards. Only one option can be selected. Used for multiple-choice demographic questions.

```json
{
  "id": "q5",
  "type": "single_choice",
  "label": "What is your current academic position?",
  "options": ["Undergraduate Student", "PhD Student / Candidate", "..."],
  "required": true
}
```

### `single_checkbox`

A list of yes/no card options with visual color feedback (green for agreement, red for decline). Used for consent questions.

```json
{
  "id": "q4",
  "type": "single_checkbox",
  "label": "Do you agree to participate in this survey?",
  "options": [
    "Yes, I agree to participate",
    "No, I do not agree to participate"
  ],
  "required": true
}
```

### `likert`

A 5-point agreement scale. On mobile, options render as a vertical button list with full labels. On desktop (sm breakpoint and above), they render as a horizontal pill group. Colors are semantic: 1 = red (error), 2 = amber (warning), 3 = neutral (gray), 4–5 = green (success).

```json
{
  "id": "q13",
  "type": "likert",
  "label": "I am familiar with what Large Language Models (LLMs) are and how they work.",
  "scale": 5,
  "required": true
}
```

---

## Adding or Editing Questions

All survey content lives in `src/data/questions.json`. You do not need to touch any component code to add, remove, or reorder questions.

**To add a new question**, insert a new object into the `questions` array of the appropriate section:

```json
{
  "id": "q_new",
  "type": "likert",
  "label": "Your new question text here.",
  "scale": 5,
  "required": true
}
```

**To add a new section**, append a new object to the `sections` array:

```json
{
  "id": 13,
  "title": "New Section Title",
  "description": "Optional description shown below the title.",
  "questions": [ ... ]
}
```

**After adding questions**, update `google-apps-script.js` to include the new question IDs in the `HEADERS` and `HEADER_LABELS` objects, then create a new deployment of your Apps Script.

---

## Deployment to Netlify

### Option A — Deploy via Netlify CLI

**1. Install Netlify CLI:**

```bash
npm install -g netlify-cli
```

**2. Build the project:**

```bash
npm run build
```

**3. Deploy:**

```bash
netlify deploy --prod --dir=dist
```

Follow the prompts to link or create a new Netlify site.

### Option B — Deploy via GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to [app.netlify.com](https://app.netlify.com/) and click **Add new site → Import an existing project**
3. Connect your GitHub account and select the repository
4. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add your environment variable:
   - Go to **Site settings → Environment variables**
   - Click **Add a variable**
   - Key: `VITE_GOOGLE_SCRIPT_URL`
   - Value: your Apps Script Web App URL
6. Click **Deploy site**

Netlify will automatically redeploy every time you push to the main branch.

### Netlify Redirect Rule

Because this is a single-page application, add a `_redirects` file inside the `public/` folder to ensure all routes return `index.html`:

```
/* /index.html 200
```

This prevents 404 errors if a user tries to refresh the page.

---

## Component Reference

### `App.jsx`

The root component. Manages top-level layout: sticky header, scrollable main content, sticky bottom navigation bar. Also renders the `ThankYouScreen` and `ErrorScreen` when `submitStatus` changes.

### `useFormState.js` (hook)

The single source of truth for the entire form. Exports:

| Export                | Type     | Description                                             |
| --------------------- | -------- | ------------------------------------------------------- |
| `currentSection`      | object   | The active section object from `questions.json`         |
| `currentSectionIndex` | number   | Zero-based index of the active section                  |
| `totalSections`       | number   | Total number of sections (12)                           |
| `isFirstSection`      | boolean  | True when on section 0                                  |
| `isLastSection`       | boolean  | True when on the final section                          |
| `answers`             | object   | `{ questionId: value }` map of all answers              |
| `errors`              | object   | `{ questionId: errorMessage }` map of validation errors |
| `submitStatus`        | string   | `'idle'` \| `'loading'` \| `'success'` \| `'error'`     |
| `setAnswer(id, val)`  | function | Updates a single answer and clears its error            |
| `goNext()`            | function | Validates current section, then advances                |
| `goBack()`            | function | Goes to the previous section                            |
| `submitForm()`        | function | Validates final section, POSTs to Google Sheets         |
| `retrySubmit()`       | function | Resets `submitStatus` to `'idle'` for retry             |

### `SectionPage.jsx`

Receives the current section object, the full answers map, the errors map, and the `onAnswer` callback. Renders the section header (icon, title, description) and maps each question to a styled card containing a `QuestionRenderer`.

### `QuestionRenderer.jsx`

A pure router component. Based on `question.type`, it renders one of: `TextInput` (inline), `LikertScale`, `MultipleChoice`, or `ConsentCheck`. Also renders the question label, required asterisk, help text, and question index number.

### `LikertScale.jsx`

Renders a 5-point Likert scale. On `sm` screens and above, options appear as a horizontal pill group. Below `sm`, they appear as a vertical list of full-width buttons with descriptive labels. Selected state uses semantic color coding.

### `MultipleChoice.jsx`

Renders a list of radio cards. Each card is a `<label>` wrapping a visually hidden `<input type="radio">` with a styled custom radio indicator. The entire card is tappable.

### `ConsentCheck.jsx`

Similar to `MultipleChoice` but styled for consent scenarios. Positive options (index 0) highlight green when selected; negative options highlight red.

### `ProgressBar.jsx`

Displays `Section X of Y`, the percentage complete, and an animated fill bar. Progress is calculated as `currentIndex / totalSections`.

---

## How Validation Works

Validation runs **per section**, not per question, and only when the user taps **Next** or **Submit**. This avoids showing errors before the user has had a chance to answer.

The `validateSection()` function inside `useFormState.js` checks every question in the current section that has `"required": true`. If a question has no answer (undefined, null, or empty string), it adds an entry to the `errors` object.

After validation fails:

1. The `errors` state is set, causing affected question cards to gain a red border
2. The page scrolls to the first unanswered question using `element.scrollIntoView()`
3. The error message appears below the input
4. As soon as the user answers a question, its error is cleared immediately via `setAnswer()`

---

## Draft Auto-Save

Every time the user answers a question, `useFormState.js` saves the entire `answers` object to `localStorage` under the key `apra_survey_answers`. When the page loads, the hook initializes `answers` from `localStorage` if data is present.

This means:

- If the user closes the browser mid-survey, their progress is preserved
- If the user submits successfully, `localStorage` is cleared
- If submission fails, the draft is retained so the user can retry

To manually clear a saved draft during development, run in the browser console:

```javascript
localStorage.removeItem("apra_survey_answers");
```

---

## Troubleshooting

**Submissions are not appearing in Google Sheets**

- Verify that `VITE_GOOGLE_SCRIPT_URL` is set correctly in your `.env` file
- Open the Apps Script URL directly in your browser — it should return `{"status":"ok","message":"Survey endpoint is live."}`
- Check that the Apps Script was deployed with _Who has access: Anyone_ (not "Only myself")
- Remember: editing the Apps Script code requires a **new deployment** — the URL will change

**Getting a CORS error in the browser console**

This is expected and harmless. The fetch uses `mode: 'no-cors'` because Google Apps Script does not return CORS headers. The request is still sent and received correctly; you just cannot read the response. The app optimistically treats every `no-cors` fetch as a success.

**The app shows a blank screen after deployment**

- Make sure the `_redirects` file exists in `public/` (see Deployment section)
- Check that `VITE_GOOGLE_SCRIPT_URL` is set as an environment variable in your Netlify site settings, not just in your local `.env` file (`.env` is git-ignored and not deployed)

**A question is not saving its answer**

- Confirm that the question's `"id"` in `questions.json` is unique across the entire file
- Check the browser console for React key warnings

**DaisyUI classes are not applying**

- Make sure `@plugin "daisyui"` is present in `src/index.css`
- Ensure the `daisyui` package is installed: `npm install daisyui`
- Restart the Vite dev server after changing `index.css`

---

## References

This survey instrument draws on the following peer-reviewed literature:

1. Ng, D.T.K. et al. (2023). Design and validation of the AI literacy questionnaire: the affective, behavioural, cognitive and ethical approach. _British Journal of Educational Technology_. https://doi.org/10.1111/bjet.13411

2. Liao, Z. et al. (2024). LLMs as Research Tools: A Large Scale Survey of Researchers' Usage and Perceptions. _arXiv_. https://arxiv.org/abs/2411.05025

3. Ebadi, S. et al. (2025). Exploring the Impact of Generative AI on Peer Review: Insights from Journal Reviewers. _Journal of Academic Ethics, Springer_. https://link.springer.com/article/10.1007/s10805-025-09604-4

4. Liang, W. et al. (2024). Monitoring AI-Modified Content at Scale: A Case Study on the Impact of ChatGPT on AI Conference Peer Reviews. _ICML 2024_. https://arxiv.org/abs/2403.07183

5. Doskaliuk, B. et al. (2025). Artificial intelligence in peer review: Enhancing efficiency while preserving integrity. _Journal of Korean Medical Science_. https://jkms.org/pdf/10.3346/jkms.2025.40.e92

6. Gallegos, I. et al. (2024). Bias and Fairness in Large Language Models: A Survey. _arXiv_. https://arxiv.org/abs/2309.00770

7. Mollaki, V. (2024). Death of a reviewer or death of peer review integrity? The challenges of using AI tools in peer reviewing. _Research Ethics, SAGE_. https://journals.sagepub.com/doi/10.1177/17470161231224552

8. Kocak, B. et al. (2025). Ensuring peer review integrity in the era of large language models. _European Journal of Radiology AI_. https://www.sciencedirect.com/science/article/pii/S3050577125000167

9. Lee, J. et al. (2025). The role of large language models in the peer-review process: opportunities and challenges. _PMC / Korean Journal_. https://pmc.ncbi.nlm.nih.gov/articles/PMC11952698/

10. Lo Vecchio, N. (2025). Personal experience with AI-generated peer reviews: a case study. _PMC / NIH Open Access_. https://pmc.ncbi.nlm.nih.gov/articles/PMC11974187/

11. PMC (2025). Detecting LLM-generated peer reviews. _PMC / NIH_. https://pmc.ncbi.nlm.nih.gov/articles/PMC12453209/

---

## License

This project is for academic research purposes. All survey data collected belongs to the research team. The codebase may be reused and adapted freely with attribution.
