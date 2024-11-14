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

            // Umschalten zwischen Dropdown und Eingabefeld für Lehrer
            const teacherToggleButton = document.getElementById("toggle-teacher");
            teacherToggleButton.addEventListener("click", function () {
                const teacherSelect = document.getElementById("teacher");
                const newTeacherInput = document.getElementById("new-teacher");
                
                if (teacherSelect.style.display !== "none") {
                    teacherSelect.style.display = "none";
                    newTeacherInput.style.display = "block";
                    teacherToggleButton.textContent = "-";
                    teacherToggleButton.classList.add("active"); // Klasse hinzufügen
                } else {
                    teacherSelect.style.display = "block";
                    newTeacherInput.style.display = "none";
                    teacherToggleButton.textContent = "+";
                    teacherToggleButton.classList.remove("active"); // Klasse entfernen
                }
            });

            // Umschalten zwischen Dropdown und Eingabefeld für Fach
            const subjectToggleButton = document.getElementById("toggle-subject");
            subjectToggleButton.addEventListener("click", function () {
                const subjectSelect = document.getElementById("subject");
                const newSubjectInput = document.getElementById("new-subject");

                if (subjectSelect.style.display !== "none") {
                    subjectSelect.style.display = "none";
                    newSubjectInput.style.display = "block";
                    subjectToggleButton.textContent = "-";
                    subjectToggleButton.classList.add("active"); // Klasse hinzufügen
                } else {
                    subjectSelect.style.display = "block";
                    newSubjectInput.style.display = "none";
                    subjectToggleButton.textContent = "+";
                    subjectToggleButton.classList.remove("active"); // Klasse entfernen
                }
            });

            document.getElementById('grade-form').addEventListener('submit', function (event) {
                event.preventDefault();

                const teacher = document.getElementById('teacher').value || document.getElementById('new-teacher').value;
                const subject = document.getElementById('subject').value || document.getElementById('new-subject').value;
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
