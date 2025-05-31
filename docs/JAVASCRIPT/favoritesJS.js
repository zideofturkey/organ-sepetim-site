// === FAVORİ LİSTELEME ===
const container = document.getElementById("favoritesContainer");
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  container.innerHTML = '<p id = "empty-fv">Favoriler listeniz boş.</p>';
} else {
  favorites.forEach((item, index) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="../gorseller/${item.imgname.toLowerCase()}.png" alt="${item.name}" class="product-img">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-price">₺${item.price}.000</p>
        <div class="product-actions">
          <button class="cart-btn" onclick="addToCart(${index})">Sepete Ekle</button>
          <button class="fav-btn" onclick="removeFavorite(${index})">✖</button>
        </div>
      </div>
    `;
  });
}

// === Favoriden Silme ===
function removeFavorite(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}

// === Sepete Ekleme ===
function addToCart(index) {
  const item = favorites[index];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${item.name} sepete eklendi ✔`);
}

// === Bildirim (Toast) ===
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hide");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 2000);
}