# Gemini Flash API (ExpressJS + Google Gemini 2.5 Flash)

Proyek ini dibangun berdasarkan materi **Hacktiv8: AI Productivity and AI API Integration for Developers (Sesi 2 - Eksplorasi Gemini AI API)**.
Aplikasi ini merupakan RESTful API middleware menggunakan ExpressJS yang terintegrasi dengan Google Gemini AI (`gemini-2.5-flash`) untuk menangani input multimodal (teks, gambar, dokumen, dan audio).

---

## 🛠️ Prasyarat (Prerequisites)

- **Node.js**: Versi 18 atau lebih baru (`node -v`)
- **NPM**: Versi 8 atau lebih baru (`npm -v`)
- **Gemini API Key**: Didapatkan dari [Google AI Studio](https://aistudio.google.com/u/0/api-keys)

---

## 📦 Instalasi & Setup

1. **Clone repository atau masuk ke direktori proyek:**
   ```bash
   cd gemini-flash-api
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin file `.env.example` menjadi `.env` lalu isi `GEMINI_API_KEY`:
   ```bash
   cp .env.example .env
   ```
   Isi file `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Menjalankan Server:**
   - Mode standar:
     ```bash
     npm start
     ```
   - Mode pengembangan (watch mode):
     ```bash
     npm run dev
     ```
   Server akan berjalan di `http://localhost:3000`.

---

## 🚀 Daftar Endpoint REST API

### 1. Generate Teks (`/generate-text`)
Menghasilkan jawaban berbasis teks dari prompt pengguna.

- **Method**: `POST`
- **URL**: `http://localhost:3000/generate-text`
- **Header**: `Content-Type: application/json`
- **Body (JSON)**:
  ```json
  {
    "prompt": "Jelaskan apa itu RESTful API dalam 2 kalimat."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "result": "RESTful API adalah antarmuka pemrograman aplikasi..."
  }
  ```

---

### 2. Generate dari Gambar (`/generate-from-image`)
Menganalisis dan mendeskripsikan gambar menggunakan kemampuan multimodal Gemini.

- **Method**: `POST`
- **URL**: `http://localhost:3000/generate-from-image`
- **Body (form-data / multipart)**:
  - `image` (File): File gambar (`.png`, `.jpg`, `.jpeg`, `.webp`)
  - `prompt` (Text, opsional): Misalnya `Jelaskan apa yang ada pada gambar ini`
- **Response (200 OK)**:
  ```json
  {
    "result": "Gambar ini menampilkan..."
  }
  ```

---

### 3. Generate dari Dokumen (`/generate-from-document`)
Menganalisis, mengekstraksi, atau merangkum isi dokumen.

- **Method**: `POST`
- **URL**: `http://localhost:3000/generate-from-document`
- **Body (form-data / multipart)**:
  - `document` (File): File dokumen (`.pdf`, `.txt`, `.csv`, dll.)
  - `prompt` (Text, opsional): Misalnya `Tolong buat ringkasan poin-poin penting dokumen ini.`
- **Response (200 OK)**:
  ```json
  {
    "result": "Ringkasan dokumen: 1. ..."
  }
  ```

---

### 4. Generate dari Audio (`/generate-from-audio`)
Mentranskripsikan ucapan atau menganalisis konten rekaman audio.

- **Method**: `POST`
- **URL**: `http://localhost:3000/generate-from-audio`
- **Body (form-data / multipart)**:
  - `audio` (File): File audio (`.mp3`, `.wav`, `.m4a`, dll.)
  - `prompt` (Text, opsional): Misalnya `Tolong buatkan transkrip dari rekaman berikut.`
- **Response (200 OK)**:
  ```json
  {
    "result": "Berikut adalah transkripsi dari rekaman: ..."
  }
  ```

---

## 🧪 Pengujian Menggunakan cURL

**Generate Text:**
```bash
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"Halo Gemini, sebutkan 3 manfaat AI!\"}"
```

**Generate from Image:**
```bash
curl -X POST http://localhost:3000/generate-from-image \
  -F "image=@/path/ke/gambar.jpg" \
  -F "prompt=Deskripsikan gambar ini"
```

**Generate from Document:**
```bash
curl -X POST http://localhost:3000/generate-from-document \
  -F "document=@/path/ke/dokumen.pdf" \
  -F "prompt=Buatkan ringkasan singkat"
```

**Generate from Audio:**
```bash
curl -X POST http://localhost:3000/generate-from-audio \
  -F "audio=@/path/ke/audio.mp3" \
  -F "prompt=Transkrip audio ini"
```

---

## 📌 Langkah Push ke GitHub (Sesuai Slide 61-62)

1. Pastikan file `.env` dan `node_modules` sudah ada di dalam `.gitignore`.
2. Inisialisasi dan commit kode:
   ```bash
   git init
   git add .
   git commit -m "Implementasi endpoint Gemini AI API"
   ```
3. Hubungkan ke repository remote GitHub Anda:
   ```bash
   git remote add origin https://github.com/<username-kamu>/<nama-repo>.git
   git branch -M main
   git push -u origin main
   ```

---

## 📄 Lisensi
ISC
