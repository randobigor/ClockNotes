var contentType;
var contentValue;
var contentTime;
var contentArray = [];
var eventArray = [];
var tempArray = [];
var evID = 0;
var prevMn = 0;
var tempList = "";
var Music = /** @class */ (function () {
    function Music() {
        this.audio = new Audio();
    }
    Music.prototype.playMusic = function () {
        this.audio.src = "../assets/audio/acdc.mp3";
        this.audio.load();
        this.audio.play();
    };
    Music.prototype.pauseMusic = function () {
        this.audio.pause();
    };
    return Music;
}());
var NowTime = /** @class */ (function () {
    function NowTime(day, month, year, hour, minute) {
        this.global = new Date();
        this.day = this.global.getDate();
        this.month = this.global.getMonth();
        this.year = this.global.getFullYear();
        this.hour = this.global.getHours();
        this.minute = this.global.getMinutes();
    }
    NowTime.prototype.getMonth = function () {
        var stringMonth = "empty";
        switch (this.month) {
            case 0:
                return "января";
            case 1:
                return "февраля";
            case 2:
                return "марта";
            case 3:
                return "апреля";
            case 4:
                return "мая";
            case 5:
                return "июня";
            case 6:
                return "июля";
            case 7:
                return "августа";
            case 8:
                return "сентября";
            case 9:
                return "октября";
            case 10:
                return "ноября";
            case 11:
                return "декабря";
        }
    };
    NowTime.prototype.getHour = function () {
        var str = this.hour < 10 ? "0" + this.hour : this.hour;
        return str;
    };
    NowTime.prototype.getMinute = function () {
        var str = this.minute < 10 ? "0" + this.minute : this.minute;
        return str;
    };
    NowTime.prototype.getNow = function () {
        var str = " | " + this.day + "-го " + this.getMonth() + ", " + this.year + " | " + this.getHour() + ":" + this.getMinute();
        return str;
    };
    return NowTime;
}());
var msc = new Music();
document.addEventListener('DOMContentLoaded', function () {
    reloadEvents();
    ///////Synchronization for Events
    function reloadEvents() {
        tempList = "";
        eventArray.splice(0, eventArray.length);
        if (window.localStorage != null) {
            js = window.localStorage.getItem('ClockNotesEvents');
            var pjs = JSON.parse(js);
            if (pjs != null) {
                var tmpID;
                var tmpTime;
                var tmpText;
                for (var i = 0; i < pjs.length; i++) {
                    if (pjs[i] != null)
                        tmpID = pjs[i]['id'];
                    if (pjs[i] != null)
                        tmpTime = pjs[i]['evTime'];
                    if (pjs[i] != null)
                        tmpText = pjs[i]['evText'];
                    fillEvents(tmpID, tmpTime, tmpText);
                }
                evID = tmpID;
            }
        }
        var ejs = window.localStorage.getItem('ClockNotesEvents');
        var epjs = JSON.parse(js);
        if (epjs != null)
            eventArray = epjs;
    }
    //Synchronization for Notes
    if (window.localStorage != null) {
        js = window.localStorage.getItem('ClockNotesKey');
        var pjs = JSON.parse(js);
        if (pjs != null) {
            for (var i = 0; i < pjs.length; i++) {
                if (pjs[i] != null)
                    contentType = pjs[i]['contentType'];
                if (pjs[i] != null)
                    contentValue = pjs[i]['contentValue'];
                if (pjs[i] != null)
                    contentTime = pjs[i]['contentTime'];
                newCard();
            }
        }
    }
    var js = window.localStorage.getItem('ClockNotesKey');
    var pjs = JSON.parse(js);
    if (pjs != null)
        contentArray = pjs;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var timerId = setInterval(function () {
        var time = new Date();
        var hr = time.getHours();
        var mn = time.getMinutes();
        var sc = time.getSeconds();
        if (prevMn != mn) {
            prevMn = mn;
            Validation(hr, mn);
        }
        draw(hr, mn, sc);
    }, 1000);
    /////////////////////////
    function draw(hr, mn, sc) {
        ctx.clearRect(0, 0, 300, 300);
        var x = 150;
        var y = 150;
        var r = 145;
        var start = -90 * Math.PI / 180;
        //Getting time 
        var am = (mn / 60) * Math.PI * 2 + start;
        var ah = ((hr % 12) / 12) * Math.PI * 2 + start;
        var as = (sc / 60) * Math.PI * 2 + start;
        //hr % 12 / 12  - time
        ctx.lineWidth = 8; //Толщина линии
        ctx.lineCap = 'round'; // Стиль линии(с закругленными краями)
        //Drawing seconds arc
        ctx.beginPath();
        ctx.strokeStyle = "#00bfa5"; // cyan
        ctx.arc(x, y, r, start, as);
        ctx.stroke();
        ctx.closePath();
        //Drawing minute arc
        ctx.beginPath();
        ctx.strokeStyle = "#ffe938"; // yellow
        ctx.arc(x, y, 130, start, am);
        ctx.stroke();
        ctx.closePath();
        //drawing hour arc
        ctx.beginPath();
        ctx.strokeStyle = "#ff2d6f"; // pink
        ctx.arc(x, y, 115, start, ah);
        ctx.stroke();
        ctx.closePath();
        //Writing hours
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ff2d6f";
        ctx.fillText(hr < 10 ? "0" + hr : hr, x - 50, y);
        //":"
        ctx.fillStyle = "#fff";
        ctx.fillText(':', x - 25, y);
        //Writing minutes
        ctx.fillStyle = "#ffe938";
        ctx.fillText(mn < 10 ? "0" + mn : mn, x - 15, y);
        //":"
        ctx.fillStyle = "#fff";
        ctx.fillText(':', x + 10, y);
        //Writing seconds
        ctx.fillStyle = "#00bfa5";
        ctx.fillText(sc < 10 ? "0" + sc : sc, x + 20, y);
    }
    document.querySelector('#add_Event').addEventListener('click', function () {
        var d = document.querySelector('.modalHelper');
        d.innerHTML = "\n      <div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalCenterTitle\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430</h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">"
            +
                //Buttons for Dropdowns (image, video, text)
                "\n            <p>\n              <a class=\"btn btn-primary\" id=\"btn_image\" data-toggle=\"collapse\" href=\"#import_image\" aria-expanded=\"true\" aria-controls=\"import_image\">\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</a>\n              <a class=\"btn btn-primary\"  id=\"btn_video\" data-toggle=\"collapse\" href=\"#import_video\" aria-expanded=\"true\" aria-controls=\"import_video\">\u0412\u0438\u0434\u0435\u043E</a>\n              <a class=\"btn btn-primary\" id=\"btn_text\" data-toggle=\"collapse\" href=\"#import_text\" aria-expanded=\"true\" aria-controls=\"import_text\">\u0422\u0435\u043A\u0441\u0442</a>\n            </p>\n            "
            //Dropdown for image
            +
                " \n            <div class=\"collapse\" id=\"import_image\">\n              <div class=\"card card-body\">\n                <div class=\"input-group mb-3\">\n                  <div class=\"custom-file\">\n                    <input type=\"file\" class=\"custom-file-input\" id=\"inputGroupFile02\">\n                    <label class=\"custom-file-label\" for=\"inputGroupFile02\" aria-describedby=\"inputGroupFileAddon02\">Choose file</label>\n                  </div>\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\" id=\"inputGroupFileAddon02\">Upload</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            " +
            //Dropdown for video
            "\n            <div class=\"collapse video_collapse\" id=\"import_video\">\n              <div class=\"card card-body\">\n                <div class=\"input-group mb-3\">\n                  <input type=\"text\" class=\"form-control\" id=\"linkform\" placeholder=\"\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0432\u0438\u0434\u0435\u043E\" aria-label=\"Video Link\" aria-describedby=\"button-addon2\">  \n                </div>\n              </div>\n            </div>\n            "
            +
                //Dropdown for text
                "\n            <div class=\"collapse\" id=\"import_text\">\n              <div class=\"card card-body\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442</span>\n                  </div>\n                  <textarea class=\"form-control\" id=\"textForm\" aria-label=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\"></textarea>\n                </div>\n              </div>\n            </div>  \n            "
            +
                //Footer
                "\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n              <button type=\"button\" id=\"accept_button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
        //Functions for closing collapse
        $('#import_image').on('show.bs.collapse', function () {
            $('#import_video')['collapse']('hide');
            $('#import_text')['collapse']('hide');
        });
        $('#import_video').on('show.bs.collapse', function () {
            $('#import_image')['collapse']('hide');
            $('#import_text')['collapse']('hide');
        });
        $('#import_text').on('show.bs.collapse', function () {
            $('#import_video')['collapse']('hide');
            $('#import_image')['collapse']('hide');
        });
        //Eveniments
        d.querySelector('#exampleModalCenter #btn_image').addEventListener('click', function () {
            d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function () {
                contentType = "image";
                contentValue = d.querySelector('#exampleModalCenter #inputGroupFile02')['value'];
                contentValue = contentValue.slice(12);
                var times = new NowTime();
                contentTime = times.getNow();
                contentArray.push({ contentType: contentType, contentValue: contentValue, contentTime: contentTime });
                window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
                newCard();
            });
        });
        d.querySelector('#exampleModalCenter #btn_video').addEventListener('click', function () {
            d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function () {
                contentType = "video";
                contentValue = d.querySelector('#exampleModalCenter #linkform')['value'];
                // contentValue = "video.mp4;
                var times = new NowTime();
                contentTime = times.getNow();
                contentArray.push({ contentType: contentType, contentValue: contentValue, contentTime: contentTime });
                window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
                newCard();
            });
        });
        d.querySelector('#exampleModalCenter #btn_text').addEventListener('click', function () {
            d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function () {
                contentType = "text";
                contentValue = d.querySelector('#exampleModalCenter #textForm')['value'];
                var times = new NowTime();
                contentTime = times.getNow();
                contentArray.push({ contentType: contentType, contentValue: contentValue, contentTime: contentTime });
                window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
                newCard();
            });
        });
    });
    //Clear Synchronization content
    document.querySelector('#clearSyn').addEventListener('click', function () {
        if (confirm("Это приведет к потере всех ваших заметок, вы уверены?")) {
            window.localStorage.clear();
        }
    });
    //Alert Event
    document.querySelector("#setEvent").addEventListener('click', function () {
        reloadEvents();
        if (tempList == "") {
            tempList = "Тут пока пусто(";
        }
        var d = document.querySelector('.modalHelper');
        d.innerHTML = "\n      <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" id=\"alertModal\">\n        <div class=\"modal-dialog\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435</h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\" style=\"text-align:center\"> \n              <p>\n                <a class=\"btn btn-primary\" id=\"btn_image\" data-toggle=\"collapse\" href=\"#setNote\" aria-expanded=\"true\" aria-controls=\"setNote\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</a>\n                <a class=\"btn btn-primary\"  id=\"btn_video\" data-toggle=\"collapse\" href=\"#Notes\" aria-expanded=\"true\" aria-controls=\"Notes\">\u041C\u043E\u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u044F</a>\n              </p>\n              "
            //setNote
            +
                " \n            <div class=\"collapse\" id=\"setNote\">\n              <div class=\"card card-body\">\n                <form style=\"text-align:center;\">\n                  <input type=\"datetime-local\" name=\"bdaytime\" id=\"evTime\">\n                </form>\n                <hr>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442</span>\n                  </div>\n                  <textarea class=\"form-control\" id=\"kText\" aria-label=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\"></textarea>\n                </div>\n              </div>\n            </div>\n            " +
            //Notes
            "\n            <div class=\"collapse\" id=\"Notes\">\n              <div class=\"card card-body\">\n                <div>\n                  <ul class=\"list-group list-group-flush\">\n                    " + tempList + "                    \n                  </ul>\n                </div>\n              </div>\n              \n            </div>\n\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary\" id=\"acceptEvent\" >\u041F\u0440\u0438\u043D\u044F\u0442\u044C</button>\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    ";
        $('#setNote').on('show.bs.collapse', function () {
            $('#Notes')['collapse']('hide');
        });
        $('#Notes').on('show.bs.collapse', function () {
            $('#setNote')['collapse']('hide');
            reloadEvents();
        });
        document.querySelector('#alertModal').addEventListener('click', function (e) {
            var x = e.target['id'];
            var kTime = document.querySelector('#evTime')['value'];
            var kText = document.querySelector('#kText')['value'];
            if (x == "acceptEvent") {
                if (kTime != "" && kText != "") {
                    evID++;
                    eventArray.push({ id: evID, evTime: kTime, evText: kText });
                    window.localStorage.setItem('ClockNotesEvents', JSON.stringify(eventArray));
                    $('#alertModal')['modal']('hide');
                    $('#myModal')['modal']('handleUpdate');
                    reloadEvents();
                }
                else {
                    alert("Заполните все поля!");
                }
            }
            var key = e['path'][3].querySelector('#findItem')['innerText'];
            if (x == "removeItem") {
                e['path'][3].remove();
                removeAlert(key);
            }
        });
    });
    //Drawing
    function newCard() {
        var cards = document.querySelector('.cards');
        switch (contentType) {
            case "image":
                cards.innerHTML += "\n        <div class=\"card\" id=\"contentCard\" style=\"width: 18rem;\">\n          <img class=\"card-img-top\" id=\"cardContent\" src=\"../assets/" + contentValue + "\" alt=\"Card image cap\">\n          <hr>\n          <p class=\"card-text\" id=\"cardTime\">" + contentTime + "</p>\n          \n          <hr>\n          <button type=\"button\" class=\"btn btn-danger\" id=\"removeImage\">\u0423\u0431\u0440\u0430\u0442\u044C</button>\n\n        </div>\n      ";
                break;
            case "video":
                cards.innerHTML += "\n        <div class=\"card\" id=\"contentCard\" style=\"width: 18rem;\">\n          <div class=\"card-body\">\n            <div class=\"embed-responsive embed-responsive-4by3\">\n              <iframe class=\"embed-responsive-item\" id=\"cardContent\" src=\"../assets/" + contentValue + "\"></iframe>\n            </div>\n\n            <hr>\n            <p class=\"card-text\" id=\"cardTime\">" + contentTime + "</p>\n\n          </div>\n\n          <hr>\n          <button type=\"button\" class=\"btn btn-danger\" id=\"removeVideo\">\u0423\u0431\u0440\u0430\u0442\u044C</button>\n\n        </div>\n        ";
                break;
            case "text":
                cards.innerHTML += "\n          <div class=\"card\" id=\"contentCard\" style=\"width: 18rem;\">\n            <div class=\"card-body\">\n              <p class=\"card-text\" id=\"cardContent\">" + contentValue + "</p>\n              \n              <hr>\n              <p class=\"card-text\" id=\"cardTime\">" + contentTime + "</p>\n\n            </div>\n\n            <hr>\n            <button type=\"button\" class=\"btn btn-danger\" id=\"removeText\">\u0423\u0431\u0440\u0430\u0442\u044C</button>\n\n          </div>\n        ";
                break;
        }
    }
    //Removing Event
    document.querySelector('.cards').addEventListener('click', function (e) {
        var findType;
        var findValue;
        var findTime;
        var emg;
        switch (e.target['id']) {
            case 'removeImage':
                var emg = e.target.parentElement;
                findType = "image";
                findValue = emg.querySelector('#cardContent')['src'];
                findValue = findValue.slice(29);
                findTime = e['path'][1].querySelector('#cardTime')['innerText'];
                //Removing
                e['path'][1].remove();
                removeItem(findType, findValue, findTime);
                break;
            case 'removeVideo':
                var emg = e.target.parentElement;
                findType = "video";
                findValue = emg.querySelector('#cardContent')['src'];
                findValue = findValue.slice(29);
                findTime = e['path'][1].querySelector('#cardTime')['innerText'];
                //Removing
                e['path'][1].remove();
                removeItem(findType, findValue, findTime);
                break;
            case 'removeText':
                findType = "text";
                findValue = (e['path'][1].querySelector('#cardContent')['innerText']);
                findTime = (e['path'][1].querySelector('#cardTime')['innerText']);
                //Removing
                e['path'][1].remove();
                removeItem(findType, findValue, findTime);
                break;
        }
    });
    function Validation(nHr, nMn) {
        var gt = new Date();
        var findTime;
        var nD, nM, nY, fD, fM, fY, fHr, fMn;
        nD = gt.getDate().toString();
        nM = gt.getMonth();
        nY = gt.getFullYear();
        nM++;
        nD = nD < 10 ? "0" + nD : nD;
        nM = nM < 10 ? "0" + nM : nM;
        nHr = nHr < 10 ? "0" + nHr : nHr;
        nMn = nMn < 10 ? "0" + nMn : nMn;
        nD = nD.toString();
        nM = nM.toString();
        nY = nY.toString();
        nHr = nHr.toString();
        nMn = nMn.toString();
        // console.log
        for (var i = 0; i < eventArray.length; i++) {
            if (eventArray[i] != null) {
                findTime = eventArray[i]['evTime'];
                var text = eventArray[i]['evText'];
            }
            fD = findTime.slice(8, 10);
            fM = findTime.slice(5, 7);
            fY = findTime.slice(0, 4);
            fHr = findTime.slice(11, 13);
            fMn = findTime.slice(14, 16);
            if (fY == nY && fM == nM && fD == nD && fHr == nHr && fMn == nMn) {
                showAlert(i, text);
            }
        }
    }
    ;
});
//Remove Function
function removeItem(keyType, keyValue, keyTime) {
    keyTime = " " + keyTime;
    var id;
    var js = window.localStorage.getItem('ClockNotesKey');
    var pjs = JSON.parse(js);
    for (var i = 0; i < pjs.length; i++) {
        if (keyType == pjs[i]['contentType'] && keyValue == pjs[i]['contentValue'] && keyTime == pjs[i]['contentTime'])
            id = i;
    }
    tempArray = contentArray;
    tempArray.splice(id, 1);
    window.localStorage.setItem('ClockNotesKey', JSON.stringify(tempArray));
}
//Remove Alert
function removeAlert(key) {
    var ejs = window.localStorage.getItem('ClockNotesEvents');
    var epjs = JSON.parse(ejs);
    for (var i = 0; i < epjs.length; i++) {
        if (key == epjs[i]['id'])
            key = i;
    }
    console.log(key);
    tempArray = eventArray;
    tempArray.splice(key, 1);
    window.localStorage.setItem('ClockNotesEvents', JSON.stringify(tempArray));
}
function fillEvents(tID, tTime, tText) {
    var day = tTime.slice(8, 10);
    var month = tTime.slice(5, 7);
    var year = tTime.slice(0, 4);
    var hour = tTime.slice(11, 13);
    var minute = tTime.slice(14, 16);
    tempList += "\n    <a href=\"#\" id=\"listID\" class=\"list-group-item list-group-item-action flex-column align-items-start\">\n      <div class=\"d-flex w-100 justify-content-between\">\n        <p id=\"findItem\" style=\"display:none\">" + tID + "</p>\n        <h5 class=\"mb-1\">" + day + "." + month + "." + year + " | " + hour + ":" + minute + "</h5>\n        <small class=\"text-muted\"><button type=\"button\" id=\"removeItem\" class=\"btn btn-danger btn-sm\">\u00D7</button></small>\n      </div>\n      <p>" + tText + "</p>\n    </a>\n  ";
}
function showAlert(key, text) {
    var alrt = document.querySelector('.modalHelper');
    alrt.innerHTML = "\n  <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" id=\"AlertModal\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>" + text + "</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" id=\"removeAlert\" data-dismiss=\"modal\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C</button>\n      </div>\n    </div>\n  </div>\n</div>\n  ";
    $('#AlertModal')['modal']('show');
    msc.playMusic();
    document.querySelector('#removeAlert').addEventListener('click', function () {
        msc.pauseMusic();
        removeAlert(key);
    });
}
