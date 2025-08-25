// import-partials.js
document.addEventListener("DOMContentLoaded", async () => {
  // --- Fungsi dari kode yang kamu berikan ---
  fetch("/Layout/Partials/sidebar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("sidebar").innerHTML = data;
    });

  fetch("/Layout/Partials/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      // Ambil elemen setelah sidebar dimuat
      const hamburgerBtn = document.getElementById("hamburger-btn");
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");

      function toggleSidebar() {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
      }

      // Pastikan elemen ada sebelum menambahkan event listener
      if (hamburgerBtn && sidebar && overlay) {
        hamburgerBtn.addEventListener("click", toggleSidebar);
        overlay.addEventListener("click", toggleSidebar);
      }
    });

  // --- Fungsi dan Logika Tab Flowchart yang ditambahkan ---

  // Fungsi untuk memuat dan menyisipkan HTML
  async function loadAndInsertHtml(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (element) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
      } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        element.innerHTML = `<p style="color: red;">Gagal memuat konten dari ${filePath}</p>`;
      }
    }
  }

  // Muat konten flowchart untuk bagian Modif dan Do
  // Path file telah diperbarui agar sesuai dengan /Assets/pages/
  // Konten Input tidak lagi di-load karena sudah di-embed langsung di HTML utama
  await loadAndInsertHtml("flowchart-modif-section", "/Pages/flowchart/flowchart_modif.html");
  await loadAndInsertHtml("flowchart-do-section", "/Pages/flowchart/flowchart_do.html");

  // Logika Tab Dinamis
  const navbar = document.getElementById("flowchart-navbar");
  const tabLinks = navbar ? navbar.querySelectorAll("a") : [];
  const contentSections = document.querySelectorAll(".flowchart-content-section");
  // Fungsi untuk mengaktifkan tab dan menampilkan konten yang sesuai
  function activateTab(targetId) {
    // Hapus kelas 'active-tab' dari semua link
    tabLinks.forEach((link) => {
      link.classList.remove("active-tab");
      // Pastikan kelas hover juga dihapus saat tab aktif
      link.classList.remove("hover:text-indigo-600", "hover:border-indigo-600");
    });

    // Sembunyikan semua konten section
    contentSections.forEach((section) => {
      section.style.display = "none";
    });

    // Tambahkan kelas 'active-tab' ke link yang diklik
    const activeLink = document.querySelector(`[data-target="${targetId}"]`);
    if (activeLink) {
      activeLink.classList.add("active-tab");
    }

    // Tampilkan konten yang sesuai
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  }

  // Tambahkan event listener untuk setiap link tab
  tabLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah browser melompat ke bagian atas halaman
      const targetId = link.getAttribute("data-target");
      if (targetId) {
        activateTab(targetId);
      }
    });
  });

  // Aktifkan tab pertama (Input) secara default saat halaman dimuat
  // Karena Input sudah di-embed dan aktif by default di HTML,
  // kita cukup pastikan logika tab menyesuaikan diri.
  // Jika tabLinks[0] adalah 'Input', maka ini akan memastikan kelasnya benar.
  if (tabLinks.length > 0) {
    const defaultTarget = tabLinks[0].getAttribute("data-target");
    activateTab(defaultTarget); // Ini akan mengaktifkan 'Input' dan memastikan kelas aktifnya benar
  }
});
