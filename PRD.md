# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## PERSONAL DEVELOPER PORTFOLIO WEBSITE

| Informasi | Detail |
|---|---|
| Project Name | Personal Developer Portfolio |
| Product Type | Personal Portfolio Website |
| Version | 1.0 |
| Platform | Web |
| Framework | Next.js |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Database | Tidak diperlukan untuk versi awal |

---

## 1. Project Overview

Personal Developer Portfolio merupakan website pribadi yang digunakan untuk memperkenalkan profil, kemampuan, pengalaman belajar, dan hasil proyek yang telah dikembangkan.

Website ini dirancang sebagai personal branding platform untuk menunjukkan kemampuan dalam bidang pengembangan website dan aplikasi mobile.

Desain website mengusung konsep Elegant, Minimalist, dan Editorial dengan tampilan profesional, bersih, serta tidak berlebihan.

## 2. Project Objectives

1. Membangun identitas profesional sebagai developer.
2. Menampilkan proyek yang pernah dikembangkan.
3. Memperkenalkan kemampuan dan teknologi yang dikuasai.
4. Mempermudah pengunjung mengakses GitHub dan menghubungi developer.
5. Menjadi media personal branding untuk kebutuhan magang, PKL, dan peluang kerja di masa depan.

## 3. Target Users

- Recruiter dan perusahaan teknologi.
- Software developer.
- Calon klien atau partner proyek.
- Pengunjung yang ingin mengenal profil developer.

## 4. Technology Stack

| Teknologi | Fungsi |
|---|---|
| Next.js | Framework utama |
| TypeScript | Bahasa pemrograman |
| Tailwind CSS | Styling dan responsive layout |
| Framer Motion | Animasi dan interaksi |
| Lucide React | Icon |
| Vercel | Deployment dan hosting |
| Git & GitHub | Version control |

Arsitektur menggunakan Next.js App Router.

Database tidak digunakan pada versi awal karena konten portfolio dapat dikelola melalui data statis.

## 5. Website Structure

### 5.1 Home / Hero

Menampilkan identitas utama developer.

Informasi:
- Nama developer.
- Profesi Full Stack Web & Flutter Developer.
- Deskripsi singkat.
- Lokasi.
- Tombol Explore My Work.
- Tombol Contact Me.

### 5.2 About

Menampilkan informasi mengenai developer.

Informasi:
- Perkenalan diri.
- Minat dalam pengembangan software.
- Fokus pengembangan web dan mobile.
- Pendekatan dalam membangun aplikasi.

### 5.3 Skills & Technologies

Menampilkan teknologi yang pernah digunakan.

Kategori:
- Frontend Development.
- Backend Development.
- Mobile Development.
- Database & Tools.

Teknologi awal:
- HTML, CSS, JavaScript, TypeScript.
- PHP, Laravel.
- Flutter, Dart.
- Firebase, PostgreSQL.
- Git, GitHub.

### 5.4 Projects

Menampilkan daftar proyek yang pernah dikembangkan.

Data setiap proyek:
- Nama proyek.
- Deskripsi.
- Kategori.
- Teknologi.
- Thumbnail atau screenshot.
- Link repository.
- Link live demo jika tersedia.

Proyek awal:

1. Jurnal Jatim Carnival
   - Aplikasi informasi event dan budaya Jawa Timur.
   - Flutter dan Firebase.

2. Ungkepan SN Online Shop
   - Website toko online produk ungkepan.
   - Laravel dan database relasional.

3. SANJAYA
   - Aplikasi inventaris dan manajemen penjualan.
   - React Native dan Supabase.

### 5.5 Contact

Menampilkan informasi kontak dan tautan sosial.

- Email.
- GitHub.
- Instagram.

Tombol email menggunakan mailto agar pengunjung dapat langsung menghubungi developer melalui aplikasi email.

### 5.6 Footer

Menampilkan:
- Nama developer.
- Copyright.
- Social links.
- Informasi desain dan pengembangan website.

## 6. Functional Requirements

| ID | Fitur | Deskripsi |
|---|---|---|
| FR-01 | Navigation | Navigasi menuju setiap section |
| FR-02 | Hero CTA | Tombol menuju Projects dan Contact |
| FR-03 | About | Menampilkan profil developer |
| FR-04 | Skills | Menampilkan daftar teknologi |
| FR-05 | Projects | Menampilkan proyek yang dikembangkan |
| FR-06 | Project Details | Menampilkan informasi detail proyek |
| FR-07 | Social Links | Mengarahkan pengunjung ke akun sosial |
| FR-08 | Contact | Menghubungkan pengunjung melalui email |
| FR-09 | Responsive | Mendukung desktop, tablet, dan mobile |
| FR-10 | Animations | Menampilkan transisi yang halus |

