<?php
// Kết nối MySQL
$conn = new mysqli("localhost", "root", "", "sql_lab");

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Nhận tham số GET
$id = $_GET['id'] ?? '';

// Truy vấn không an toàn (vulnerable to SQLi)
$sql = "SELECT * FROM users WHERE id = '$id'";
$result = $conn->query($sql);

echo "<h3>Query chạy: $sql</h3>";

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<pre>";
        print_r($row);
        echo "</pre>";
    }
} else {
    echo "Không có kết quả.";
}

$conn->close();
?>