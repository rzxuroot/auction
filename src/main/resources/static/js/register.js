/**
 * 用户注册
 * 获取用户输入的值，进行检证，检证通过后注册
 */
function doRegister() {
    var nickName = $(".nickName").val();
    var areaCode = $("#areaCode").val();
    var mbrMobile = $("#mbrMobile").val();
    //台湾手机自动去除首位的"0"
    if (areaCode == "00886" && mbrMobile.substring(0, 1) == "0") {
        mbrMobile = mbrMobile.substring(1);
    }
    var passwd = $(".passwd").val();
    var rePasswd = $(".rePassword").val();
    var validateCode = $(".validateCode").val();
    var msgCode = $(".msgCode").val();

    // 单值检证
    if (nickName == "") {
        ecpBase.error("昵称不能为空");
        return false;
    }
    else if (isMbrMobileValid(areaCode, nickName)) {
        ecpBase.error("昵称不能为手机号")
        return false;
    }
    else if (isEmailValid(nickName)) {
        ecpBase.error("昵称不能为邮箱账号")
        return false;
    }
    else if (mbrMobile == "") {
        ecpBase.error("手机号不能为空");
        return false;
    }
    else if (passwd == "") {
        ecpBase.error("密码不能为空");
        return false;
    }
    else if (!lengBetweenValid(6, 20, passwd)) {
        ecpBase.error("请输入6到20位的密码")
        return false;
    }
    else if (rePasswd == "") {
        ecpBase.error("请再次确认密码");
        return false;
    }
    else if (validateCode == "") {
        ecpBase.error("验证码不能为空");
        return false;
    }
    else if (msgCode == "") {
        ecpBase.error("短信验证码不能为空");
        return false;
    }

    // 相关性检证
    else if (!isMbrMobileValid(areaCode, mbrMobile)) {
        ecpBase.error("请输入有效的手机号")
        return false;
    }
    else if (passwd != rePasswd) {
        ecpBase.error("两次密码不一致");
        return false;
    }

    // 变量
    var obj = {
        nickName: nickName,
        areaCode: areaCode,
        mbrMobile: mbrMobile,
        passwd: passwd,
        validateCode: validateCode,
        msgCode: msgCode,
        loginPwLevel: checkPswdStrong4code($(".passwd").val())
    };


    // 去后台进行注册,成功后直接登录系统
    doController("register.action", obj, function (_response) {
        if (_response.result) {
            ecpBase.tip("恭喜您注册成功", 1000, function () {
                doLogin(mbrMobile, passwd);
            });
        }
        else {
            ecpBase.error(_response.data);
        }
    });
}
/**
 * 根据用户名、密码登录系统
 * @param username
 * @param password
 */
function doLogin(username, password) {
    var userObj = {
        nickName: username,
        password: password
    };
    doController("ecp/login.action", userObj, function (_response) {
//        var resultData = $.fromJSON(_response.responseText);
        if (_response.result) {
            window.location.href = baseUrl + "/index.jsp";
        } else {
            showMsg(false, _response.data);
        }
    });
}

function getNick() {
    doController("common/getnickname.action",
        {"nickname": $(".nickName").val()},
        function (_response) {
            if (_response.result) {
                if ($.fromJSON(_response.data).hasNick == "true") {
                    var errMsg = $("<span class='ecpValidateErrorCls'>用户名已被占用</span>");
                    $(".nickName").after(errMsg);
                }
                else {
                    var corrMsg = $("<span class='ecpValidateCorrectCls'></span>");
                    $(".nickName").after(corrMsg);
                }
            }
        })
}

// 校验昵称
function validateNick() {
    $(".nickName").bind("blur", function () {
        if ($(".nickName").val() != null && $(".nickName").val().replace(/^\s+/g, "") != "") {
            if (isIllegal($(".nickName").val())) {
                var errMsg = $("<span class='ecpValidateErrorCls'>用户名不能包含空格和特殊字符</span>");
                $(".nickName").after(errMsg);
            }
            else if (/^\d+$/.test($(".nickName").val())) {
                var errMsg = $("<span class='ecpValidateErrorCls'>用户名不能是纯数字</span>");
                $(".nickName").after(errMsg);
            }
            else {
                getNick();
            }
        }
    })
}

