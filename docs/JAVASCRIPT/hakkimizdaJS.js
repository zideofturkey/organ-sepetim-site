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


 const modal = document.getElementById("imgModal");
  const img = document.getElementById("aboutThumbnail");
  const modalImg = document.getElementById("modalImg");
  const close = document.getElementsByClassName("close")[0];

  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  }

  close.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }

// Sayaç animasyonu fonksiyonu
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Intersection Observer ile sayfa o kısma geldiğinde başlat
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateCounters();
      statsAnimated = true; // Bir kere çalışsın diye
    }
  });
}, { threshold: 0.5 }); // Yüzde 50 görünürlük

observer.observe(statsSection);



//SLIDER
let slideIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

function plusTestimonial(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

// İlk gösterim
showSlide(slideIndex);

// Otomatik geçiş (her 5 saniyede bir)
setInterval(() => {
  plusTestimonial(1);
}, 5000);


