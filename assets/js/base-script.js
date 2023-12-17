

// * ===== define method ===== * //

function registerDragEvent() {
    const slider =  document.querySelectorAll(".scroll-x");
    for (var i = 0; i < slider.length; i++) {
        onDragItemToScroll(slider[i]);
    }
}

function onDragItemToScroll(parent) {

    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let isDown = false;

    parent.addEventListener('mousedown', (e) => {
        isDown = true;
        parent.classList.add('drag-active');
        pos = {
            left: parent.scrollLeft,
            // top: parent.scrollTop,

            // Get the current mouse position
            x: e.clientX,
            // y: e.clientY,
        };
    });

    parent.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const dx = e.clientX - pos.x;
        // const dy = e.clientY - pos.y;

        // Scroll the element
        // parent.scrollTop = pos.top - dy;
        parent.scrollLeft = (pos.left - dx) * 2; // x2 faster
    });

    parent.addEventListener('mouseup', () => {
        isDown = false;
        parent.classList.remove('drag-active');
    });

    parent.addEventListener('mouseleave', () => {
        isDown = false;
        parent.classList.remove('drag-active');
    });

}

function registerDragButtonEvent() {
    const containers =  document.querySelectorAll(".scroll-x-container");
    for (let i = 0; i < containers.length; i++) {
        onDragButtonClick(containers[i]);
    }
}

function onDragButtonClick(container) {
    const listTag = $(container).children(".scroll-x");

    $(container).children('.prev-scroll-x').click(function () {
        let currentPos = $(listTag).scrollLeft();

        if (currentPos > 200) {
            $(listTag).animate({scrollLeft:currentPos - 200},200)
        } else {
            $(listTag).scrollLeft(0);
        }

    });

    $(container).children('.next-scroll-x').click(function () {
        var currentPos = $(listTag).scrollLeft();
        $(listTag).scrollLeft(currentPos + 200);
    });

}

// * ===== Windows Method ===== * //

function openUrl(url, method = '_self') {
    window.open(url, method);
}

function  closeCurrentWindow() {
    window.close();
}

function getWidthScreen() {
    return screen.width;
}

function getHeightScreen() {
    return screen.height;
}

function  getCurrentUrl() {
    return window.location.href;
}

function getHostName() {
    return window.location.hostname;
}

function goBack() {
    history.back();
}

function goForward() {
    history.forward();
}

function openPopupWindow(url, width = 500, height = 500, popupName = "popup-window") {

    let w = screen.width / 2;
    let h = screen.height / 2;
    let left = w - (width / 2);
    let top = 250;


    //  var settings = "width=" + width + ",height=" + height + "menubar=0, toolbar=0";
    var settings = "status=no, toolbar=no, menubar=no,scrollbars=yes,resizable=yes,top=" + top + ",left=" + left + ",width=" + width + ",height=" + height;
    var windowPopup = window.open(url, popupName, settings);


    // windowPopup.moveTo(screen.width/2 - (width/2), screen.height/2 - height);

    return settings;
}

function returnDataFromPopup(data ) {
    window.opener.callback(data);
    window.close();

    // window.callback = function (result) {
    //
    // }
}

function  reloadPage() {
    location.reload();
}

function copyCurrentUrl() {
    navigator.clipboard.writeText(window.location.href)
        .then(function() {
            alert("Đường dẫn đã được lưu trong bộ nhớ tạm!");
        })
        .catch(function(error) {
            // Hiển thị thông báo lỗi
            alert("Copy đường dẫn không thành công!");
        });
}

// * ===== Notification methods ===== * //

function writeLog(message) {
    console.log(message);
}

function showAlert(content) {
    alert(content);
}

function showAlertConfirm(content = "Nội dung thông báo", onTrue = true, onFalse = false) {

    if (confirm("Press a button!")) {
        return  onTrue;
    } else {
        return  onFalse;
    }

    return data;

}

function showAlertInput(content, defaultValue = "") {
    let valueReturn = prompt(content, defaultValue);
    return valueReturn;
}

// * ===== Data methods ===== * //


function isEmpty(data) {

    if (data === null || data === undefined || data === "") {
        return true;
    }

    if (isObject(data)) {
        return data.isEmpty(data);
    }

    if (Array.isArray(data) && data.length === 0) {
        return  true;
    }

    return false;
}

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// * ===== storage methods ===== * //

function  saveLocal(key, value) {
    localStorage.setItem(key, value);
}

function getValueLocal(key) {
    return localStorage.getItem(key);
}

function removeAllLocalStorage() {
    localStorage.clear();
}

function saveSession(key, value) {
    sessionStorage.setItem(key, value);
}

function getSessionValue(key) {
    return sessionStorage.getItem(key);
}

function removeSession(key) {
    sessionStorage.removeItem(key);
}

// Data: sometimes is object or array
function jsonEndcode(data) {
    return JSON.stringify(data);
}

function jsonDecode(data) {
    return JSON.parse(data);
}

// * ===== Process Api in background ===== * //

function callApi(url) {
    return fetch(url);

    // fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then(res => res.json())
    //     .then(data => console.log(data));
    //     .catch(error => console.error(error))
    //     .finally(() => console.log('done'));
}


function callApiWithtFormInput(url, formData, token, headers = {}, method = 'POST') {
    // FormData()
    formData.append('_token', token);
    return fetch(url, {method: method, headers: headers, body: formData});
}

function callApiWithJsonInput(url, jsonData = {test: 'data'}, token, headers = {'Content-Type': 'application/json'}, method = 'GET') {
    return fetch(url, {method: method, headers: headers, body: JSON.stringify(jsonData)});

    // ('Content-Type', 'text/plain')
    // ('Content-Length', content.length.toString())
    // ('X-Custom-Header', 'ProcessThisImmediately')

}

async function  callPostWithFormData(url, formData, token, needReturn = false, $method = 'POST', headers = {'Content-Type': 'application/'}) {

    // Method post require
    formData.append('_token', token);

    const response = await fetch(url,  {
        method: $method,
        headers: {},
        body: formData
    });

    if (needReturn == true) {
        // Server have to return json
        return response.json();
    }
}

async function callApiInBackground(yourUrl) {

    let res = await fetch(yourUrl);
    let dataResponse = await res.json();
    return dataResponse;

    // async function getData() {
    //     let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    //     let data = await res.json();
    //     console.log(data);
    //  }

}

// * ===== Screen events ===== * //

function scrollToTop() {
    window.scrollTo({
        top: 20,
        left: 0,
        behavior: 'smooth'
    });
}


