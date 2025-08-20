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

    if (hamburgerBtn && sidebar && overlay) {
      hamburgerBtn.addEventListener("click", toggleSidebar);
      overlay.addEventListener("click", toggleSidebar);
    }
  });