function getMobile() {
    doController("common/getmobile.action",
        {"mobile": $("#mbrMobile").val()},
        function (_response) {
            if (_response.result) {
                if ($.fromJSON(_response.data).isbind == "true") {
                    var errMsg = $("<span class='ecpValidateErrorCls'>该手机已被绑定</span>");
                    $("#mbrMobile").after(errMsg);
                    unbindClick();
                    return;
                }
            }
            var corrMsg = $("<span class='ecpValidateCorrectCls'></span>");
            $("#mbrMobile").after(corrMsg);
            $("#getMsgCodeBtn").attr("class", "getMsgCodeBtn_clickable");
            $("#getMsgCodeBtn").text('获取短信验证');
            $("#getMsgCodeBtn").bind("click", function () {
//                getMsgCode(mbrMobile);
                getMsgCode($("#mbrMobile").val());
            });
        })
}

//解绑点击短信验证
function unbindClick() {
    $("#getMsgCodeBtn").unbind("click");
    $("#getMsgCodeBtn").attr("class", "getMsgCodeBtn");
}

//绑定点击短信验证
function bindClick() {
    var areaCode = $("#areaCode").val();
    var mbrMobile = $("#mbrMobile").val();
    if (mbrMobile == null || mbrMobile == '') {
        unbindClick();
        return;
    }
    //台湾手机自动去除首位的"0"
    else if (areaCode == "00886" && mbrMobile.substring(0, 1) == "0") {
        mbrMobile = mbrMobile.substring(1);
    }
    //验证手机有效则绑定
    if (isMbrMobileValid(areaCode, mbrMobile)) {
        getMobile();
    }
    else {
        var errorMsg = $("<span class='ecpValidateErrorCls'>请输入正确的手机号</span>");
        $("#mbrMobile").after(errorMsg);
        unbindClick();
    }
}

// 60秒倒计时
function countDown(timeout) {
    var time = timeout;
    if (time >= 0) {
        unbindClick();
        $("#getMsgCodeBtn").text(time + " (s)");
        time--;
    }
    else {
        bindClick();
        return;
    }
    setTimeout(function () {
        countDown(time)
    }, 1000)
}
// 设置获取短信验证码按钮
function getMsgCodeBtnInit() {
    $("#mbrMobile").bind("input propertychange", function (){
       // $("#mbrMobile").val($("#mbrMobile").val().replace(/\s/g, ""));  ie8下不支持replace
        $("#mbrMobile").val();
    });
    $("#mbrMobile").bind("blur", function () {
        bindClick();
    });
}

// 获取短信验证码
function getMsgCode(mbrMobile) {
    if (validatePicCode()) {
        doController("common/msgcode/getcode.action", {"path": "regist", "mbrMobile": mbrMobile}, function (_response) {
            if (_response.result) {
                ecpBase.tip(_response.data, 1000);
            }
        });
        countDown(60);
    }
}

//校验密码强弱
function validatePassStren() {
    $(".passwd").bind("blur", function () {
        if ($(".passwd").val() != null && $(".passwd").val().replace(/^\s+/g, "") != "" && $(".passwd").val().length >= 6) {
            var corrMsg = $("<span class='ecpValidateCorrectCls'></span>");
            $(".passwd").after(corrMsg);
            $(".pswdCheckDivCls").show();
            $(this).parent().val($(this).val());
            checkPswdStrong($(this).parent());
        }
        else if ($(".passwd").val() != null && $(".passwd").val().replace(/^\s+/g, "") != ""
            && $(".passwd").val().length > 0 && $(".passwd").val().length < 6) {
            $(".pswdCheckDivCls").hide();
            var errMsg = $("<span class='ecpValidateErrorCls'>请输入6位以上密码！</span>");
            $(".passwd").after(errMsg);
        }
    });
}

