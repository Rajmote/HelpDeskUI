$(document).ready(function () {
     AssignCountry();
     $("#btnregistration").click(function () {
         

          User = {
               "UserId": 0,
               "Name": $('#txtCname').val(),
               "Mobile": $("#txtmobileno").val(),
               "EmailId": $("#txtemailid").val(),
               "Address1": $("#txtAddress1").val(),
               "Address2": $('#txtAddress2').val(),
               "Pincode": $("#txtPincode").val(),
               "CityId": $("#txtCityId").val(),
               "RoleId": 4,
               "StatusId": 2,
               "AdharId": $("#txtAdharId").val(),
               "Password": $("#txtPassword").val(),
               "Token": "0"
          };

          $.ajax({
               async: true,
               url: 'https://localhost:44379/api/Account/CreateUser/',
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
                    window.location.href = "./login.html";
               },
               error: function (xhr, textStatus, errorThrown) {
                    alert("Error : Unauthorized user");
                    window.location.href = "./registration.html";
               }
          });

     });

     $("#btnlogin").click(function () {
          var input = new Object();
          input.roleid = parseInt($("#roles option:selected").val());
          input.username = $('#txtusername').val();
          input.password = $('#txtpassword').val();
          
          $.ajax({
               async: true,
               url: 'https://localhost:44379/api/Account/login',
               type: 'Post',
               dataType: 'json',
               data: input,
               success: function (data) {
                    //$.session.set('token',data.SecurityToken);
                    //$.session.set('userId',data.UserId); 
                    sessionStorage.setItem('token', data.Token);
                    sessionStorage.setItem('userId', data.UserId);
                    sessionStorage.setItem('username', data.Name);
                    sessionStorage.setItem('roleid', data.RoleId);
                    sessionStorage.setItem('Mobile', data.Mobile);
                    sessionStorage.setItem('EmailId', data.EmailId);
                    sessionStorage.setItem('Address1', data.Address1);
                    sessionStorage.setItem('Address2', data.Address2);
                    sessionStorage.setItem('Pincode', data.Pincode);
                    sessionStorage.setItem('CityId', data.CityId);
                    sessionStorage.setItem('StatusId', data.StatusId);
                    sessionStorage.setItem('AdharId', data.AdharId);
                    window.location.href = "./index.html";
               },
               error: function (xhr, textStatus, errorThrown) {
                    alert("Error : Invalid credentials, unable to login:");
                    window.location.href = "./login.html";
               }
          });
     });

});