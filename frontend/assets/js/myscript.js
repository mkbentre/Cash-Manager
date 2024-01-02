const host = 'http://127.0.0.1:3000/v1/';
const auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzA0MTg2NTE5LCJleHAiOjE3MDQyNzI5MTl9.aN6TzUaCBeVwZi45jV17KGob57R0mVIVoYgK-ZxMLOg';

var d = new Date();
var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
console.log(today)
$.ajax({
    url: host + 'transaction/get-by-day',
    headers: {
        'authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    type: 'POST',
    dataType: 'JSON',
    data: {
        date: today
    }
}).done(function (res) {
    $('#list').html("");
    data = res.data.data;
    data.forEach(element => {
        var htmlData = "<div class='row mt-4'><div class='col-4 text1'><div>Danh Mục:</div><div>Nguồn Tiền</div><div>Số Tiền:</div><div>Người Chi:</div><div>Note:</div></div><div class='col-8 text2'><div>" + element.name + "</div><div>" + element.wallet_name + "</div><div>" + element.cash + "<span> đ</span></div><div>" + element.display_name + "</div><div>" + element.note + "</div></div></div>"
        $('#list').append(htmlData)
    });
})
$('#view').click(function () {
    var queryDate = $('#date-picker').val()
    if (queryDate == '') {
        alert('Vui lòng chọn ngày')
        return
    }
    $.ajax({
        url: host + 'transaction/get-by-day',
        headers: {
            'authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
        dataType: 'JSON',
        data: {
            date: queryDate
        }
    }).done(function (res) {
        $('#list').html("");
        data = res.data.data;
        data.forEach(element => {
            var htmlData = "<div class='row mt-4'><div class='col-4 text1'><div>Danh Mục:</div><div>Nguồn Tiền</div><div>Số Tiền:</div><div>Người Chi:</div><div>Note:</div></div><div class='col-8 text2'><div>" + element.name + "</div><div>" + element.wallet_name + "</div><div>" + element.cash + "<span> đ</span></div><div>" + element.display_name + "</div><div>" + element.note + "</div></div></div>"
            $('#list').append(htmlData)
        });
    })
})

$('#add-btn').click(function () {
    $.ajax({
        url: host + 'wallet/getall',
        headers: {
            'authorization': auth,
            'Content-Type': 'application/json'
        },
        type: 'POST',
        dataType: 'JSON',
    }).done(function (res) {
        data = res.data.data
        data.forEach(element => {
            var htmlData = "<option value=" + element.id + ">" + element.wallet_name + "</option>";
            $('#wallet').append(htmlData);
        });
    });
    setTimeout(() => {
        $.ajax({
            url: host + 'cataloge/getall',
            headers: {
                'authorization': auth,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            dataType: 'JSON',
        }).done(function (res) {
            data = res.data.cataloge
            data.forEach(element => {
                var htmlData = "<option value=" + element.id + ">" + element.name + "</option>";
                $('#cataloge').append(htmlData);
            });
        });
    }, 500)
    document.getElementById('cre-date').valueAsDate = new Date();
});

$('#save-transaction').click(function () {
    var data = {}
    data.wallet_id = $('#wallet').val();
    data.cataloge_id = $('#cataloge').val();
    data.cash = $('#cash').val();
    data.date = $('#cre-date').val();
    data.note = $('#note').val();
    if (data.wallet == '' || data.cataloge == '' || data.cash == '' || data.date == '') {
        alert('Thiếu thông tin')
    } else {
        $.ajax({
            url: host + 'transaction/create',
            headers: {
                'authorization': auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'POST',
            dataType: 'JSON',
            data: data
        }).done(function(res) {
            if(res.data.code == '00') {
                alert('Thành công');
                $('#exampleModal').modal('hide');
            }
        })
    }
})
