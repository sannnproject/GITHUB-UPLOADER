# 🚀 GitHub Uploader

<p align="center">

<img src="https://img.shields.io/badge/Open%20Source-Yes-success?style=for-the-badge">
<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-REST%20API-181717?style=for-the-badge&logo=github">
<img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel">
<img src="https://img.shields.io/badge/Dark%20Mode-Supported-black?style=for-the-badge">
<img src="https://img.shields.io/badge/Responsive-Mobile%20Friendly-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/ZIP-Auto%20Extract-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Database-Not%20Required-blueviolet?style=for-the-badge">
<img src="https://img.shields.io/badge/Storage-IndexedDB-4CAF50?style=for-the-badge">
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">

</p>

<p align="center">

**Upload file, folder, maupun ZIP langsung ke repository GitHub tanpa perlu Git CLI maupun extract ZIP secara manual.**

Modern • Fast • Secure • Open Source

</p>

<p align="center">

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/stargazers">
<img src="https://img.shields.io/github/stars/sannnproject/GITHUB-UPLOADER?style=social">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/network/members">
<img src="https://img.shields.io/github/forks/sannnproject/GITHUB-UPLOADER?style=social">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/issues">
<img src="https://img.shields.io/github/issues/sannnproject/GITHUB-UPLOADER">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/pulls">
<img src="https://img.shields.io/github/issues-pr/sannnproject/GITHUB-UPLOADER">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/commits/main">
<img src="https://img.shields.io/github/last-commit/sannnproject/GITHUB-UPLOADER">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/sannnproject/GITHUB-UPLOADER">
</a>

</p>

---

## 📖 Deskripsi

GitHub Uploader adalah aplikasi web open source yang memudahkan proses upload source code ke repository GitHub tanpa perlu menggunakan Git CLI. Pengguna cukup memasukkan **GitHub Personal Access Token (PAT)**, memilih repository, lalu mengunggah file, folder, atau ZIP.

Jika file yang diunggah berupa ZIP, aplikasi akan mengekstraknya langsung di browser dan mengunggah seluruh isi beserta struktur folder ke repository tujuan secara otomatis.

Semua proses dilakukan langsung melalui **GitHub REST API**, sehingga tidak memerlukan server khusus maupun database.

---

## ✨ Fitur

- 📦 Upload file langsung ke GitHub Repository
- 🗂 Upload folder dengan struktur tetap
- 🗜 Upload file ZIP tanpa extract manual
- ⚡ Auto Extract ZIP di browser
- 🌳 Struktur folder tetap dipertahankan
- 📂 Pilih Repository
- 🌿 Pilih Branch
- 🔍 Preview file sebelum upload
- 📊 Progress upload real-time
- 📜 Riwayat upload
- 💾 Penyimpanan konfigurasi menggunakan IndexedDB
- 🎨 Modern UI
- 🌙 Dark Mode
- 📱 Responsive
- 🚀 Deploy Ready di Vercel

---

## ⚙️ Cara Kerja

```
User
 │
 ▼
Masukkan GitHub Personal Access Token
 │
 ▼
Ambil daftar Repository
 │
 ▼
Pilih Repository & Branch
 │
 ▼
Upload File / Folder / ZIP
 │
 ▼
ZIP diekstrak otomatis
 │
 ▼
Semua file diproses
 │
 ▼
Upload melalui GitHub REST API
 │
 ▼
Commit berhasil
```

---

## 🛠️ Teknologi

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- App Router
- Framer Motion
- JSZip
- React Dropzone
- GitHub REST API
- IndexedDB
- Vercel

---

## 📦 Upload ZIP

Cukup upload file ZIP seperti:

```
Website.zip
```

Aplikasi akan secara otomatis:

- Membaca isi ZIP
- Mengekstrak seluruh file
- Mempertahankan struktur folder
- Mengupload seluruh file ke repository GitHub

Tanpa perlu extract manual.

---

## 📁 Contoh Struktur

ZIP

```
Project.zip

Project/
├── app/
├── components/
├── public/
├── package.json
└── README.md
```

Repository

```
Repository

├── app/
├── components/
├── public/
├── package.json
└── README.md
```

---

## 🔒 Keamanan

- Token tidak dikirim ke server aplikasi
- Token hanya digunakan untuk request GitHub API
- Penyimpanan lokal menggunakan IndexedDB
- Tidak menggunakan database eksternal
- Tidak mengumpulkan data pengguna
- Semua komunikasi menggunakan HTTPS

---

## 🚀 Instalasi

```bash
git clone https://github.com/sannnproject/GITHUB-UPLOADER.git
```

```bash
cd GITHUB-UPLOADER
```

```bash
npm install
```

```bash
npm run dev
```

---

## 🌍 Deploy

Project siap di-deploy ke:

- Vercel
- Netlify
- Railway
- VPS
- Docker

---

## 📂 Struktur Project

```
app/
components/
hooks/
lib/
public/

package.json
next.config.ts
tailwind.config.ts
tsconfig.json
README.md
```

---

## 💡 Kelebihan

- Tidak perlu Git CLI
- Tidak perlu Terminal
- Tidak perlu extract ZIP
- Upload lebih cepat
- Struktur folder tetap
- Mudah digunakan
- Modern UI
- Ringan
- Cocok untuk pemula
- 100% Browser Based

---

## ❓ FAQ

### Apakah harus install Git?

Tidak.

### Apakah harus extract ZIP?

Tidak.

### Apakah struktur folder tetap?

Ya.

### Apakah aman?

Ya.

### Apakah membutuhkan database?

Tidak.

### Apakah gratis?

Ya.

---

## 🗺️ Roadmap

- Multi Account
- Resume Upload
- Drag & Drop Improvement
- Repository Manager
- Commit History
- File Manager
- Multi Branch Upload
- GitHub Enterprise Support

---

## 🤝 Contributing

Kontribusi selalu diterima.

1. Fork repository
2. Buat branch baru
3. Lakukan perubahan
4. Commit
5. Push
6. Buat Pull Request

---

## 📄 License

Project ini menggunakan lisensi **MIT License**.

---

## 👨‍💻 Author

**SANN Project**

Membangun berbagai tools open source modern untuk membantu developer, mempermudah deployment, dan meningkatkan produktivitas workflow pengembangan aplikasi.

---

<p align="center">

⭐ **Jangan lupa berikan Star jika project ini bermanfaat!**

</p>
