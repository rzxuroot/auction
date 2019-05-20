// 画面初始化
function init() {
    // 自动登录的提示信息默认不显示，checkbox勾上后显示
    $(".msg").hide();
    $("#rememberMe").bind("click", function () {
        if ($("#rememberMe").is(":checked")) {
            showMsg(true, "公共场所不建议自动登录，以防账号丢失");
        } else {
            $(".msg").hide();
        }
    });
    // 输入框的内容在准备输入时清除，在没有内容并且失去焦点时设置为提示语
    placeholderIe8(".nickNameInput", "用户名/邮箱/手机号码");
    $(".passwordTextInput").attr("style", "color:#999999");
    $(".passwordTextInput").bind("focus", function () {
        $(".passwordInput").attr("style", "display: block;");
        $(".passwordInput").focus();
        $(".passwordInput").attr("style", "border-color:#3AA2E4;");
        $(".passwordTextInput").attr("style", "display: none;");
    });
    $(".passwordInput").bind("blur", function () {
        $(".passwordInput").attr("style", "border-color:#D0CCC7;");
        if ("" == $(".passwordInput").val()) {
            $(".passwordTextInput").attr("style", "display: block;");
            $(".passwordInput").attr("style", "display: none;");
            $(".passwordTextInput").attr("style", "color:#999999;");
        }
    });
    $(".passwordInput").bind("focus", function () {
        $(".passwordInput").attr("style", "border-color:#3AA2E4;");
        $(".passwordTextInput").attr("style", "display:none ;");
    });
}

/**
 * @methodName : placeholderIe8
 * @author : 曾雪晨
 * @desc : 隐藏和显示输入框的提示语,模拟html5的placeholder属性，请在初始化时调用
 * @for example : placeholderIe8($("#mbrMobile"), "请输入手机号码");
 * @param :
 *            _this 对应的input元素的juery形式
 * @param :
 *            msg 提示消息
 */
function placeholderIe8(_this, msg) {
    $(_this).attr("style", "color:#999999");
    // 光标进入时，如果输入框中内容是提示消息则设为空字符串，否则输入框中内容不变
    $(_this).bind("focus", function () {
        if (msg == $(_this).val()) {
            $(_this).attr("style", "color:#000000;");
            $(_this).val("");
        }
        $(_this).attr("style", "border-color:#3AA2E4;");
    });
    // 光标离开时，如果输入为空则显示提示消息，否则输入框中内容不变
    $(_this).bind("blur", function () {
        $(_this).attr("style", "border-color:#D0CCC7;");
        if ($(_this).val() == "" || $(_this).val() == null) {
            if ("" == $(_this).val()) {
                $(_this).attr("style", "color:#999999;");
                $(_this).val(msg);
            }
        }
    });
}

// 用户登录
function doLogin() {
    var nickName = $(".nickNameInput").val();
    var password = $(".passwordInput").val();

    var reg = /^\s*$/;
    if (reg.test(nickName)) {
        showMsg(false, "用户名不能为空");
        return false;
    }

    if (nickName == "" || nickName == "用户名/邮箱/手机号码") {
        showMsg(false, "用户名不能为空");
        return false;
    }

    if (password == "" || password == "密码") {
        showMsg(false, "密码不能为空");
        return false;
    }

    var obj = {
        nickName: nickName,
        password: password,
        rememberMe: $("#rememberMe").is(":checked")
    };

    doController("ecp/login.action", obj, function (_response) {
        if (_response.result) {
            // 显示用户名和登出按钮
            $("#header_nickName").show();
            $("#header_logout").show();
            $("#header_login").hide();
            if (_response.data != "") {
                if (_response.data.mbrPhoneBind == "0") {
                    ecpBase.alert("您尚未绑定手机号，为了您账户安全，建议您优先进行手机号绑定！", function () {
                        window.location.href = baseUrl + "/jsp/ecp/buyer/infomng/acntsec.jsp";
                    });
                } else {
                    if (_response.data.successUrl != "") {
                        window.location.href = _response.data.successUrl;
                    } else {
                        window.location.href = baseUrl + "/index.jsp";
                    }
                }
            } else {
                window.location.href = baseUrl + "/index.jsp";
            }
        } else {
            showMsg(false, _response.data);
        }
    });
}

// 回车登录
document.onkeydown = function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        document.getElementById("enterLogin").click();
        return false;
    }
}
function showMsg(flag, msg) {
    $(".showmsg").html(msg);
    if (flag == true) {
        $(".msg_wrap").css({
            backgroundColor: '#fff6d2',
            border: '1px solid #ffe57d',
        });
        $(".showmsg").css({
            color: '#666',
            fontSize: '12px',
            padding: '0px 0px 0px 10px'
        });
        $(".msgImg").show();
        $(".errorImg").hide();
    } else {
        $(".msg_wrap").css({
            color: '#e4393c',
            backgroundColor: '#ffebeb',
            border: '1px solid #e4393c',
        });
        $(".showmsg").css({
            color: '#e4393c',
            fontSize: '12px',
            padding: '0px 0px 0px 10px'
        });
        $(".msgImg").hide();
        $(".errorImg").show();

    }

    $(".msg").show();
}

$(function () {
    init();
    //$("input.passwordTextInput").focus();
    //$("input.nickNameInput").focus();
});
