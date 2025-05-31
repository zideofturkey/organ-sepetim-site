document.addEventListener("DOMContentLoaded", () => {
  const organlar = [
    { id: "Böbrek", ad: "Böbrek" },
    { id: "Kalp", ad: "Kalp" },
    { id: "Akciğer", ad: "Akciğer" },
    { id: "Karaciğer", ad: "Karaciğer" },
    { id: "Göz", ad: "Göz" },
    { id: "Dalak", ad: "Dalak" },
    { id: "Pankreas", ad: "Pankreas" },
    { id: "Beyin", ad: "Beyin" },
    { id: "Burun", ad: "Burun" },
    { id: "Kornea", ad: "Kornea" },
    { id: "Deri", ad: "Deri" },
    { id: "Kemik", ad: "Kemik" }
  ];

  const contentArea = document.querySelector(".content");

  // === Menü bağlantıları ===
  document.getElementById("menu-organ-ekle").addEventListener("click", () => {
    renderOrganPanel();
  });

  document.getElementById("menu-stok").addEventListener("click", () => {
    renderStokTakibi();
  });

  document.getElementById("menu-kullanicilar").addEventListener("click", () => {
    renderKullaniciYonetimi();
  });

  document.getElementById("menu-bagislar").addEventListener("click", () => {
  renderBagislar();
  });


  // === Sayfa ilk yüklendiğinde Organ panelini göster
  renderOrganPanel();

  // === Organları Ekle/Sil Paneli ===
  function renderOrganPanel() {
    const visibleOrgans = JSON.parse(localStorage.getItem("visibleOrgans")) || [];

    const html = `
      <h2>Organları Aktifleştir/Sil</h2>
      <div class="organ-list">
        ${organlar.map(org => {
          const isActive = visibleOrgans.includes(org.id);
          return `
            <div class="organ-card" data-id="${org.id}">
              <h3>${org.ad}</h3>
              <button class="toggle-btn" style="background-color:${isActive ? '#e74c3c' : '#27ae60'}">
                ${isActive ? "Sil" : "Ekle"}
              </button>
            </div>`;
        }).join("")}
      </div>
    `;

    contentArea.innerHTML = html;
    setupToggleButtons();
  }

  function setupToggleButtons() {
    const buttons = document.querySelectorAll(".toggle-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const organId = button.parentElement.dataset.id;
        let visibleOrgans = JSON.parse(localStorage.getItem("visibleOrgans")) || [];

        const index = visibleOrgans.indexOf(organId);
        if (index === -1) {
          visibleOrgans.push(organId);
        } else {
          visibleOrgans.splice(index, 1);
        }

        localStorage.setItem("visibleOrgans", JSON.stringify(visibleOrgans));
        renderOrganPanel(); // tekrar yükle
      });
    });
  }

 // === Gelişmiş Stok Takibi Paneli ===
function renderStokTakibi() {
  fetch("https://organ-sepetim-backend.onrender.com/api/stoklar")
    .then(res => res.json())
    .then(stokListesi => {
      const html = `
        <h2>Organ Stok Takibi</h2>

        <div style="margin-bottom: 20px;">
          <input id="organName" placeholder="Organ adı">
          <input id="organAdet" type="number" placeholder="Stok adedi">
          <button id="stokEkleBtn">Ekle / Güncelle</button>
        </div>

        <table class="stok-table">
          <thead>
            <tr>
              <th>Organ</th>
              <th>Stok</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody id="stokTabloBody">
            ${stokListesi.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.adet} adet</td>
                <td><button class="sil-btn" data-name="${item.name}">Sil</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="text-align: right; margin-top: 20px;">
          <button id="indirExcelBtn" class="excel-btn">Rapor İndir</button>
        </div>
      `;

      document.querySelector(".content").innerHTML = html;

      // Excel rapor indirme
      document.getElementById("indirExcelBtn").addEventListener("click", () => {
        exportToExcel(stokListesi);
      });

      // ✅ Ekle/Güncelle butonu çalıştır
      document.getElementById("stokEkleBtn").addEventListener("click", () => {
        const name = document.getElementById("organName").value.trim();
        const adet = parseInt(document.getElementById("organAdet").value.trim(), 10);

        if (!name || isNaN(adet)) {
          alert("Geçerli organ adı ve stok girin.");
          return;
        }

        fetch("https://organ-sepetim-backend.onrender.com/api/stoklar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, adet })
        })
          .then(response => {
            if (!response.ok) throw new Error("Ekleme/Güncelleme başarısız");
            return response.json();
          })
          .then(() => renderStokTakibi());
      });

      // ✅ Sil butonlarını aktive et
      document.querySelectorAll(".sil-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const name = btn.dataset.name;
          fetch(`https://organ-sepetim-backend.onrender.com/${encodeURIComponent(name)}`, {
            method: "DELETE"
          })
            .then(response => {
              if (!response.ok) throw new Error("Silme başarısız");
              return response.json();
            })
            .then(() => renderStokTakibi());
        });
      });
    })
    .catch(err => {
      document.querySelector(".content").innerHTML = `<p style="color: red;">Veri alınamadı: ${err.message}</p>`;
    });
}


