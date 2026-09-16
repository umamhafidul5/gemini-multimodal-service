# Panduan Pengujian Postman

File koleksi Postman yang disediakan: `postman_collection.json`.

## Cara Import ke Postman

1. Buka aplikasi Postman.
2. Klik tombol **Import** pada header kiri atas.
3. Pilih atau drag-and-drop file `postman_collection.json`.
4. Koleksi dengan nama **Gemini Flash API Collection** akan muncul di sidebar kiri.

Variabel `base_url` di koleksi disetel ke `http://localhost:3001`. Pastikan server sudah berjalan sebelum melakukan request.

---

## Konfigurasi Manual Tiap Endpoint

Jika ingin membuat request satu per satu secara manual, gunakan konfigurasi berikut:

### 1. POST /generate-text
- URL: `http://localhost:3001/generate-text`
- Method: `POST`
- Headers:
  - `Content-Type`: `application/json`
- Body (raw -> JSON):
  ```json
  {
    "prompt": "Jelaskan perbedaan synchronous dan asynchronous dalam pemrograman."
  }
  ```
- Contoh Response:
  ```json
  {
    "result": "Synchronous mengeksekusi tugas secara berurutan sehingga proses berikutnya harus menunggu..."
  }
  ```

---

### 2. POST /generate-from-image
- URL: `http://localhost:3001/generate-from-image`
- Method: `POST`
- Body (form-data):
  - Key: `image` | Type: `File` | Value: Pilih berkas gambar (PNG, JPG, dll)
  - Key: `prompt` | Type: `Text` | Value: `Deskripsikan objek utama dalam gambar ini.` (opsional)

---

### 3. POST /generate-from-document
- URL: `http://localhost:3001/generate-from-document`
- Method: `POST`
- Body (form-data):
  - Key: `document` | Type: `File` | Value: Pilih berkas dokumen (PDF atau TXT)
  - Key: `prompt` | Type: `Text` | Value: `Buat 3 poin rangkuman dari dokumen ini.` (opsional)

---

### 4. POST /generate-from-audio
- URL: `http://localhost:3001/generate-from-audio`
- Method: `POST`
- Body (form-data):
  - Key: `audio` | Type: `File` | Value: Pilih berkas audio (MP3, WAV, dsb)
  - Key: `prompt` | Type: `Text` | Value: `Buatkan transkripsi dari rekaman audio ini.` (opsional)
