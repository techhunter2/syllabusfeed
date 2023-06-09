var token ="90939081|-31949317402052769|90951392"
function checkLogin() {
    var isLogin = isJpdbSessionTokenExists(token, "3rdStudent2k22", "user");
    if (isLogin === 200) {
        window.location.replace("dashboard.html");
    } else {
        return;
    }
}
function validateAndGetFormData() {
    var uMnoVar = $("#mno").val();
    if (uMnoVar === "") {
         $("#pstatus").text("Mobile Number is Required.");
        $("#dstatus").css('visibility', 'visible');
        $("#email").focus();
        return "";
    }
    var uPassVar = $("#password").val();
    if (uPassVar === "") {
        $("#pstatus").text("Password is Required Value");
        $("#dstatus").css('visibility', 'visible');
        $("#password").focus();
        return "";
    }
    var jsonStrObj = {
        uMobile: uMnoVar,
        uPass: uPassVar
    };
    return JSON.stringify(jsonStrObj);
}
function logIn() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var getReqStr = createGET_BY_KEYRequest(token
            , "3rdStudent2k22", "user", jsonStr);
//            alert(getReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
//   alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 200) {
        var mno = $("#mno").val();
        jQuery.ajaxSetup({async: false});
        var x = createJpdbSessionToken(token, 1, "3rdStudent2k22", "user", mno);
        jQuery.ajaxSetup({async: true});
        var temp = JSON.parse(resultObj.data);
        var rec_no = temp.rec_no;
//        alert(rec_no);
        localStorage.setItem("rec_no", rec_no);
        window.location.replace("dashboard.html");
        return;
    } else if (resultObj.status === 400) {
         $("#pstatus").text("Invalid mobile or university roll number or either you allready submitted this form!!");
        $("#dstatus").css('visibility', 'visible');
        return;
    } else {
       $("#pstatus").text("error!!!");
        $("#dstatus").css('visibility', 'visible');
        return;
    }
}