//Kullanıcılar
function renderKullaniciYonetimi() {
  fetch("https://organ-sepetim-backend.onrender.com/api/users")
    .then(res => res.json())
    .then(users => {
      const html = `
        <h2>Kullanıcı Yönetimi</h2>

        <form id="addUserForm" style="margin-bottom: 20px;">
          <input type="text" id="newUsername" placeholder="Kullanıcı Adı" required>
          <input type="password" id="newPassword" placeholder="Parola" required>
          <select id="newRole" required>
            <option value="user">Kullanıcı</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Ekle</button>
        </form>

        <div id="user-list">
          ${users.map(user => `
            <div class="user-card">
              <h3>${user.username}</h3>
              <p>Rol: ${user.role}</p>
              <p>Son Giriş: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString("tr-TR") : "Henüz giriş yapılmadı"}</p>
              <button onclick="editUser(${user.id}, '${user.username}', '${user.role}')">Düzenle</button>
              <button onclick="deleteUser(${user.id})">Sil</button>
            </div>
          `).join("")}
        </div>
      `;

      document.querySelector(".content").innerHTML = html;

      // Yeni kullanıcı ekleme işlemi
      document.getElementById("addUserForm").addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;
        const role = document.getElementById("newRole").value;

        fetch("https://organ-sepetim-backend.onrender.com/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role })
        })
        .then(res => res.json())
        .then(() => renderKullaniciYonetimi());
      });
    })
    .catch(err => {
      document.querySelector(".content").innerHTML = `<p style="color: red;">Kullanıcılar yüklenemedi: ${err.message}</p>`;
    });
}

// ✅ Kullanıcı silme fonksiyonu
window.deleteUser = function(id) {
  if (confirm("Bu kullanıcıyı silmek istiyor musunuz?")) {
    fetch(`https://organ-sepetim-backend.onrender.com/api/users/${id}`, {
      method: "DELETE"
    })
    .then(() => renderKullaniciYonetimi())
    .catch(err => alert("Silme işlemi başarısız: " + err.message));
  }
};

// ✅ Kullanıcı düzenleme fonksiyonu
window.editUser = function(id, currentUsername, currentRole) {
  const newUsername = prompt("Yeni kullanıcı adı:", currentUsername);
  if (!newUsername) return;

  const newRole = prompt("Yeni rol (admin/user):", currentRole);
  if (!newRole || !["admin", "user"].includes(newRole)) {
    alert("Geçerli bir rol giriniz (admin/user)");
    return;
  }

  fetch(`https://organ-sepetim-backend.onrender.com/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUsername, role: newRole })
  })
  .then(res => {
    if (!res.ok) throw new Error("Güncelleme başarısız");
    return res.json();
  })
  .then(() => renderKullaniciYonetimi())
  .catch(err => alert("Hata: " + err.message));
};

});

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Stok Verisi");

  // Dosyayı oluştur ve indir
  XLSX.writeFile(workbook, "organ-stok-raporu.xlsx");
}

// === Kullanıcı detayı gösterme fonksiyonu ===
window.showUserDetails = function (username) {
  const lastLoginTime = Number(localStorage.getItem("lastLoginTime"));
  const formattedDate = lastLoginTime
    ? new Date(lastLoginTime).toLocaleString("tr-TR")
    : "Bilinmiyor";

  const role = username === "admin" ? "Admin" : "Kullanıcı";

  const detailsBox = document.getElementById("user-details");
  detailsBox.style.display = "block";
  detailsBox.innerHTML = `
    <h3>${username} Detayları</h3>
    <ul>
      <li><strong>Rol:</strong> ${role}</li>
      <li><strong>Son Giriş:</strong> ${formattedDate}</li>
      <li><strong>Oturum Durumu:</strong> ${localStorage.getItem("userRole") === username ? "Aktif" : "Pasif"}</li>
    </ul>
  `;
};

function renderBagislar() {
  fetch("https://organ-sepetim-backend.onrender.com/api/bagislar")
    .then(res => res.json())
    .then(data => {
      const html = `
        <h2>Bağış Başvuruları</h2>
        <table class="stok-table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Organlar</th>
              <th>Mesaj</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                <td>${item.adSoyad}</td>
                <td>${item.telefon}</td>
                <td>${item.email}</td>
                <td>${item.organlar.join(", ")}</td>
                <td>${item.mesaj || "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;

      document.querySelector(".content").innerHTML = html;
    })
    .catch(err => {
      document.querySelector(".content").innerHTML = `<p style="color: red;">Bağış verisi alınamadı: ${err.message}</p>`;
    });
}
