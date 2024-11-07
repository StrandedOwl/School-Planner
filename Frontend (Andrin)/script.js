document.getElementById("add-grade").addEventListener("click", function () {
    fetch('popups/popup.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-container').innerHTML = data;

            const popup = document.getElementById("note-popup");
            popup.style.display = "flex";
            popup.classList.add("show");

            document.querySelector(".close").addEventListener("click", function () {
                popup.classList.remove("show");
                setTimeout(() => popup.style.display = "none", 300);
            });

            window.addEventListener("click", function (event) {
                if (event.target == popup) {
                    popup.classList.remove("show");
                    setTimeout(() => popup.style.display = "none", 300);
                }
            });
            document.getElementById("popup-container").addEventListener("click", function (event) {
                if (event.target.id === "add-new-teacher") {
                    document.getElementById("teacher").style.display = "none";
                    document.getElementById("new-teacher").style.display = "block";
                    document.getElementById("add-new-teacher").style.display = "none";
                    document.getElementById("choose-existing-teacher").style.display = "inline";
                }

                if (event.target.id === "choose-existing-teacher") {
                    document.getElementById("new-teacher").style.display = "none";
                    document.getElementById("teacher").style.display = "block";
                    document.getElementById("add-new-teacher").style.display = "inline";
                    document.getElementById("choose-existing-teacher").style.display = "none";
                }
            });

            document.getElementById('grade-form').addEventListener('submit', function (event) {
                event.preventDefault(); // Verhindert das Neuladen der Seite

                const teacher = document.getElementById('teacher').value;
                const subject = document.getElementById('subject').value;
                const grade = document.getElementById('grade').value;

                const tableBody = document.querySelector('table tbody');
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${subject}</td>
                    <td>${grade}</td>
                    <td>${teacher}</td>
                `;
                tableBody.appendChild(newRow);

                popup.classList.remove("show");
                setTimeout(() => popup.style.display = "none", 300);

                event.target.reset();
            });
        });
});
