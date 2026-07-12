# 📂 GitHub Uploader

<p align="center">

<img src="https://img.shields.io/badge/Open%20Source-Yes-success?style=for-the-badge">
<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-REST%20API-181717?style=for-the-badge&logo=github">
<img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel">

</p>

<p align="center">

**Upload file, folder, maupun ZIP langsung ke repository GitHub tanpa perlu Git CLI maupun extract ZIP secara manual.**

</p>

<p align="center">

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/stargazers">
<img src="https://img.shields.io/github/stars/sannnproject/GITHUB-UPLOADER?style=social">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/network/members">
<img src="https://img.shields.io/github/forks/sannnproject/GITHUB-UPLOADER?style=social">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/issues">
<img src="https://img.shields.io/github/issues/sannnproject/GITHUB-UPLOADER?style=flat-square">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/pulls">
<img src="https://img.shields.io/github/issues-pr/sannnproject/GITHUB-UPLOADER?style=flat-square">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/commits/main">
<img src="https://img.shields.io/github/last-commit/sannnproject/GITHUB-UPLOADER?style=flat-square">
</a>

<a href="https://github.com/sannnproject/GITHUB-UPLOADER/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/sannnproject/GITHUB-UPLOADER?style=flat-square">
</a>

</p>

---

## 📖 Deskripsi

GitHub Uploader adalah aplikasi web open source yang memudahkan proses upload source code ke repository GitHub tanpa perlu menggunakan Git CLI. Pengguna cukup memasukkan GitHub Personal Access Token (PAT), memilih repository, lalu mengunggah file, folder, atau ZIP.

Jika file yang diunggah berupa ZIP, aplikasi akan mengekstraknya langsung di browser dan mengunggah seluruh isi beserta struktur folder ke repository tujuan secara otomatis.

Semua proses dilakukan langsung melalui GitHub REST API sehingga tidak memerlukan server khusus maupun database.

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

```text
User → Input GitHub Token → Pilih Repository & Branch → Upload File/Folder/ZIP → ZIP diekstrak → Upload via GitHub REST API → Commit berhasil
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

## 🔒 Keamanan

- Token tidak dikirim ke server aplikasi.
- Token hanya digunakan untuk request ke GitHub REST API.
- Penyimpanan lokal menggunakan IndexedDB.
- Tidak menggunakan database eksternal.
- Semua komunikasi menggunakan HTTPS.

---

## 🚀 Instalasi

```bash
git clone https://github.com/sannnproject/GITHUB-UPLOADER.git
cd GITHUB-UPLOADER
npm install
npm run dev
```

---

## 🌍 Deploy

- Vercel
- Netlify
- Railway
- VPS
- Docker

---

## 🤝 Contributing

1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push
5. Buat Pull Request

---

## Table of Contents

- [Overview](#-deskripsi)
- [Features](#-fitur)
- [How It Works](#️-cara-kerja)
- [Tech Stack](#️-teknologi)
- [Security](#-keamanan)
- [Installation](#-instalasi)
- [Deployment](#-deploy)
- [Project Structure](#-struktur-project)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## Project Structure

Berikut adalah struktur utama project:

```text
.
├── app/                # App Router (pages, layouts, routes)
├── components/         # Reusable UI components
├── hooks/              # Custom React Hooks
├── lib/                # Utility & helper functions
├── public/             # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

> Struktur di atas merupakan struktur utama project. Isi setiap folder dapat berkembang sesuai kebutuhan pengembangan.

---

## Build & Deploy

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Deploy to Vercel

Project ini telah dikonfigurasi agar dapat langsung di-deploy ke Vercel tanpa konfigurasi tambahan.

---

## Browser Compatibility

GitHub Uploader mendukung browser modern berikut:

| Browser | Supported |
|----------|:---------:|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ✅ |
| Brave | ✅ |
| Opera | ✅ |
| Safari | ✅ |

---

## FAQ

### Apakah harus menginstal Git?

Tidak. Semua proses upload dilakukan langsung menggunakan GitHub REST API.

### Apakah harus mengekstrak ZIP terlebih dahulu?

Tidak. File ZIP akan diproses langsung di browser.

### Apakah struktur folder akan tetap dipertahankan?

Ya. Struktur folder akan tetap sama seperti file ZIP atau folder asli.

### Apakah project ini membutuhkan database?

Tidak.

### Di mana GitHub Token disimpan?

Token disimpan secara lokal menggunakan IndexedDB dan tidak dikirim ke server aplikasi.

### Apakah project ini dapat digunakan secara gratis?

Ya.

### Apakah project ini dapat di-deploy ke Vercel?

Ya.

### Apakah project ini open source?

Ya. Project ini menggunakan Apache License 2.0.

---

## Roadmap

Fitur yang direncanakan untuk pengembangan berikutnya:

- Repository Manager
- Branch Manager
- Repository Search
- Multiple GitHub Account
- Resume Upload
- Parallel Upload
- Upload Queue
- Custom Commit Message
- Better Error Reporting
- Better Upload Progress
- File Conflict Resolution
- Drag & Drop Improvements
- Upload Statistics
- Theme Customization
- Localization (i18n)
- GitHub Enterprise Support
- Performance Optimization
- Accessibility Improvements

---

## Acknowledgements

Project ini dibangun menggunakan berbagai teknologi open source:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- JSZip
- React Dropzone
- GitHub REST API
- Vercel

Project ini menggunakan **Apache-2.0 license**
Lisensi ini mengizinkan siapa pun untuk menggunakan, memodifikasi, mendistribusikan, dan memanfaatkan project ini, termasuk untuk kebutuhan komersial, selama tetap mematuhi ketentuan Apache License 2.0.

### Hak yang diberikan

- Menggunakan project untuk keperluan pribadi maupun komersial.
- Memodifikasi source code.
- Mendistribusikan ulang project.
- Membuat project turunan.
- Memanfaatkan grant hak paten sesuai ketentuan lisensi.

### Ketentuan

- Wajib menyertakan file LICENSE.
- Wajib mempertahankan copyright notice.
- Wajib memberikan keterangan apabila melakukan perubahan.
- Tidak boleh menggunakan nama pemilik project atau kontributor sebagai bentuk endorsement tanpa izin.

Selengkapnya: https://www.apache.org/licenses/LICENSE-2.0

---

## 👨‍💻 Author

**SANN GROUP**

Membangun berbagai tools open source modern untuk membantu developer, mempermudah deployment, dan meningkatkan produktivitas workflow.

---

<p align="center">

⭐ **Jangan lupa berikan Star jika project ini bermanfaat!**

Made with ❤️ by **SANN GROUP**

</p>