## 7. Non-Functional Requirements

### Performance
- Website harus memiliki waktu loading yang optimal.
- Optimasi gambar menggunakan Next.js Image.
- Hindari JavaScript dan animasi yang tidak diperlukan.

### Responsive Design
- Desktop: layout luas dan editorial.
- Tablet: layout menyesuaikan lebar layar.
- Mobile: navigasi ringkas dan konten tersusun vertikal.

### Accessibility
- Kontras warna yang mudah dibaca.
- Alt text pada gambar.
- Navigasi dapat digunakan melalui keyboard.
- Struktur heading yang teratur.

### SEO
- Page title dan meta description.
- Open Graph metadata.
- Favicon.
- Semantic HTML.
- Sitemap dan robots.txt.

### Maintainability
- Menggunakan komponen reusable.
- Struktur folder terorganisasi.
- TypeScript untuk konsistensi tipe data.
- Konten proyek dikelola melalui satu sumber data.

## 8. UI/UX Guidelines

### Design Principles
- Elegant and minimal.
- Editorial typography.
- Intentional whitespace.
- Clear visual hierarchy.
- Consistent spacing.
- Subtle interactions.

### Color Palette

| Warna | Hex |
|---|---|
| Background | #F7F6F2 |
| Primary Text | #20211F |
| Secondary Text | #777873 |
| Accent | #7886A8 |
| Border | #E5E3DC |

### Typography
- Sans-serif untuk teks utama.
- Serif sebagai aksen heading.
- Ukuran dan ketebalan font harus konsisten.

### Animation
- Smooth scrolling.
- Subtle fade-in.
- Hover transition.
- Minimal page transitions.

Animasi tidak boleh mengganggu performa maupun aksesibilitas.

## 9. Recommended Folder Structure

```text
portfolio/
├── public/
│   ├── images/
│   │   └── projects/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── data/
│   │   ├── projects.ts
│   │   └── skills.ts
│   └── types/
│       └── index.ts
├── package.json
└── README.md
```

## 10. Deployment

Website akan di-deploy menggunakan Vercel.

Tahapan:
1. Membuat repository GitHub.
2. Push source code ke GitHub.
3. Import repository ke Vercel.
4. Konfigurasi build settings jika diperlukan.
5. Deploy website.
6. Menghubungkan custom domain jika tersedia.

## 11. Project Scope

### Included
- Personal profile.
- About section.
- Skills section.
- Project showcase.
- Contact section.
- Responsive design.
- SEO dasar.
- Animasi sederhana.
- Deployment ke Vercel.

### Excluded (Initial Version)
- Admin dashboard.
- Authentication.
- Database.
- Blog CMS.
- Sistem komentar.
- Backend API.
- Contact form dengan penyimpanan pesan.

Fitur tambahan dapat dipertimbangkan setelah versi pertama selesai.

## 12. Acceptance Criteria

Website dinyatakan selesai apabila:

1. Seluruh section dapat ditampilkan dengan baik.
2. Navigasi berfungsi.
3. Seluruh tautan sosial dapat diakses.
4. Project showcase menampilkan informasi yang benar.
5. Tampilan responsif di desktop dan mobile.
6. Tidak terdapat error penting pada browser console.
7. Website berhasil di-deploy ke Vercel.
8. Metadata SEO dasar telah diterapkan.
9. Tidak ada konten atau pencapaian yang dibuat-buat.

## 13. Development Priority

| Prioritas | Pekerjaan |
|---|---|
| High | Setup Next.js dan struktur project |
| High | Implementasi layout dan hero |
| High | About, Skills, Projects |
| High | Responsive design |
| High | Contact dan social links |
| Medium | Animasi dan interaksi |
| Medium | SEO dan optimasi performa |
| Medium | Deployment Vercel |

## 14. Future Improvements

- Blog atau artikel seputar programming.
- Detail halaman setiap proyek.
- Dark mode.
- CMS untuk mengelola konten.
- Analytics pengunjung.
- Custom domain.

---

**End of Document**