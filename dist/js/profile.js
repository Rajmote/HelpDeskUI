
$(document).ready(function () {
    AssignRole();

    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/User/GetUser/' +  sessionStorage.getItem('userId'),
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

    $('#btnusers').click(function () {
        window.location.href = "./users.html";
    });
});
