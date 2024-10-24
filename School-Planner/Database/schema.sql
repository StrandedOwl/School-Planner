-- Tabelle für Lehrer
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    vorname VARCHAR(50) NOT NULL,
    nachname VARCHAR(50) NOT NULL,
    fach_id INT NOT NULL
    -- Der Fremdschlüssel zu subjects wird später hinzugefügt
);

-- Tabelle für Klassen
CREATE TABLE classes (
    klasse_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    klassen_name VARCHAR(50) NOT NULL,
    lehrer_id INT NOT NULL,
    FOREIGN KEY (lehrer_id) REFERENCES teachers(teacher_id)
);

-- Tabelle für Schüler
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    vorname VARCHAR(50) NOT NULL,
    nachname VARCHAR(50) NOT NULL,
    geburtsdatum DATE NOT NULL,
    klasse_id INT NOT NULL,
    FOREIGN KEY (klasse_id) REFERENCES classes(klasse_id)
);

-- Tabelle für Fächer
CREATE TABLE subjects (
    fach_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fach_name VARCHAR(50) NOT NULL,
    klasse_id INT NOT NULL,
    FOREIGN KEY (klasse_id) REFERENCES classes(klasse_id)
);

-- Tabelle für Noten
CREATE TABLE grades (
    note_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    student_id INT NOT NULL,
    fach_id INT NOT NULL,
    teacher_id INT NOT NULL,
    note DECIMAL(3, 1) NOT NULL,
    datum DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (fach_id) REFERENCES subjects(fach_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);
