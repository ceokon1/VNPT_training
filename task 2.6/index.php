<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "rce_via_mysql";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$default_name = "";
if (isset($_POST['player_name'])) {
    $default_name = $_POST['player_name'];
    $name = $_POST['player_name'];
    $query = "SELECT * FROM players WHERE name LIKE '%'+$name+'%'";

    echo "<h3>Câu lệnh SQL đã thực thi:</h3>";
    echo "<textarea readonly rows='4' cols='100'>" . htmlspecialchars($query) . "</textarea><br><br>";

    try {
        $result = $conn->query($query);
        if ($result instanceof mysqli_result && $result->num_rows > 0) {
            echo "<table border='1' cellpadding='5' cellspacing='0'><tr>";
            while ($field = $result->fetch_field()) {
                echo "<th>" . htmlspecialchars($field->name) . "</th>";
            }
            echo "</tr>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                foreach ($row as $val) {
                    echo "<td>" . htmlspecialchars($val) . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p style='color:orange;'>Không tìm thấy kết quả.</p>";
        }
    } catch (mysqli_sql_exception $e) {
        echo "<p style='color:red;'>Lỗi SQL: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}
?>

<h2>Tìm kiếm cầu thủ theo tên (vulnerable demo)</h2>
<form method="post">
    <label>Nhập tên (hoặc payload SQLi):</label><br>
    <input type="text" name="player_name" value="<?= htmlspecialchars($default_name) ?>" size="80">
    <input type="submit" value="Tìm kiếm">
</form>
