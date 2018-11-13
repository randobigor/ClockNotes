document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var timerId = setInterval(function () {
        var time = new Date();
        var hr = time.getHours();
        var mn = time.getMinutes();
        var sc = time.getSeconds();
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
        ctx.fillText(hr, x - 50, y);
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
    var btn = document.querySelector('#add_Event');
    btn.addEventListener('click', function () {
        var d = document.querySelector('.container');
        d.innerHTML = "\n      <div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalCenterTitle\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430</h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">"
            +
                //Buttons for Dropdowns (image, video, text)
                "\n            <p>\n              <a class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#import_image\" aria-expanded=\"true\" aria-controls=\"import_image\">\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</a>\n              <a class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#import_video\" aria-expanded=\"true\" aria-controls=\"import_video\">\u0412\u0438\u0434\u0435\u043E</a>\n              <a class=\"btn btn-primary\" data-toggle=\"collapse\" href=\"#import_text\" aria-expanded=\"true\" aria-controls=\"import_text\">\u0422\u0435\u043A\u0441\u0442</a>\n            </p>\n            "
            //Dropdown for image
            +
                " \n            <div class=\"collapse\" id=\"import_image\">\n              <div class=\"card card-body\">\n                <div class=\"input-group mb-3\">\n                  <div class=\"custom-file\">\n                    <input type=\"file\" class=\"custom-file-input\" id=\"inputGroupFile02\">\n                    <label class=\"custom-file-label\" for=\"inputGroupFile02\" aria-describedby=\"inputGroupFileAddon02\">Choose file</label>\n                  </div>\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\" id=\"inputGroupFileAddon02\">Upload</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n                <div class=\"collapse\" id=\"import_video\">\n                  <div class=\"card card-body\">\n                    <div class=\"input-group mb-3\">\n                      <input type=\"text\" class=\"form-control\" placeholder=\"\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\" aria-label=\"Recipient's username\" aria-describedby=\"button-addon2\">\n                        <div class=\"input-group-append\">\n                          <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon2\">Button</button>\n                        </div>\n                      </div>\n                    </div>\n                </div>\n\n                <div class=\"collapse\" id=\"import_text\">\n                  <div class=\"card card-body\">\n                    <div class=\"input-group\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442</span>\n                      </div>\n                      <textarea class=\"form-control\" aria-label=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\"></textarea>\n                    </div>\n                  </div>\n                </div>\n              $('#import_image').on('show.bs.collapse', function () {\n                  $('#import_video').collapse('hide')\n                  $('#import_text').collapse('hide')\n              });\n            "
            ////////////////
            +
                "\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">\u041E\u0442\u043C\u0435\u043D\u0430</button>\n              <button type=\"button\" class=\"btn btn-primary\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</button>\n            </div>\n          </div>\n        </div>\n      </div>";
    });
});
var d = document.querySelector('#add');
d.addEventListener('click', function () {
    var cnt = document.querySelector('.container');
    cnt.innerHTML += "\n      <div class=\"card\" style=\"width: 18rem;\">\n        <img class=\"card-img-top\" src=\"../assets/hello.jpg\" alt=\"Card image cap\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">Card title</h5>\n          <p class=\"card-text\">nd make up the bulk of the card's content.</p>\n          <a href=\"#\" class=\"btn btn-primary\">Fuck you</a>\n        </div>\n        </div>\n    ";
});
