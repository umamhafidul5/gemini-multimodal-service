import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Set model Gemini default (bisa diatur via GEMINI_MODEL di .env)
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

app.use(express.json());

// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    message: 'Gemini 2.5 Flash API Server is running',
    endpoints: [
      { path: '/generate-text', method: 'POST', description: 'Prompt teks biasa' },
      { path: '/generate-from-image', method: 'POST', description: 'Prompt teks + upload gambar (field: image)' },
      { path: '/generate-from-document', method: 'POST', description: 'Prompt teks + upload dokumen (field: document)' },
      { path: '/generate-from-audio', method: 'POST', description: 'Prompt teks + upload audio (field: audio)' },
    ],
  });
});

// Endpoint 1: Generate Text
app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Field "prompt" diperlukan dalam body JSON' });
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

// Endpoint 2: Generate from Image
app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  const { prompt } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'File gambar wajib diunggah (field: image)' });
  }

  const base64Image = req.file.buffer.toString('base64');
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt || 'Jelaskan gambar ini.', type: 'text' },
        { inlineData: { data: base64Image, mimeType: req.file.mimetype } },
      ],
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

// Endpoint 3: Generate from Document
app.post('/generate-from-document', upload.single('document'), async (req, res) => {
  const { prompt } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'File dokumen wajib diunggah (field: document)' });
  }

  const base64Document = req.file.buffer.toString('base64');
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt ?? 'Tolong buat ringkasan dari dokumen berikut.', type: 'text' },
        { inlineData: { data: base64Document, mimeType: req.file.mimetype } },
      ],
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

// Endpoint 4: Generate from Audio
app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
  const { prompt } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'File audio wajib diunggah (field: audio)' });
  }

  const base64Audio = req.file.buffer.toString('base64');
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt ?? 'Tolong buatkan transkrip dari rekaman berikut.', type: 'text' },
        { inlineData: { data: base64Audio, mimeType: req.file.mimetype } },
      ],
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
