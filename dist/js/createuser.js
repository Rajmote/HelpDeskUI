var User = {};
$(document).ready(function () {
    AssignRole();
    AssignCountry();

    $('#btncreateuser').click(function () {

        if (!valEmail($("#txtemailid").val())) {
            alert("Please enter valid email id ...");
            return;
        }

        if (!valMob($("#txtmobileno").val())) {
            alert("Please enter valid mobile no  ...");
            return;
        }

        User = {
            "UserId": 0,
            "Name": $('#txtCname').val(),
            "Mobile": $("#txtmobileno").val(),
            "EmailId": $("#txtemailid").val(),
            "Address1": $("#txtAddress1").val(),
            "Address2": $('#txtAddress2').val(),
            "Pincode": $("#txtPincode").val(),
            "CityId": $("#txtCityId").val(),
            "RoleId": $("#txtRoleId").val(),
            "StatusId": $('#txtStatusId').val(),
            "AdharId": $("#txtAdharId").val(),
            "Password": $("#txtPassword").val(),
            "Token": "0"
        };

        $.ajax({
            async: true,
            url: 'https://localhost:44379/api/User/CreateUser/',
            type: 'Post',
            dataType: 'json',
            data: JSON.stringify(User),
            contentType: "application/json",
            headers: {
                "userId": sessionStorage.getItem('userId'),
                "securityToken": sessionStorage.getItem('token')
            },
            success: function (data) {
                alert("User created successfully.");
                window.location.href = "./users.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error : Unauthorized user");
                window.location.href = "./login.html";
            }
        });
        
    });

});
