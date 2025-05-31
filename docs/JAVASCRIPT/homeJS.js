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

// === SEPET VE FAVORİ EKLEME ===
document.querySelectorAll('.cart-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = btn.closest('.product-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const imgname = card.dataset.imgname;
    const price = card.dataset.price;


    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, imgname, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(`${name} sepete eklendi`);
  });
});

document.querySelectorAll('.fav-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = btn.closest('.product-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const imgname = card.dataset.imgname;
    const price = card.dataset.price;
    

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    
    let exists = favs.some(item => item.id.toString() === id);
    if (!exists) {
      favs.push({ id, name, imgname, price });
      localStorage.setItem("favorites", JSON.stringify(favs));
      showToast(`${name} favorilere eklendi`);
    } else {
      showToast(`${name} zaten favorilerde`);
    }
  });
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.classList.remove("hide");  // varsa önceki çıkışı sil
  toast.classList.add("show");

  // 2 saniye sonra çıkış animasyonu başlat
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 2000);
}

const organlarSection = document.querySelector(".product-section");
const hakkimizdaSection = document.querySelector(".about-section");
const bagisSection = document.querySelector(".donation-section");
const iletisimSection = document.querySelector(".contact-section");

const bgTextOrganlar = document.getElementById("bgTextOrganlar");
const bgTextHakkimizda = document.getElementById("bgTextHakkimizda");
const bgTextBagis = document.getElementById("bgTextBagis");
const bgTextIletisim = document.getElementById("bgTextIletisim");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const screenHeight = window.innerHeight;

  const organlarTop = organlarSection.offsetTop;
  const hakkimizdaTop = hakkimizdaSection.offsetTop;
  const bagisTop = bagisSection.offsetTop;
  const iletisimTop = iletisimSection.offsetTop;

  if (scrollY >= organlarTop - screenHeight / 2 && scrollY < hakkimizdaTop - screenHeight / 2) {
    bgTextOrganlar.style.opacity = "1";
    bgTextHakkimizda.style.opacity = "0";
    bgTextBagis.style.opacity = "0";
    bgTextIletisim.style.opacity = "0";
  } else if (scrollY >= hakkimizdaTop - screenHeight / 2 && scrollY < bagisTop - screenHeight / 2) {
    bgTextOrganlar.style.opacity = "0";
    bgTextHakkimizda.style.opacity = "1";
    bgTextBagis.style.opacity = "0";
    bgTextIletisim.style.opacity = "0";
  } else if (scrollY >= bagisTop - screenHeight / 2 && scrollY < iletisimTop - screenHeight / 2) {
    bgTextOrganlar.style.opacity = "0";
    bgTextHakkimizda.style.opacity = "0";
    bgTextIletisim.style.opacity = "0";
    bgTextBagis.style.opacity = "1";
  } else if (scrollY >= iletisimTop - screenHeight / 2) {
    bgTextOrganlar.style.opacity = "0";
    bgTextHakkimizda.style.opacity = "0";
    bgTextBagis.style.opacity = "0";
    bgTextIletisim.style.opacity = "1";
  } else if (scrollY >= iletisimTop - screenHeight / 2) {
    bgTextOrganlar.style.opacity = "0";
    bgTextHakkimizda.style.opacity = "0";
    bgTextBagis.style.opacity = "0";
    bgTextIletisim.style.opacity = "1";
  } else {
    bgTextOrganlar.style.opacity = "0";
    bgTextHakkimizda.style.opacity = "0";
    bgTextBagis.style.opacity = "0";
    bgTextIletisim.style.opacity = "0";
  }
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

  const phoneInput = document.getElementById("phoneInput");

phoneInput.addEventListener("focus", () => {
  phoneInput.placeholder = "05XXXXXXXXXX";
});

phoneInput.addEventListener("blur", () => {
  phoneInput.placeholder = "Telefon Numaranız";
});

//Home video JS
function playVideo() {
  document.querySelector(".video-thumbnail").style.display = "none";
  document.querySelector(".video-iframe").style.display = "block";
}

