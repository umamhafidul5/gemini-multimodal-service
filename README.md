# gemini-flash-api

REST API berbasis Express.js yang terintegrasi dengan Google Gemini API untuk memproses input multimodal (teks, gambar, dokumen, dan audio). Proyek ini dibuat untuk tugas hands-on Sesi 2 program Hacktiv8 AI Developer.

## Tech Stack

- Node.js (v18+)
- Express.js
- @google/genai
- Multer (memory storage)
- Dotenv

## Cara Menjalankan

1. Masuk ke direktori proyek dan pasang dependencies:
   ```bash
   npm install
   ```

2. Buat file `.env` dari template:
   ```bash
   cp .env.example .env
   ```
   Lalu sesuaikan isinya:
   ```env
   GEMINI_API_KEY=api_key_kamu_di_sini
   PORT=3001
   GEMINI_MODEL=gemini-3.6-flash
   ```

3. Jalankan server:
   ```bash
   npm start
   ```
   Untuk mode development dengan auto-reload:
   ```bash
   npm run dev
   ```

Server akan aktif di `http://localhost:3001`.

## Daftar Endpoint

### 1. POST /generate-text
Menerima prompt teks dan mengembalikan respons teks dari Gemini.

- Header: `Content-Type: application/json`
- Request Body:
  ```json
  {
    "prompt": "Jelaskan cara kerja REST API dalam 2 kalimat."
  }
  ```
- Response (200):
  ```json
  {
    "result": "..."
  }
  ```

### 2. POST /generate-from-image
Menganalisis gambar menggunakan input multimodal.

- Content-Type: `multipart/form-data`
- Body:
  - `image` (file): Gambar format JPG, PNG, atau WebP.
  - `prompt` (text, opsional): Deskripsi instruksi untuk AI.

### 3. POST /generate-from-document
Membaca dan merangkum isi dokumen (PDF atau teks).

- Content-Type: `multipart/form-data`
- Body:
  - `document` (file): File PDF atau TXT.
  - `prompt` (text, opsional): Perintah khusus, misalnya permintaan ringkasan.

### 4. POST /generate-from-audio
Melakukan transkripsi atau analisis terhadap file rekaman suara.

- Content-Type: `multipart/form-data`
- Body:
  - `audio` (file): File audio (MP3, WAV, dsb).
  - `prompt` (text, opsional): Instruksi untuk transkripsi atau analisis audio.

## Pengujian via Postman

Tersedia file koleksi Postman yang bisa langsung di-import:
- File: `postman_collection.json`
- Panduan lengkap: lihat `POSTMAN_GUIDE.md`

Langkah:
1. Buka Postman.
2. Klik tombol Import di sudut kiri atas.
3. Pilih file `postman_collection.json`.
4. Endpoint otomatis tersedia dan siap diuji.

## Git Workflow

Langkah untuk inisialisasi dan push ke repository GitHub:

```bash
git init
git add .
git commit -m "Implementasi endpoint Gemini AI API"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```
