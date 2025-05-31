// === Üst Menü Sticky ===
let navbar = document.getElementById("mainNavbar");
let timeoutId = null;
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  let currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && lastScrollY < 150) {
    navbar.style.transform = "translateY(-70px)";
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      navbar.style.transform = "translateY(0)";
    }, 100);
  }
  lastScrollY = currentScrollY;
});

// === Sepet Listeleme ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cartContainer");
let total = 0;


if (cart.length === 0) {
  container.innerHTML = '<p id = "empty-bag">Sepetiniz boş.</p>';
} else {
  cart.forEach((item, index) => {
    total += parseFloat(item.price);


    container.innerHTML += `
      <div class="cart-card">
        <img src="../GORSELLER/${item.imgname}.png" alt="${item.name}">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>Fiyat: ₺${item.price}.00</p>
          <button onclick="removeItem(${index})">Kaldır</button>
        </div>
      </div>
    `;
  });
}

// TümÜrünleriSil Butonu sadece ürün varsa ekle
if (cart.length > 0) {
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Tüm Ürünleri Sil";
  clearBtn.className = "clear-cart-btn";

  clearBtn.addEventListener("click", () => {
    if (confirm("Tüm ürünleri silmek istediğinize emin misiniz?")) {
      localStorage.removeItem("cart");
      location.reload();
    }
  });

  container.appendChild(clearBtn);
}


document.getElementById("totalPrice").innerHTML = `<p><strong>Toplam: </strong> ₺${total}.00</p>`;
document.getElementById("montagePrice").innerHTML = `<p><strong>Montaj: </strong> ₺${total}.00</p>`;

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
