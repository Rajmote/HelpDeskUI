
$(document).ready(function () {
    AssignRole();

    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/User/GetUser/' + sessionStorage.getItem('EditUserId'),
        type: 'Get',
        dataType: 'json',
        headers: {
            "userId": sessionStorage.getItem('userId'),
            "securityToken": sessionStorage.getItem('token')
        },
        success: function (data) {
            $('#txtUserId').val(data.UserId);
            $('#txtCname').val(data.Name);
            $('#txtemailid').val(data.EmailId);
            $('#txtmobileno').val(data.Mobile);
            $("#txtStatusId").val(data.StatusId);
            $("#txtRoleId").val(data.RoleId);
            $('#txtAdharId').val(data.AdharId);
            $('#txtAddress1').val(data.Address1);
            $('#txtAddress2').val(data.Address2);
            $('#txtPincode').val(data.Pincode);
            $('#txtCityId').val(data.CityId);
            $("#txtStateId").val(data.StateId);
            $("#txtCountryId").val(data.CountryId);
            AssignCountry();
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error : Unauthorized user");
            window.location.href = "./login.html";
        }
    });


    $('#btnupdateuser').click(function () { 

        if (!valEmail($("#txtemailid").val())) {
            alert("Please enter valid email id ...");
            return;
        }

        if (!valMob($("#txtmobileno").val())) {
            alert("Please enter valid mobile no  ...");
            return;
        }

        User = {
            "UserId": $('#txtUserId').val(),
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
            // "Password": $("#txtPassword").val(),
            "Token": "0"
        };

        $.ajax({
            async: true,
            url: 'https://localhost:44379/api/User/UpdateUser/',
            type: 'Put',
            dataType: 'json',
            data: JSON.stringify(User),
            contentType: "application/json",
            headers: {
                "userId": sessionStorage.getItem('userId'),
                "securityToken": sessionStorage.getItem('token')
            },
            success: function (data) {
                alert("User Updated successfully.");
                window.location.href = "./users.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error : Unauthorized user");
                window.location.href = "./login.html";
            }
        });
    });

});
