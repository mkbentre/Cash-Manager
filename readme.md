Error code:
00 Success
50 Error exception
40 Input invalid
43 Access Deny
30 You have reached your limit

API money tracker
Thành Phần API
Lấy token
    POST/get-token (gửi username & pass qua body form-data)

sau khi lấy token thì đính kèm vào headers
authorization : token

Tạo Ví (yêu cầu authorization qua header) method POST
url:    v1/wallet/create
yêu cầu body
    wallet_name Tối thiểu 3 ký tự
    currency - VND hoặc USD