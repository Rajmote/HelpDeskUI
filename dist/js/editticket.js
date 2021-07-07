
$(document).ready(function () {
    AssignRole();
   
    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/Ticket/GetTicket/' + sessionStorage.getItem('EdittickedId'),
        type: 'Get',
        dataType: 'json',
        headers: {
            "userId": sessionStorage.getItem('userId'),
            "securityToken": sessionStorage.getItem('token')
        },
        success: function (DTO_Ticket) {
            $('#txttickedId').val(DTO_Ticket.TicketId);
            $('#txtUserId').val(DTO_Ticket.UserId);
            $('#txtStatusId').val(DTO_Ticket.StatusId);
            $('#txtProductModel').val(DTO_Ticket.ProductModel);
            $("#txtProductType").val(DTO_Ticket.ProductType);
            $("#txtProductId").val(DTO_Ticket.ProductId);
            $('#txtInvoiceId').val(DTO_Ticket.InvoiceId);
            $('#txtInvDate').val(DTO_Ticket.InvDate);
            $('#chkIsWarrenty').prop('checked',DTO_Ticket.InWarranty);
            $('#txtIssue').val(DTO_Ticket.Issue);
            $('#txtComments').val(DTO_Ticket.Comments);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error : Unauthorized user");
            window.location.href = "./login.html";
        }
    });

    $('#btnupdateticket').click(function () {
        if (!CheckStatusSelection()) {
            return;
        }
        Ticket = {
            "TicketId": $('#txttickedId').val(),
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
            url: 'https://localhost:44379/api/Ticket/UpdateTicket/',
            type: 'Put',
            dataType: 'json',
            data: JSON.stringify(Ticket),
            contentType: "application/json",
            headers: {
                "userId": sessionStorage.getItem('userId'),
                "securityToken": sessionStorage.getItem('token')
            },
            success: function (data) {
                alert("Ticket Updated successfully.");
                window.location.href = "./tickets.html";
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error : Unauthorized user");
                window.location.href = "./login.html";
            }
        });
    });

});
