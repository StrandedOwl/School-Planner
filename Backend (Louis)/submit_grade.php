<?php
function dbh() {
    $servername = "localhost"; // host
    $port = "3306"; // port
    $dbname = "schoolplanner_db"; // database name
    $username = "bmit@espas-it.ch"; // username
    $password = "0C492uu!k"; // password

    try {
        $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]));
    }
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['teacher'], $data['subject'], $data['grade'], $data['student_id'])) {
    $teacher = $data['teacher'];
    $subject = $data['subject'];
    $grade = $data['grade'];
    $student_id = $data['student_id']; // assuming student_id is passed

    // Validate grade
    if (!is_numeric($grade) || $grade < 1 || $grade > 6) {
        echo json_encode(['success' => false, 'message' => 'Invalid grade']);
        exit;
    }

    try {
        $db = dbh();

        // Check if teacher exists
        $stmt_teacher = $db->prepare("SELECT teacher_id FROM teachers WHERE CONCAT(first_name, ' ', last_name) = :teacher");
        $stmt_teacher->bindParam(':teacher', $teacher);
        $stmt_teacher->execute();
        $teacher_result = $stmt_teacher->fetch(PDO::FETCH_ASSOC);
        
        if (!$teacher_result) {
            echo json_encode(['success' => false, 'message' => 'Teacher not found']);
            exit;
        }

        $teacher_id = $teacher_result['teacher_id'];

        // Check if subject exists
        $stmt_subject = $db->prepare("SELECT subject_id FROM subjects WHERE subject_name = :subject");
        $stmt_subject->bindParam(':subject', $subject);
        $stmt_subject->execute();
        $subject_result = $stmt_subject->fetch(PDO::FETCH_ASSOC);

        if (!$subject_result) {
            echo json_encode(['success' => false, 'message' => 'Subject not found']);
            exit;
        }

        $subject_id = $subject_result['subject_id'];

        // Insert grade
        $stmt = $db->prepare("INSERT INTO grades (student_id, subject_id, teacher_id, grade, received) VALUES (:student_id, :subject_id, :teacher_id, :grade, NOW())");
        $stmt->bindParam(':student_id', $student_id); 
        $stmt->bindParam(':subject_id', $subject_id);
        $stmt->bindParam(':teacher_id', $teacher_id);
        $stmt->bindParam(':grade', $grade);
        $stmt->execute();

        echo json_encode(['success' => true]);

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
