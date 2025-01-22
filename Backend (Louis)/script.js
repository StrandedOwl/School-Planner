document.getElementById("add-grade").addEventListener("click", function () {
    fetch('popups/popup.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-container').innerHTML = data;

            let isNewTeacher = false;
            let isNewSubject = false;

            const teacherSelectHTML = `<select id="teacher" name="teacher">
                    <option value="Herr Meier">Herr Meier</option>
                    <option value="Frau Müller">Frau Müller</option>
                </select>`;

            const newTeacherHTML = `<input type="text" id="new-teacher" name="teacher" placeholder="Neue Lehrperson">`;

            const subjectSelectHTML = `<select id="subject" name="subject">
                    <option value="Mathematik">Mathematik</option>
                    <option value="Englisch">Englisch</option>
                    <option value="Geschichte">Geschichte</option>
                </select>`;

            const newSubjectHTML = `<input type="text" id="new-subject" name="subject" placeholder="Neues Fach">`;

            const teacherInputContainer = document.querySelector("#teacher-input-container");
            const subjectInputContainer = document.querySelector("#subject-input-container");

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
                isNewTeacher = !isNewTeacher;
                teacherInputContainer.innerHTML = isNewTeacher ? newTeacherHTML : teacherSelectHTML;
            });

            // Umschalten zwischen Dropdown und Eingabefeld für Fach
            const subjectToggleButton = document.getElementById("toggle-subject");
            subjectToggleButton.addEventListener("click", function () {
                isNewSubject = !isNewSubject;
                subjectInputContainer.innerHTML = isNewSubject ? newSubjectHTML : subjectSelectHTML;
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

document.getElementById("login-icon").addEventListener("click", function () {
    fetch('popups/login_register.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-container').innerHTML = data;
            const popup = document.getElementById("note-popup");
            popup.style.display = "flex";
            popup.classList.add("show");

            document.querySelector(".close").addEventListener("click", function () {
                popup.style.display = "none";
                popup.classList.remove("show");
            });
        });
});


// Funktion zum Schließen des Popups
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Funktion zum Anzeigen des Registrierungsformulars und Verstecken des Login-Formulars
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// Funktion zum Anzeigen des Login-Formulars und Verstecken des Registrierungsformulars
function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
    const darkModeIcon = document.getElementById("darkmode-icon");
    const body = document.body;

    // Prüfen, ob Dark Mode im localStorage gespeichert ist
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    // Event Listener für das Icon
    darkModeIcon.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        }
    });
});

document.getElementById('grade-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const teacher = document.getElementById('teacher').value || document.getElementById('new-teacher').value;
    const subject = document.getElementById('subject').value || document.getElementById('new-subject').value;
    const grade = document.getElementById('grade').value;

    fetch('submit_grade.php', {  // Make sure this is the correct path to your PHP file
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher, subject, grade }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Grade added successfully!');
        } else {
            alert('Failed to add grade: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