//校验密码一致性
function validatePassCon() {
    $(".rePassword").bind("blur", function () {
        if ($(".rePassword").val() != null && $(".rePassword").val().replace(/^\s+/g, "") != "") {
            if ($(".rePassword").val() != $(".passwd").val()) {
                var errMsg = $("<span class='ecpValidateErrorCls'>两次输入的密码不一致</span>");
                $(".rePassword").after(errMsg);
            }
            else {
                var corrMsg = $("<span class='ecpValidateCorrectCls'></span>");
                $(".rePassword").after(corrMsg);
            }
        }
    })
}

// 校验图形验证码
function validatePicCode() {
    var status = false;
    if ($(".validateCode").val() != null && $(".validateCode").val() != "") {
        doController("common/msgcode/getCaptcha.action",
            {"validateCode": $(".validateCode").val()},
            function (_response) {
                if (_response.result) {
                    status = true;
                }
                else {
                    ecpBase.error(_response.data);
                    status = false;
                }
            },
            false);
    }
    return status;
}

//同意并阅读协议
function checkAgreeMent() {
    var unbindButton = function () {
        $(".submitBtn").css({"cursor": "default", "opacity": "0.5"});
        $(".submitBtn").unbind("click");
    };
    var bindButton = function () {
        $(".submitBtn").css({"cursor": "pointer", "opacity": "1"});
        $(".submitBtn").bind("click", function () {
            doRegister();
        })
    };
    if (($("#agreeMent").prop("checked"))) {
        bindButton();
    }
    //火狐缓存选中状态,覆盖html设置
    else {
        unbindButton();
    }
    $("#agreeMent").bind("click", function () {
        if (($("#agreeMent").prop("checked"))) {
            bindButton();
        }
        else {
            unbindButton();
        }
    });
}

// 初始化操作
function init() {

    // 隐藏掉footer.jsp上部的线
    $(".footLine").hide();

    //绑定鼠标离开验证事件
    bindValidateEvent();

    // 设置获取短信验证码按钮
    getMsgCodeBtnInit();

    //密码强弱校验
    validatePassStren();

    //密码一致性校验
    validatePassCon();

    //校验昵称
    validateNick();

    //选中协议
    checkAgreeMent();
}

/**
 * 绑定鼠标离开验证事件
 */
function bindValidateEvent() {
    $(".container input[data-validate]").each(function (i, item) {
        var _this = this;
        $(_this).bind("blur", function () {
            var _parent = $(_this).parent().attr("id");
            var _value = $(_this).val();
            ecpValidate(_parent, false);
        });
    });
}

//注册成功
var Html = function (msg) {
    var _html = "";
    _html += '<div style="height:40px;">';

    _html += '<img src=' + baseUrl + '/common/javascript/lib/winform/image/operisok.png />';

    _html += '<span  style="font-size:18px;color:#003FE3;margin-left:20px;position:relative;top:-10px;">' + msg + '</span>';

    _html += '</div>';
    return _html;
}

// 初始化代替select的div
function slctAreaCode() {
    $(".areaCodeUl li").css("display", "block");
    $(".areaCodeUl li").unbind("click");
    $(".areaCodeUl li").bind("click", function () {
        $("#areaCodeSpan").text($(this).text());
        if ($(this).text() == "+852") {
            $("#areaCode").val("00852");
        }
        else if ($(this).text() == "+853") {
            $("#areaCode").val("00853");
        }
        else if ($(this).text() == "+886") {
            $("#areaCode").val("00886");
        }
        else {
            $("#areaCode").val("0086");
        }

        $(".areaCodeUl li").css("display", "none");
        if ($("#mbrMobile").val() != null && $("#mbrMobile").val() != "") {
            $("#mbrMobile").trigger("blur"); //触发光标事件
        }
    });

}

$(function () {
    init();
});