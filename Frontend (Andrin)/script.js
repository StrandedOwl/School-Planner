// Event-Listener für den "Neue Note" Button
document.getElementById("add-grade").addEventListener("click", function () {
    // Popup-HTML laden
    fetch('popup.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-container').innerHTML = data;

            // Popup anzeigen
            document.getElementById("note-popup").style.display = "block";

            // Event-Listener für das Schließen des Popups
            document.querySelector(".close").addEventListener("click", function () {
                document.getElementById("note-popup").style.display = "none";
            });

            // Klick außerhalb des Popups schließt es
            window.addEventListener("click", function (event) {
                if (event.target == document.getElementById("note-popup")) {
                    document.getElementById("note-popup").style.display = "none";
                }
            });
        });
});

// Toggle-Modus für Hell-/Dunkelmodus
document.getElementById("toggle-mode").addEventListener("click", function () {
    const body = document.body;
    const button = document.getElementById("toggle-mode");

    // Wechsel zwischen 'dark-mode' und 'light-mode'
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        button.textContent = "Wechsel zu Dunkelmodus";
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        button.textContent = "Wechsel zu Hellmodus";
    }
});
