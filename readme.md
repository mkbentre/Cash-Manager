<h2>API money tracker</h2>
<h4>Error code:</h4>
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

<h4>Lấy token</h4>
<div>localhost:3000/v1/get-token (gửi username & pass qua body form-data)</div>
<div>sau khi lấy token thì đính kèm vào headers</div>
<div>authorization : token</div>

<h4>Tạo Ví</h4>
<table>
    <tr>
        <th>URL</th>
        <th>Method</th>
        <th>Yêu cầu</th>
    </tr>
    <tr>
        <td>localhost:3000/v1/wallet/create</td>
        <td>POST</td>
        <td>wallet_name<br>currency</td>
    </tr>
</table>
<div>wallet_name: Tối thiếu 3 ký tự</div>
<div>currency: VND hoặc USD</div>
