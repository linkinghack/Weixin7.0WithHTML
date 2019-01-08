
/**
 * 切换四大页面
 * displayname:  string;  - 跳转到的页面id
 */
function switchPage(displayname) {
    console.log(selected_btn);
    var elem = document.getElementById("btn_" + displayname);

    if(elem == selected_btn) return;

    elem.className += " btn-selected";
    selected_btn.className = "button";
    selected_btn = document.getElementById("btn_" + displayname);
    var pages = document.getElementsByClassName('body');
    // console.log(pages)
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].id == displayname) {
            pages[i].style.display = 'flex';
        }
        else {
            pages[i].style.display = 'none';
        }
    }

    // 处理'我' 页面头部更换样式
    var headbar = document.getElementById("header");
    if (displayname == "me") {
        headbar.style.display = "none";
    } else {
        headbar.style.display = "flex"
    }

    // 页面标题
    var namesmap = {
        "msg":"微信",
        "contact":"通讯录",
        "discovery":"发现",
        "me":"微信"
    }
    document.getElementById('header')
        .children[0].children[0].textContent = namesmap[displayname];

    // 处理未读消息数目显示
    var unread = document.getElementById("unread");
    if (displayname == "msg") {
        unread.style.display = "";
    } else {
        unread.style.display = "none";
    }
    // console.log("btn clicked " + displayname);
}

/**
 * 隐藏会话窗口
 */
function hideChat() {
    var node = document.getElementById('chat');
    node.style.right = "-100%";
}

/**
 * 显示会话窗口
 */
function showChat() {
    var node = document.getElementById('chat');
    node.style.right = "0";
}

/**
 * 适用于会话页面发送按钮的状态改变
 */
function changeSendBtnStatus() {
    sendbtn = document.getElementById('send');
    attach = document.getElementById('attach');
    textinput = document.getElementById('text-input');
    if (textinput.value.length > 0) {
        sendbtn.style.display = "";
        attach.style.display = "none";
    } else {
        sendbtn.style.display = "none";
        attach.style.display = "";
    }
}

/**
 * 模拟发送消息
 */
function sendMessage() {
    var chatbox = document.getElementById('chat-content');
    var textinput = document.getElementById('text-input');

    // 准备message slice
    var newslice = document.createElement("div");
    newslice.className = "chat-slice sender-slice";

    // 构造头像
    var avator = document.createElement("img");
    avator.setAttribute("src", "./imgs/me/avator.png");
    avator.className = "avator";

    // 构造消息div
    var message = document.createElement("div");
    message.className = "message"
    message.textContent = new String(textinput.value);
    console.log(textinput.value)
    // 组装message slice
    newslice.append(message);
    newslice.appendChild(avator);

    // 显示到mesage content
    chatbox.append(newslice);

    // 清空消息编辑框
    textinput.value = "";
}

function keyPressed(e) {
    if (e.keyCode == 13) {
        sendMessage();
        changeSendBtnStatus();
    }
}

function showTextInput() {
    // var textinput = document.getElementById('text-input');
    // var kbd = document.getElementById('kbd');
    // var voice = document.getElementById('voice');
    // var voice_btn = document.getElementById('voice-btn');

    textinput.style.display = "";
    voice.style.display = "";

    kbd.style.display = "none";
    voice_btn.style.display = "none";

    console.log("showTextInput");
}


function showVoiceBtn() {
    // var textinput = document.getElementById('text-input');
    // var kbd = document.getElementById('kbd');
    // var voice = document.getElementById('voice');
    // var voice_btn = document.getElementById('voice-btn');

    textinput.style.display = "none";
    voice.style.display = "none";

    kbd.style.display = "";
    voice_btn.style.display = "";

    console.log("showVoiceBtn");
}

// 更新通知栏和聊天窗口最新时间
function updateTime() {
    var timetags = document.getElementsByClassName("time-now");
    setInterval(()=>{
        var now = new Date();
        var shorttime = now.toLocaleTimeString().slice(2,7);
        var longtime = now.toLocaleTimeString().slice(0,7);
        timetags[0].textContent = shorttime;
        timetags[1].textContent = longtime;
    },500)
}

function changePlusToolBoxStatus() {
    var box = document.getElementById('plus-tool');
    if(box.style.display == "none"){
        box.style.display = "flex";
    }else {
        box.style.display = "none";
    }
}

// 朋友圈内容滑动


function claculateAlpha(height) {
    // if(height < 200) return 1;
    var alpha = 0.3 + ( (height - 200) / (240 - 200) ) * (1.0-0.3);
    console.log("calculated aplha: "+alpha);
    return alpha;
}

function changeMomentsFlagStatus(targetStatus) {
    var momentsflag = document.getElementById('moments-flag');
    if(targetStatus == "hide") {
        momentsflag.style.display = "none";
    }else if(targetStatus == "show"){
        momentsflag.style.display = "flex";

    }
}

function handleMomentsScroll(e) {
    var moments = e.target;
    var momtop = document.getElementsByClassName("moments-top")[0];
    if(moments.scrollTop < 190){ //头部透明并隐藏文字
        changeMomentsFlagStatus("hide");
        momtop.style.backgroundColor = "";
    }else if(moments.scrollTop > 190 && moments.scrollTop < 240){
        changeMomentsFlagStatus("show");
        var top = moments.scrollTop;
        console.log("top:"+top);
        momtop.style.backgroundColor = "rgba(247,247,247,"+ claculateAlpha(top) +")";
    }
}

/**
 * 隐藏朋友圈
 */
function hideMoments() {
    var node = document.getElementById('moments');
    node.style.right = "-100%";
}

/**
 * 显示朋友圈
 */
function showMoments() {
    var node = document.getElementById('moments');
    node.style.right = "0";
}