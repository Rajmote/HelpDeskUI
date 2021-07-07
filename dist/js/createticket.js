var Ticket = {};
$(document).ready(function () {
    AssignRole();

    if (sessionStorage.getItem('roleid') == 4) {
        $('#txtUserId').val(sessionStorage.getItem('userId'));
    } else {
        $('#txtUserId').val(sessionStorage.getItem('EditUserId'));
    }


    $('#btncreateticket').click(function () {

        if (!CheckStatusSelection()) {
            return;
        }

        Ticket = {
            "TicketId": 0,
            "UserId": $('#txtUserId').val(),
            "StatusId": $("#txtStatusId").val(),
            "ProductModel": $("#txtProductModel").val(),
            "ProductType": $('#txtProductType').val(),
            "ProductId": $("#txtProductId").val(),
            "InvoiceId": $("#txtInvoiceId").val(),
            "InvDate": $("#txtInvDate").val(),
            "InWarranty": $('#chkIsWarrenty').val(),
            "Issue": $("#txtIssue").val(),
            "Comments": $("#txtComments").val()
        };

        $.ajax({
            async: true,
            url: 'https://localhost:44379/api/Ticket/CreateTicket/',
            type: 'Post',
            dataType: 'json',
            data: JSON.stringify(Ticket),
            contentType: "application/json",
            headers: {
                "userId": sessionStorage.getItem('userId'),
                "securityToken": sessionStorage.getItem('token')
            },
            success: function (data) {
                alert("Ticket created successfully.");
                window.location.href = "./tickets.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error : Unauthorized user");
                window.location.href = "./login.html";
            }
        });
    });

});
