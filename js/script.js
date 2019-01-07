
/**
 * 切换四大页面
 * displayname:  string;  - 跳转到的页面id
 */
function switchPage(displayname) {
    console.log(selected_btn);
    var elem = document.getElementById("btn_" + displayname);

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
function hideChat(){
    var node = document.getElementById('chat');
    node.style.right = "-100%";
}

/**
 * 显示会话窗口
 */
function showChat(){
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
    if(textinput.value.length > 0){
        sendbtn.style.display = "";
        attach.style.display = "none";
    }else {
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
    avator.setAttribute("src","./imgs/me/avator.png");
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

function keyPressed(e){
    if(e.keyCode == 13){
        sendMessage();
    }
}