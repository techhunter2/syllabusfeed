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
    var uNameVar = $("#uname").val();
    if (uNameVar === "") {
        $("#pstatus").text("Name is Required Value");
        $("#dstatus").css('visibility', 'visible');
        $("#uname").focus();
        return "";
    }

    var uMobileVar = $("#umobile").val();
    if (uMobileVar === "") {
        $("#pstatus").text("Mobile is Required Value");
        $("#dstatus").css('visibility', 'visible');
        $("#mobile").focus();
        return "";
    }
    var uPassVar = $("#upass").val();
    if (uPassVar === "") {
        $("#pstatus").text("Password is Required Value");
        $("#dstatus").css('visibility', 'visible');
        $("#upass").focus();
        return "";
    }
    var uRePassVar = $("#urepass").val();
    if (uRePassVar !== uPassVar) {
        $("#pstatus").text("Password not matched!!");
        $("#dstatus").css('visibility', 'visible');
        $("#urepass").focus();
        return "";
    }
    var jsonStrObj = {
        uName: uNameVar,
        uMobile: uMobileVar,
        uPass: uPassVar
    };
    return JSON.stringify(jsonStrObj);
}

function saveUser() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token, jsonStr, "3rdStudent2k22", "user");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
   $("#pstatus").text("Register Successfully!!");
        $("#dstatus").css('visibility', 'visible');
    window.location.replace("register.html");
    return;
}
