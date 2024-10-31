document.getElementById("add-grade").addEventListener("click", function () {
    // Popup-HTML laden
    fetch('Frontend/popups/popup.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-container').innerHTML = data;

            // Popup anzeigen
            const popup = document.getElementById("note-popup");
            popup.style.display = "flex";
            popup.classList.add("show");

            // Event-Listener für das Schließen des Popups
            document.querySelector(".close").addEventListener("click", function () {
                popup.classList.remove("show");
                setTimeout(() => popup.style.display = "none", 300);
            });

            // Klick außerhalb des Popups schließt es
            window.addEventListener("click", function (event) {
                if (event.target == popup) {
                    popup.classList.remove("show");
                    setTimeout(() => popup.style.display = "none", 300);
                }
            });

            // Event-Listener für das Hinzufügen der Note zur Tabelle
            document.getElementById('grade-form').addEventListener('submit', function(event) {
                event.preventDefault(); // Verhindert das Neuladen der Seite

                // Eingaben aus dem Formular abrufen
                const teacher = document.getElementById('teacher').value;
                const subject = document.getElementById('subject').value;
                const grade = document.getElementById('grade').value;

                // Neue Zeile zur Tabelle hinzufügen
                const tableBody = document.querySelector('table tbody');
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${subject}</td>
                    <td>${grade}</td>
                    <td>${teacher}</td>
                `;
                tableBody.appendChild(newRow);

                // Popup schließen
                popup.classList.remove("show");
                setTimeout(() => popup.style.display = "none", 300);

                // Formular zurücksetzen
                event.target.reset();
            });
        });
});
