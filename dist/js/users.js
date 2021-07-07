var table;

$(document).ready(function () {
    AssignRole();
    getAllUsers(); 
        $('#example tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
});

function getAllUsers() {
    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/User/GetUsers',
        type: 'Get',
        dataType: 'json',
        headers: {
            "userId": sessionStorage.getItem('userId'),
            "securityToken": sessionStorage.getItem('token')
        },
        success: function (data) {
            AssignStatus(data);
            table = $('#example').DataTable({
                "processing": true,
                "data": data,
                "columns": [
                    { "data": "UserId" },
                    { "data": "Name" },
                    { "data": "Mobile" },
                    { "data": "EmailId" },
                    { "data": "RoleId" },
                    { "data": "StatusId" },
                    { "data": "AdharId" }
                ]
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error : Unauthorized user");
            window.location.href = "./login.html";
        }
    });
};


$('#btnedituser').click(function () {
    var record = table.row('.selected').data();
    sessionStorage.setItem('EditUserId', record.UserId);
    window.location.href = "./edituser.html";
});

$('#btndisplayuserinfo').click(function () {
    var record = table.row('.selected').data();
    sessionStorage.setItem('EditUserId', record.UserId);
    window.location.href = "./userinfo.html";
});

$('#btncreateticketforuser').click(function () {
    var record = table.row('.selected').data();
    sessionStorage.setItem('EditUserId', record.UserId);
    window.location.href = "./createticket.html";
});

