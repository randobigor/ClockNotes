document.addEventListener('DOMContentLoaded', function(){
  const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var timerId = setInterval(function() {
      var time = new Date();
      var hr = time.getHours();
      var mn = time.getMinutes();
      var sc = time.getSeconds();
      draw(hr, mn, sc)
  }, 1000);
  /////////////////////////
  function draw(hr, mn, sc){
    ctx.clearRect(0,0,300,300);
    var x = 150;
    var y = 150;
    var r = 145;
    var start = -90 * Math.PI/180;
    
    var am = mn/60*Math.PI*2+start;
    var ah = (hr % 12 / 12) * Math.PI*2+start;
    var as = sc/60*Math.PI*2+start;
    //hr % 12 / 12  - time

    ctx.lineWidth = 8; //Толщина линии
    ctx.lineCap = 'round'; // Стиль линии(с закругленными краями)

    //Drawing seconds arc
    ctx.beginPath();
    ctx.strokeStyle = "#00bfa5"; // cyan
    ctx.arc(x,y,r,start,as);
    ctx.stroke();
    ctx.closePath();

    //Drawing minute arc
    ctx.beginPath();
    ctx.strokeStyle = "#ffe938"; // yellow
    ctx.arc(x,y,130,start,am);
    ctx.stroke();
    ctx.closePath();

    //drawing hour arc
    ctx.beginPath();
    ctx.strokeStyle = "#ff2d6f"; // pink
    ctx.arc(x,y,115,start,ah);
    ctx.stroke();
    ctx.closePath();

    //Writing hours
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ff2d6f";
    ctx.fillText(hr, x-50, y);

    //":"
    ctx.fillStyle = "#fff";
    ctx.fillText(':', x-25, y);

    //Writing minutes
    ctx.fillStyle = "#ffe938";
    ctx.fillText(mn<10?"0"+mn:mn, x-15, y);

    //":"
    ctx.fillStyle = "#fff";
    ctx.fillText(':', x+10, y);

    //Writing seconds
    ctx.fillStyle = "#00bfa5";
    ctx.fillText(sc<10?"0"+sc:sc, x+20, y);
  }
  var btn = document.querySelector('#add_Event');
  btn.addEventListener('click', function(){
    var d = document.querySelector('.container');
    d.innerHTML = `
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Выберите тип загружаемого объекта</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style= "text-align: center;">`
            +
            //Buttons for Dropdowns (image, video, text)
            `
            <p>
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#import_image" aria-expanded="false" aria-controls="multiCollapseExample1">Изображение</button>
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#import_video" aria-expanded="false" aria-controls="multiCollapseExample2">Видео</button>
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#import_text" aria-expanded="false" aria-controls="multiCollapseExample3">Текст</button>
            </p>
            `
            //Dropdown for image
            +
            `
            <div>
              <div>
                <div class="collapse multi-collapse" id="import_image">
                  <div class="card card-body">
        
                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="inputGroupFile02">
                      <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="inputGroupFileAddon02">Upload</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div> 
                <div class="collapse multi-collapse" id="import_video">
                  <div class="card card-body">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Вставьте ссылку на изображение" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              <div>
                <div class="collapse multi-collapse" id="import_text">
                  <div class="card card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Введите текст</span>
                      </div>
                      <textarea class="form-control" aria-label="Введите текст"></textarea>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            `
            ////////////////
            +
            `
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-primary">Принять</button>
            </div>
          </div>
        </div>
      </div>`;
    
  })
  var d = document.querySelector('#add');
  d.addEventListener('click', function(){
    var cnt = document.querySelector('.container');
    cnt.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="../assets/hello.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">nd make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Fuck you</a>
        </div>
        </div>
    `;
  })
})

