document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const journalEntry = document.getElementById("journalEntry");
    const journalList = document.getElementById("journalList");

    // Fungsi untuk memuat catatan dari LocalStorage
    function loadEntries() {
        journalList.innerHTML = ""; // Hapus tampilan lama
        let entries = JSON.parse(localStorage.getItem("entries")) || []; // Ambil data dari LocalStorage
        
        entries.forEach((entry, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <p>${entry.text}</p>
                    <small class="date">${entry.date}</small>
                </div>
                <button class="delete-btn" onclick="deleteEntry(${index})">Hapus</button>
            `;
            journalList.appendChild(li);
        });
    }

    // Fungsi untuk menyimpan catatan ke LocalStorage
    saveBtn.addEventListener("click", function () {
        let text = journalEntry.value.trim();
        if (text === "") return; // Jika kosong, jangan simpan
        
        let entries = JSON.parse(localStorage.getItem("entries")) || []; // Ambil data lama
        let newEntry = {
            text: text,
            date: new Date().toLocaleString("id-ID") // Tambahkan tanggal & waktu
        };

        entries.push(newEntry); // Tambahkan catatan baru
        localStorage.setItem("entries", JSON.stringify(entries)); // Simpan ke LocalStorage
        
        journalEntry.value = ""; // Kosongkan input setelah disimpan
        loadEntries(); // Tampilkan ulang daftar catatan
    });

    // Fungsi untuk menghapus catatan
    window.deleteEntry = function (index) {
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.splice(index, 1); // Hapus catatan berdasarkan indeks
        localStorage.setItem("entries", JSON.stringify(entries)); // Simpan ulang
        loadEntries(); // Tampilkan ulang daftar catatan
    };

    loadEntries(); // Panggil saat halaman pertama kali dibuka
});
