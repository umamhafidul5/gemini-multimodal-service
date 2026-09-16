# Panduan Pengujian Postman - Gemini Flash API

File koleksi Postman sudah disiapkan: `postman_collection.json`.

---

## 📥 Cara Import File Koleksi ke Postman

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** (di pojok kiri atas).
3. Drag & drop atau pilih file:
   `gemini-flash-api/postman_collection.json`
4. Koleksi bernama **"Gemini Flash API Collection"** dengan 4 endpoint siap pakai akan langsung muncul di sidebar kiri Anda.

> **Catatan Port:**  
> Koleksi ini menggunakan variabel `{{base_url}}` bernilai `http://localhost:3001` (sesuai file `.env`). Pastikan server sudah berjalan dengan perintah `npm start`.

---

## 📝 Contoh & Langkah Manual Pengujian Tiap Endpoint

Jika Anda ingin mengisi manual di Postman tanpa import, ikuti langkah-langkah di bawah ini:

---

### 1. Endpoint: `/generate-text` (Slide 41)
Mengirim pertanyaan/prompt teks biasa.

- **Method**: `POST`
- **URL**: `http://localhost:3001/generate-text`
- **Tab Headers**:
  - `Content-Type`: `application/json`
- **Tab Body**:
  1. Pilih opsi **raw**
  2. Pilih dropdown di sebelah kanan: **JSON**
  3. Masukkan contoh body berikut:
     ```json
     {
       "prompt": "Jelaskan apa itu RESTful API dalam 2 kalimat ringkas."
     }
     ```
- Klik **Send**
- **Contoh Response (Status: 200 OK)**:
  ```json
  {
    "result": "RESTful API adalah arsitektur antarmuka pemrograman aplikasi yang menggunakan protokol HTTP untuk pertukaran data secara terstandarisasi. Arsitektur ini memungkinkan klien dan server saling berkomunikasi dengan format umum seperti JSON secara terpisah dan fleksibel."
  }
  ```

---

### 2. Endpoint: `/generate-from-image` (Slide 45)
Mengunggah file gambar dan meminta Gemini menganalisisnya.

- **Method**: `POST`
- **URL**: `http://localhost:3001/generate-from-image`
- **Tab Body**:
  1. Pilih opsi **form-data**
  2. Tambahkan key berikut:
     | Key | Type (Dropdown di sebelah kanan key) | Value / Contoh |
     | :--- | :--- | :--- |
     | `image` | **File** *(klik dropdown ganti dari Text ke File)* | Klik **Select Files** dan pilih gambar (`.png`, `.jpg`) |
     | `prompt` | **Text** | `Tolong deskripsikan apa yang ada di dalam gambar ini secara detail.` *(Opsional)* |
- Klik **Send**
- **Contoh Response (Status: 200 OK)**:
  ```json
  {
    "result": "Gambar ini menampilkan logo seekor rubah berwarna oranye dengan tulisan Hacktiv8 di bagian bawahnya..."
  }
  ```

---

### 3. Endpoint: `/generate-from-document` (Slide 49)
Mengunggah dokumen PDF atau TXT dan meminta ringkasan/analisis.

- **Method**: `POST`
- **URL**: `http://localhost:3001/generate-from-document`
- **Tab Body**:
  1. Pilih opsi **form-data**
  2. Tambahkan key berikut:
     | Key | Type | Value / Contoh |
     | :--- | :--- | :--- |
     | `document` | **File** | Klik **Select Files** dan pilih dokumen (`.pdf`, `.txt`) |
     | `prompt` | **Text** | `Buatkan ringkasan 3 poin utama dari dokumen ini.` *(Opsional)* |
- Klik **Send**
- **Contoh Response (Status: 200 OK)**:
  ```json
  {
    "result": "Berikut ringkasan dokumen: \n1. Pengenalan Node.js\n2. Integrasi model Gemini\n3. Penggunaan Multer buffer."
  }
  ```

---

### 4. Endpoint: `/generate-from-audio` (Slide 54)
Mengunggah file suara/audio dan meminta transkripsi.

- **Method**: `POST`
- **URL**: `http://localhost:3001/generate-from-audio`
- **Tab Body**:
  1. Pilih opsi **form-data**
  2. Tambahkan key berikut:
     | Key | Type | Value / Contoh |
     | :--- | :--- | :--- |
     | `audio` | **File** | Klik **Select Files** dan pilih file audio (`.mp3`, `.wav`) |
     | `prompt` | **Text** | `Tolong buatkan transkrip percakapan audio ini.` *(Opsional)* |
- Klik **Send**
- **Contoh Response (Status: 200 OK)**:
  ```json
  {
    "result": "Transkrip audio: Selamat pagi semuanya, selamat datang di sesi kedua pelatihan Gemini AI..."
  }
  ```
