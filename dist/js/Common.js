var Apiurl = "https://localhost:44379/api/";
var rt = 0;
var dt = 0;
var ipt = 0;
var tt = 0;
var at = 0;
var iat = 0;
var pt = 0;
//var tot=0;
$("#username").text(sessionStorage.getItem('username'));
$("#company").text(" RDM Coorporation ");
$("#userid").text(sessionStorage.getItem('userId'));
$("#companyfooter").text(" RDM Coorporation ");

//Single ajax call for multiple actions.
function ajaxCall(Type, Path, Param, hdata, Script, Container, CallBack) {
    $.ajax({
        type: Type,
        url: Path,
        data: Param,
        headers: hdata,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        processdata: true,
        success: function (data) {
            if (CallBack != undefined && CallBack != '') {
                CallBack(msg, Script, Container);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
};

function AssignRole() {
    if (sessionStorage.getItem('roleid') == 1) {
        $("#roleid").text(" Admin ");
        $("#createticketmenu").hide();
    }
    else if (sessionStorage.getItem('roleid') == 2) {
        $("#roleid").text(" Business Executive ");
        $("#createticketmenu").hide();
    }
    else if (sessionStorage.getItem('roleid') == 3) {
        $("#roleid").text(" Technician ");
        $("#usermenu").hide();
    }
    else {
        $("#roleid").text(" Customer ");
        $("#usermenu").hide();
    }


}

function AssignStatus(obj) {

    for (i = 0; i < obj.length; i++) {
        if (obj[i].StatusId == 3) {
            obj[i].StatusId = "To Do";
        } else if (obj[i].StatusId == 4) {
            obj[i].StatusId = "In Progress";
        } else if (obj[i].StatusId == 5) {
            obj[i].StatusId = "Resolved";
        } else if (obj[i].StatusId == 6) {
            obj[i].StatusId = "Delivered";
        } else if (obj[i].StatusId == 2) {
            obj[i].StatusId = "Active";
        } else if (obj[i].StatusId == 1) {
            obj[i].StatusId = "InActive";
        } else if (obj[i].StatusId == 7) {
            obj[i].StatusId = "Ready To Pick Up";
        }
    }

    return obj;
}

function getAllTicketsCount() {
    $.ajax({
        async: true,
        url: 'https://localhost:44379/api/Ticket/GetTickets',
        type: 'Get',
        dataType: 'json',
        headers: {
            "userId": sessionStorage.getItem('userId'),
            "securityToken": sessionStorage.getItem('token')
        },
        success: function (obj) {

            for (i = 0; i < obj.length; i++) {
                if (obj[i].StatusId == 3) {
                    tt = tt + 1;
                } else if (obj[i].StatusId == 4) {
                    ipt = ipt + 1;
                } else if (obj[i].StatusId == 5) {
                    rt = rt + 1;
                } else if (obj[i].StatusId == 6) {
                    dt = dt + 1;
                } else if (obj[i].StatusId == 2) {
                    at = at + 1;
                } else if (obj[i].StatusId == 1) {
                    iat = iat + 1;
                } else if (obj[i].StatusId == 7) {
                    pt = pt + 1;
                }
            }

            $("#rt").text(rt);
            $("#dt").text(dt);
            $("#ipt").text(ipt);
            $("#tt").text(tt);
            $("#at").text(at);
            $("#iat").text(iat);
            $("#pt").text(pt);
            $("#tot").text(obj.length);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error : Unauthorized user");
            window.location.href = "./login.html";
        }
    });
};

function valEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true)
    } else {
        return false;
    }
}

function valMob(mob) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (mob.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

function valDate(date) {

    var tdate = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    if (date.match(tdate)) {
        return true;
    }
    else {
        return false;
    }

}

function AssignCountry() {
    var url = "https://localhost:44379/api/Address/GetCountry/";
    $.getJSON(url, function (data) {
        $.each(data, function (index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            $('#txtCountryId').append('<option value="' + value.Id + '">' + value.Name + '</option>');
        });
    });
}

$('#txtCountryId').on('change', function () {
    var country_id = $(this).val();
    var url = "https://localhost:44379/api/Address/GetState/" + country_id;
    $.getJSON(url, function (data) {
        $.each(data, function (index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            $('#txtStateId').append('<option value="' + value.Id + '">' + value.Name + '</option>');
        });
    });
});

$('#txtStateId').on('change', function () {
    var state_id = $(this).val();
    var url = "https://localhost:44379/api/Address/GetCity/" + state_id;
    $.getJSON(url, function (data) {
        $.each(data, function (index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            $('#txtCityId').append('<option value="' + value.Id + '">' + value.Name + '</option>');
        });
    });
});

function CheckStatusSelection() {
    if (sessionStorage.getItem('roleid') == 4) {
        if (($("#txtStatusId").val() != "2") && ($("#txtStatusId").val() != "7") ){
            alert("Invalid status selected. User can select only Active or Pickup.");
            return false;
        }
    }

    if (sessionStorage.getItem('roleid') == 3) {
        if (($("#txtStatusId").val() != "3") && ($("#txtStatusId").val() != "4") && ($("#txtStatusId").val() != "5")) {
            alert("Invalid status selected. Technician can select only ToDo, Inprogress or Resolved.");
            return false;
        }
    }

    return true;
};
