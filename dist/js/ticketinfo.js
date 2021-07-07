
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
        }
    });

    $('#btntickets').click(function () {
        window.location.href = "./tickets.html";
    });
});
