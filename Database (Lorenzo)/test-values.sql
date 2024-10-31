INSERT INTO teachers (first_name, last_name, subject_id) VALUES
    ('Max', 'Musterlehrer', 2);

INSERT INTO classes (class_name, teacher_id) VALUES
    ('AF19a', 1);

INSERT INTO students (first_name, last_name, birthdate, class_id) VALUES
    ('Max', 'Musterschüler', '2003-11-03', 1);

INSERT INTO subjects (subject_name, class_id) VALUES
    ('Mathematik', 1);

INSERT INTO grades (student_id, subject_id, teacher_id, grade, received) VALUES
    (1, 1, 1, 5, '2024-10-24');
