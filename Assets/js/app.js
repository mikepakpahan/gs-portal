// === PERBAIKAN: Menjalankan script setelah semua HTML dimuat ===
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Fungsi untuk membuka/menutup sidebar dan overlay
  function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // Pastikan elemennya ada sebelum menambahkan event listener
  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
  }
});
