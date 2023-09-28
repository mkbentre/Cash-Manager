<h2>Error code:</h2>
<table>
    <tr>
        <th>Code</th>
        <th>Details</th>
    </tr>
    <tr>
        <td>50</td>
        <td>Error exception</td>
    </tr>
    <tr>
        <td>40</td>
        <td>Input invalid</td>
    </tr>
    <tr>
        <td>43</td>
        <td>Access Deny</td>
    </tr>
    <tr>
        <td>30</td>
        <td>You have reached your limit</td>
    </tr>
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