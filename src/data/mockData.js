// Mock Data for Presentation Evaluator - Module 4 (AI Evaluation Module)

export const PRESENTATION_PRESETS = [
  {
    id: 'demo-1',
    fileName: 'AI in Education.pptx',
    fileSize: '2.4 MB',
    uploadDate: 'May 20, 2024',
    slideCount: 18,
    audioDuration: '12:45',
    overallScore: 86,
    scoreStatus: 'Very Good',
    starRating: 4.5,
    scores: {
      content: 88,
      delivery: 79,
      language: 82,
      confidence: 90,
      engagement: 84
    },
    fillerWords: {
      total: 32,
      status: 'Needs Improvement',
      mostUsed: [
        { word: 'um', count: 12, pct: '37.5%' },
        { word: 'you know', count: 8, pct: '25.0%' },
        { word: 'like', count: 7, pct: '21.8%' },
        { word: 'actually', count: 5, pct: '15.6%' }
      ]
    },
    speechStats: {
      wordsSpoken: 1587,
      speakingRateWPM: 124,
      paceRating: 'Ideal Pace (120-150 WPM)',
      durationSeconds: 765
    },
    strengths: [
      'Well structured content with clear logical progression',
      'Good use of real-world educational case study examples',
      'Clear and concise slide visual explanations',
      'Strong introduction hook and persuasive conclusion',
      'Engaging vocal delivery and confident posture'
    ],
    improvements: [
      'Speak a bit slower on complex architectural slides (Slides 8-10)',
      'Avoid filler words like "um", "you know", and "like"',
      'Improve vocal variety during technical explanation section',
      'Add more real-life student feedback statistics',
      'Maintain continuous eye contact with the entire audience'
    ]
  },
  {
    id: 'demo-2',
    fileName: 'Machine Learning Pitch.pdf',
    fileSize: '4.8 MB',
    uploadDate: 'June 12, 2024',
    slideCount: 24,
    audioDuration: '15:10',
    overallScore: 94,
    scoreStatus: 'Excellent',
    starRating: 5.0,
    scores: {
      content: 96,
      delivery: 92,
      language: 94,
      confidence: 95,
      engagement: 93
    },
    fillerWords: {
      total: 11,
      status: 'Great',
      mostUsed: [
        { word: 'like', count: 5, pct: '45.4%' },
        { word: 'um', count: 4, pct: '36.3%' },
        { word: 'so', count: 2, pct: '18.1%' }
      ]
    },
    speechStats: {
      wordsSpoken: 2100,
      speakingRateWPM: 138,
      paceRating: 'Ideal Pace',
      durationSeconds: 910
    },
    strengths: [
      'Outstanding technical depth and clear problem definition',
      'Minimal filler word usage throughout the pitch',
      'Excellent vocal modulation and enthusiastic delivery',
      'Flawless slide design with minimal text density'
    ],
    improvements: [
      'Brief pause after key revenue metrics to let numbers sink in',
      'Elaborate slightly more on competitive moat'
    ]
  },
  {
    id: 'demo-3',
    fileName: 'SE Team Project Presentation.pptx',
    fileSize: '1.9 MB',
    uploadDate: 'July 05, 2024',
    slideCount: 14,
    audioDuration: '09:30',
    overallScore: 68,
    scoreStatus: 'Needs Work',
    starRating: 3.5,
    scores: {
      content: 72,
      delivery: 64,
      language: 68,
      confidence: 65,
      engagement: 70
    },
    fillerWords: {
      total: 58,
      status: 'High Filler Count',
      mostUsed: [
        { word: 'um', count: 24, pct: '41.3%' },
        { word: 'you know', count: 18, pct: '31.0%' },
        { word: 'basically', count: 10, pct: '17.2%' },
        { word: 'like', count: 6, pct: '10.3%' }
      ]
    },
    speechStats: {
      wordsSpoken: 980,
      speakingRateWPM: 103,
      paceRating: 'Slow Pace (< 110 WPM)',
      durationSeconds: 570
    },
    strengths: [
      'Comprehensive system design diagram',
      'Good team division of responsibilities'
    ],
    improvements: [
      'Significantly reduce filler words ("um", "you know")',
      'Increase speaking speed and energy level',
      'Rehearse slide transitions for smoother flow'
    ]
  }
];

export const PIPELINE_STEPS = [
  { id: 'extract', name: 'Extracting Slides', desc: 'Extracting text from 18 slides using pdfjs-dist / mammoth' },
  { id: 'stt', name: 'Speech to Text', desc: 'Converting audio stream to transcript via Whisper API' },
  { id: 'analysis', name: 'AI Analysis', desc: 'Evaluating content quality, delivery & filler words via GPT-4/Gemini' },
  { id: 'report', name: 'Generating Report', desc: 'Synthesizing radar scores, statistics & actionable feedback' }
];

export const CODE_SNIPPETS = {
  extractText: `// Step 2: Extract Text from Slides Frontend / Node Service
import * as pdfjsLib from 'pdfjs-dist';

async function extractTextFromPDF(file) {
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(data).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const slideText = content.items.map(item => item.str).join(' ');
    fullText += \`[Slide \${i}]: \${slideText}\\n\`;
  }
  return fullText;
}`,

  whisperAPI: `// Step 3: Speech-to-Text via Whisper API
async function convertAudioToText(audioFile) {
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('model', 'whisper-1');

  const res = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: { 
      'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data.text; // Full speech transcript string
}`,

  aiAnalysis: `// Step 4: AI Evaluation Prompt & Structured Schema
const prompt = \`
Analyze the presentation slides and speech transcript.
Provide JSON object with scores (0-100) for content, delivery, language, confidence, engagement.
Detect filler words ("um", "you know", "like") and count occurrences.
Provide lists of strengths and areas to improve.

Slides: \${extractedSlidesText}
Transcript: \${transcriptText}
\`;

const response = await openai.chat.completions.create({
  model: "gpt-4-turbo",
  response_format: { type: "json_object" },
  messages: [{ role: "user", content: prompt }]
});

const result = JSON.parse(response.choices[0].message.content);`,

  saveResult: `// Step 7: Store Results to MongoDB / Express API
async function saveEvaluation(evaluationData) {
  const response = await axios.post('/api/evaluations/save', {
    fileId: evaluationData.fileId,
    scores: evaluationData.scores,
    fillerWords: evaluationData.fillerWords,
    feedback: evaluationData.feedback,
    createdAt: new Date().toISOString()
  });
  return response.data;
}`
};

export const WORKFLOW_STEPS = [
  { step: 1, title: 'Upload Presentation', desc: 'User uploads PPTX/PDF slides and MP3/WAV audio recording.' },
  { step: 2, title: 'Extract Text from Slides', desc: 'Client/server parses slide text using pdfjs-dist or mammoth library.' },
  { step: 3, title: 'Speech-to-Text (Whisper)', desc: 'Audio stream sent to Whisper API to extract verbatim transcript with timestamps.' },
  { step: 4, title: 'AI Analysis (GPT-4/Gemini)', desc: 'LLM evaluates semantic alignment, vocal delivery, grammar, filler words & confidence.' },
  { step: 5, title: 'Generate Radar & Scores', desc: 'System calculates scores (0-100) across 5 core presentation dimensions.' },
  { step: 6, title: 'Feedback & Recommendations', desc: 'AI generates targeted strengths and actionable improvements.' },
  { step: 7, title: 'Store & Retrieve History', desc: 'Results saved to database for presentation analytics & progress tracking.' }
];
