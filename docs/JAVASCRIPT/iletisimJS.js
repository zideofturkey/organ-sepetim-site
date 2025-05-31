/*ÜST MENU STICKY*/

let navbar = document.getElementById("mainNavbar");
let timeoutId = null;
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  let currentScrollY = window.scrollY;

  // Sadece aşağı kaydırma ve sayfanın üst kısmındayken
  if (currentScrollY > lastScrollY && lastScrollY < 150) {
    navbar.style.transform = "translateY(-70px)"; // yukarı kaydır
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      navbar.style.transform = "translateY(0)"; // geri getir
    }, 100); // gecikme (dilediğin gibi ayarla)
  }

  lastScrollY = currentScrollY;
});

//FAQ

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});

