// ORGANLARIN GÖRÜNÜRLÜĞÜNÜ YÖNET
document.addEventListener("DOMContentLoaded", () => {
  const visibleOrgans = JSON.parse(localStorage.getItem("visibleOrgans")) || [];
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    const organType = card.getAttribute("data-type");
    if (!visibleOrgans.includes(organType)) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
  });

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
  e.preventDefault(); // gerçek gönderme olmaz
  document.getElementById("successMessage").style.display = "block";

  // (İsteğe bağlı) formu temizle
  this.reset();

  // (İsteğe bağlı) mesajı 2.5 saniye sonra kaldır
  setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
  }, 2500);
});

//Filtreleme
function applyFilters() {
  const selectedType = document.getElementById("filterType").value;
  const selectedHealth = document.getElementById("filterHealth").value;
  const selectedAge = document.getElementById("filterAge").value;
  const selectedGender = document.getElementById("filterGender").value;
  const selectedBlood = document.getElementById("filterBlood").value;

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    const matchesType = !selectedType || card.dataset.type === selectedType;
    const matchesHealth = !selectedHealth || card.dataset.health === selectedHealth;

    const age = parseInt(card.dataset.age);
    const matchesAge =
      !selectedAge ||
      (selectedAge === "20-30" && age >= 20 && age <= 30) ||
      (selectedAge === "31-40" && age >= 31 && age <= 40) ||
      (selectedAge === "41-50" && age >= 41 && age <= 50) ||
      (selectedAge === "51+" && age >= 51);

    const matchesGender = !selectedGender || card.dataset.gender === selectedGender;
    const matchesBlood = !selectedBlood || card.dataset.blood === selectedBlood;

    if (matchesType && matchesHealth && matchesAge && matchesGender && matchesBlood) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