//Pop-up Form

const modal2 = document.getElementById("donationModal");
const openBtns = document.querySelectorAll(".donate-btn");
const closeBtn = document.getElementById("closeDonationModal");

openBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal2.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal2.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal2) {
    modal2.style.display = "none";
  }
});

document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Form verilerini al
  const adSoyad = this.querySelector('input[name="adSoyad"]').value.trim();
  const telefon = this.querySelector('input[name="telefon"]').value.trim();
  const email = this.querySelector('input[name="email"]').value.trim();
  const mesaj = this.querySelector('textarea[name="mesaj"]').value.trim();
  const organlar = Array.from(this.querySelectorAll('input[name="organlar"]:checked')).map(el => el.value);

  // Form kontrolü
  if (!adSoyad || !telefon || !email || organlar.length === 0) {
    alert("Lütfen tüm gerekli alanları doldurun.");
    return;
  }

  // Backend'e POST isteği gönder
  fetch("https://organ-sepetim-backend.onrender.com/api/bagis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adSoyad, telefon, email, organlar, mesaj })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("successMessage").style.display = "block";
        this.reset();

        setTimeout(() => {
          document.getElementById("successMessage").style.display = "none";
          modal2.style.display = "none"; // form kapatılsın
        }, 2500);
      } else {
        alert("Form gönderilirken hata oluştu.");
      }
    })
    .catch(err => {
      alert("Bağlantı hatası: " + err.message);
    });
});


//LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const userRole = localStorage.getItem("userRole");
  const isHomePage = path.includes("home.html") || path === "/" || path.includes("index.html");

  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const adminIcon = document.getElementById("adminIcon");
  const logoutDotContainer = document.getElementById("logoutDotContainer");
  const logoutMenu = document.getElementById("logoutMenu");

  // ✅ Login modal sadece home sayfasında ve giriş yapılmamışsa gösterilsin
  if (isHomePage && !userRole) {
    if (loginModal) loginModal.style.display = "flex";
  } else {
    if (loginModal) loginModal.style.display = "none";
  }

  // ✅ Login form işleme
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("https://organ-sepetim-backend.onrender.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("lastLoginTime", Date.now());

        showCustomAlert(`${data.role === "admin" ? "Admin" : "Kullanıcı"} olarak giriş yapıldı.`);
        closeLoginModal();
        data.role === "admin" ? showAdminIcon() : hideAdminIcon();
        showLogoutDot();
      } else {
        showCustomAlert("Geçersiz kullanıcı adı veya parola.");
      }
    })
    .catch(() => {
      showCustomAlert("Sunucu hatası. Giriş yapılamadı.");
    });
});
};
  function closeLoginModal() {
    if (loginModal) loginModal.style.display = "none";
  }

  function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.classList.add("show");
      setTimeout(() => alertBox.classList.remove("show"), 4000);
    }
  }

  // ✅ Account simgesi kontrolü (admin için)
  if (userRole === "admin") {
    showAdminIcon();
  } else {
    hideAdminIcon();
  }

  function showAdminIcon() {
    if (adminIcon) adminIcon.style.display = "inline-block";
  }

  function hideAdminIcon() {
    if (adminIcon) adminIcon.style.display = "none";
  }

  // ✅ Siyah nokta (logout) kontrolü – user ve admin için görünür
  if (userRole && logoutDotContainer) {
    showLogoutDot();
  }

  function showLogoutDot() {
    if (logoutDotContainer) logoutDotContainer.style.display = "inline-block";
  }

  // ✅ Çıkış işlemi
const logoutDot = document.getElementById("logoutDot");

if (logoutDot) {
  logoutDot.addEventListener("click", () => {
    localStorage.removeItem("userRole");

    // login modalı göster
    if (loginModal) loginModal.style.display = "flex";

    // simgeleri gizle
    hideAdminIcon();
    if (logoutDotContainer) logoutDotContainer.style.display = "none";
 });
  }
  });
