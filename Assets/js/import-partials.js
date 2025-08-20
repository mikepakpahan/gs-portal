fetch("/Layout/Partials/sidebar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("sidebar").innerHTML = data;
  });
fetch("/Layout/Partials/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });
