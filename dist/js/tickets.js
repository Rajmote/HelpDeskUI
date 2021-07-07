var table;

$(document).ready(function () {
    AssignRole();
    getAllTickets(); 
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

function getAllTickets() {
    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/Ticket/GetTickets',
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
                    { "data": "TicketId" },
                    { "data": "UserId" },
                    { "data": "ProductType" },
                    { "data": "ProductModel" },
                    { "data": "ProductId" },
                    { "data": "InvoiceId" },
                    { "data": "InvDate" },
                    { "data": "InWarranty" },
                    { "data": "InvoiceId" },
                    { "data": "Comments" },
                    { "data": "StatusId" }
                ]
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error : Unauthorized user");
            window.location.href = "./login.html";
        }
    });
};


$('#btnedit').click(function () {
    var record = table.row('.selected').data();
    sessionStorage.setItem('EdittickedId', record.TicketId);
    window.location.href = "./editticket.html";
});

$('#btndisplayticketinfo').click(function () {
    var record = table.row('.selected').data();
    sessionStorage.setItem('EdittickedId', record.TicketId);
    window.location.href = "./ticketinfo.html";
});


