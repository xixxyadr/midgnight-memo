document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const journalEntry = document.getElementById("journalEntry");
    const journalList = document.getElementById("journalList");

   
    function loadEntries() {
        journalList.innerHTML = "";
        let entries = JSON.parse(localStorage.getItem("entries")) || []; 
        
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


    saveBtn.addEventListener("click", function () {
        let text = journalEntry.value.trim();
        if (text === "") return;
        
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        let newEntry = {
            text: text,
            date: new Date().toLocaleString("id-ID")
        };

        entries.push(newEntry); 
        localStorage.setItem("entries", JSON.stringify(entries)); 
        
        journalEntry.value = ""; 
        loadEntries();
    });

    
    window.deleteEntry = function (index) {
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.splice(index, 1); 
        localStorage.setItem("entries", JSON.stringify(entries));
        loadEntries();
    };

    loadEntries(); 
});
