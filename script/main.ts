var contentType : string;
var contentValue : string;
var contentTime : string;
var contentArray : Array <any> = [];
var eventArray : Array <any> = [];
var tempArray : Array <any> = [];
var evID = 0;

var prevMn = 0;

var tempList = "";

class Music{//Классы
  public audio = new Audio();

  playMusic(){
    this.audio.src = "../assets/audio/acdc.mp3";
    this.audio.load();
    this.audio.play();
  }

  pauseMusic(){
    this.audio.pause();
  } 
}

class NowTime{
  public day;
  public month;
  public year;
  public hour;
  public minute;
  public global= new Date();
  constructor(day?, month?, year?, hour?, minute?){
      this.day = this.global.getDate();
      this.month = this.global.getMonth();
      this.year = this.global.getFullYear();
      this.hour = this.global.getHours();
      this.minute = this.global.getMinutes();
  }

  getMonth(){
    var stringMonth : string = "empty";
    switch(this.month){
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
  }

  getHour(){
    var str = this.hour<10?"0"+this.hour:this.hour;
    return str;
  }

  getMinute(){
    var str = this.minute<10?"0"+this.minute:this.minute;
    return str;
  }

  getNow(){
    var str =  " | " + this.day + "-го " + this.getMonth() + ", " + this.year + " | " +  this.getHour() + ":" + this.getMinute();
    return str;
  }
}

var msc = new Music();

document.addEventListener('DOMContentLoaded', function(){  
  reloadEvents();
  ///////Synchronization for Events 
  function reloadEvents(){
    tempList = ""
    eventArray.splice(0, eventArray.length)
    if(window.localStorage != null){
      js = window.localStorage.getItem('ClockNotesEvents');
      var pjs = JSON.parse(js);
  
      if(pjs != null){
        var tmpID;
        var tmpTime;
        var tmpText;
        for(var i = 0; i < pjs.length; i++){
          if(pjs[i] != null) tmpID = pjs[i]['id'];
          if(pjs[i] != null) tmpTime = pjs[i]['evTime'];
          if(pjs[i] != null) tmpText = pjs[i]['evText'];
          fillEvents(tmpID, tmpTime, tmpText);
        }
        evID = tmpID;
      }
    }
  
    var ejs = window.localStorage.getItem('ClockNotesEvents');
    var epjs = JSON.parse(js);
    if(epjs != null) eventArray = epjs;
  }


  //Synchronization for Notes
  if(window.localStorage != null){
    js = window.localStorage.getItem('ClockNotesKey');
    var pjs = JSON.parse(js);

    if(pjs != null){
      for(var i = 0; i < pjs.length; i++){
        if(pjs[i] != null) contentType = pjs[i]['contentType'];
        if(pjs[i] != null) contentValue = pjs[i]['contentValue'];
        if(pjs[i] != null) contentTime = pjs[i]['contentTime'];
        newCard();
      }
    }
  }

  var js = window.localStorage.getItem('ClockNotesKey');
  var pjs = JSON.parse(js);
  if(pjs != null) contentArray = pjs; 

  const canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var timerId = setInterval(function() {
      
      var time = new Date();
      var hr = time.getHours();
      var mn = time.getMinutes();
      var sc = time.getSeconds();

      if(prevMn != mn){
        prevMn = mn;
        Validation(hr, mn);
      }

      draw(hr, mn, sc)
  }, 1000);
  /////////////////////////
  function draw(hr, mn, sc){//Рисуем каждую секунду часы
    ctx.clearRect(0,0,300,300);
    var x = 150;
    var y = 150;
    var r = 145;
    var start = -90 * Math.PI/180;
    //Getting time 
    var am = (mn/60)*Math.PI*2+start;
    var ah = ((hr % 12) / 12) * Math.PI*2+start;
    var as = (sc/60)*Math.PI*2+start;
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
    ctx.fillText(hr<10?"0"+hr:hr, x-50, y);

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

  //Открытие модального окна с добавлением новой заметки
  document.querySelector('#add_Event').addEventListener('click', function(){
    var d = document.querySelector('.modalHelper');
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
            <div class="modal-body">`
            +
            //Buttons for Dropdowns (image, video, text)
            `
            <p>
              <a class="btn btn-primary" id="btn_image" data-toggle="collapse" href="#import_image" aria-expanded="true" aria-controls="import_image">Изображение</a>
              <a class="btn btn-primary"  id="btn_video" data-toggle="collapse" href="#import_video" aria-expanded="true" aria-controls="import_video">Видео</a>
              <a class="btn btn-primary" id="btn_text" data-toggle="collapse" href="#import_text" aria-expanded="true" aria-controls="import_text">Текст</a>
            </p>
            `
            //Dropdown for image
            +
            ` 
            <div class="collapse" id="import_image">
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
            `+
            //Dropdown for video
            `
            <div class="collapse video_collapse" id="import_video">
              <div class="card card-body">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="linkform" placeholder="Вставьте ссылку на видео" aria-label="Video Link" aria-describedby="button-addon2">  
                </div>
              </div>
            </div>
            `
            +
            //Dropdown for text
            `
            <div class="collapse" id="import_text">
              <div class="card card-body">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Введите текст</span>
                  </div>
                  <textarea class="form-control" id="textForm" aria-label="Введите текст"></textarea>
                </div>
              </div>
            </div>  
            `
            +
            //Footer
            `
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="button" id="accept_button" class="btn btn-primary" data-dismiss="modal">Принять</button>
            </div>
          </div>
        </div>
      </div>
    `;

    //Functions for closing collapse

    $('#import_image').on('show.bs.collapse', function () {
      $('#import_video')['collapse']('hide')
      $('#import_text')['collapse']('hide')
    });
      
    $('#import_video').on('show.bs.collapse', function () {
      $('#import_image')['collapse']('hide')
      $('#import_text')['collapse']('hide')
    });

    $('#import_text').on('show.bs.collapse', function () {
      $('#import_video')['collapse']('hide')
      $('#import_image')['collapse']('hide')
    });

    //Eveniments

    d.querySelector('#exampleModalCenter #btn_image').addEventListener('click', function(){//Нажали на изображение
      d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function(){
        contentType = "image";

        contentValue = d.querySelector('#exampleModalCenter #inputGroupFile02')['value'];
        contentValue = contentValue.slice(12);
        const times = new NowTime();
        contentTime = times.getNow();

        contentArray.push({contentType : contentType, contentValue : contentValue, contentTime : contentTime});

        window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
        newCard();//Доавляем карточку
      })
    })

    d.querySelector('#exampleModalCenter #btn_video').addEventListener('click', function(){//Нажали на видео
      d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function(){
        
        contentType = "video";
        contentValue = d.querySelector('#exampleModalCenter #linkform')['value'];
        // contentValue = "video.mp4;

        const times = new NowTime();
        contentTime = times.getNow();

        contentArray.push({contentType : contentType, contentValue : contentValue, contentTime : contentTime});
        window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
        
        newCard();//Доавляем карточку
      })
    })

    d.querySelector('#exampleModalCenter #btn_text').addEventListener('click', function(){//Нажали на текст
      d.querySelector('#exampleModalCenter #accept_button').addEventListener('click', function(){
        
        contentType = "text";
        contentValue = d.querySelector('#exampleModalCenter #textForm')['value'];

        const times = new NowTime();
        contentTime = times.getNow();

        contentArray.push({contentType : contentType, contentValue : contentValue, contentTime : contentTime});
        window.localStorage.setItem('ClockNotesKey', JSON.stringify(contentArray));
        
        newCard();//Доавляем карточку
      })
    })

  })

  //Clear Synchronization content
  document.querySelector('#clearSyn').addEventListener('click', function(){//Чистим local storage
    if(confirm("Это приведет к потере всех ваших заметок, вы уверены?")){
      window.localStorage.clear();
    }
  })

  //Alert Event
  document.querySelector("#setEvent").addEventListener('click', function(){//Модальное окно с предстоящими событиями и с добавлением нового
    reloadEvents();
    if(tempList==""){
      tempList = "Тут пока пусто("
    } 
    var d = document.querySelector('.modalHelper');
    d.innerHTML = `
      <div class="modal" tabindex="-1" role="dialog" id="alertModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Добавить напоминание</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="text-align:center"> 
              <p>
                <a class="btn btn-primary" id="btn_image" data-toggle="collapse" href="#setNote" aria-expanded="true" aria-controls="setNote">Добавить</a>
                <a class="btn btn-primary"  id="btn_video" data-toggle="collapse" href="#Notes" aria-expanded="true" aria-controls="Notes">Мои события</a>
              </p>
              `
              //setNote
              +
            ` 
            <div class="collapse" id="setNote">
              <div class="card card-body">
                <form style="text-align:center;">
                  <input type="datetime-local" name="bdaytime" id="evTime">
                </form>
                <hr>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Введите текст</span>
                  </div>
                  <textarea class="form-control" id="kText" aria-label="Введите текст"></textarea>
                </div>
              </div>
            </div>
            `+
            //Notes
            `
            <div class="collapse" id="Notes">
              <div class="card card-body">
                <div>
                  <ul class="list-group list-group-flush">
                    `+tempList+`                    
                  </ul>
                </div>
              </div>
              
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="acceptEvent" >Принять</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
    `;
    $('#setNote').on('show.bs.collapse', function () {
      $('#Notes')['collapse']('hide')
    });
      
    $('#Notes').on('show.bs.collapse', function () {
      $('#setNote')['collapse']('hide')
      reloadEvents();
    });

    document.querySelector('#alertModal').addEventListener('click', function(e : any){//Открытие модального окна с напоминанием
      var x = e.target['id'];
      var kTime = document.querySelector('#evTime')['value'];
      var kText = document.querySelector('#kText')['value'];
      if(x == "acceptEvent"){
        if(kTime !="" && kText != ""){
          evID++;
          eventArray.push({id: evID, evTime : kTime, evText : kText});
          window.localStorage.setItem('ClockNotesEvents', JSON.stringify(eventArray));
          $('#alertModal')['modal']('hide')
          $('#myModal')['modal']('handleUpdate')
          reloadEvents();
        }
        else{
          alert("Заполните все поля!")
        }
      }
      var key = e['path'][3].querySelector('#findItem')['innerText'];
      
      if(x == "removeItem"){//Удаление напоминания
        e['path'][3].remove();
        removeAlert(key);
      }
    })
    
  })

  //Drawing / Создание новой карты
  function newCard(){
    var cards = document.querySelector('.cards');
    switch(contentType){

      case "image" : 
        cards.innerHTML += `
        <div class="card" id="contentCard" style="width: 18rem;">
          <img class="card-img-top" id="cardContent" src="../assets/`+ contentValue +`" alt="Card image cap">
          <hr>
          <p class="card-text" id="cardTime">`+ contentTime +`</p>
          
          <hr>
          <button type="button" class="btn btn-danger" id="removeImage">Убрать</button>

        </div>
      `;
      break;

      case "video" : //Карточка с видео
        cards.innerHTML +=`
        <div class="card" id="contentCard" style="width: 18rem;">
          <div class="card-body">
            <div class="embed-responsive embed-responsive-4by3">
              <iframe class="embed-responsive-item" id="cardContent" src="../assets/`+ contentValue + `"></iframe>
            </div>

            <hr>
            <p class="card-text" id="cardTime">`+ contentTime +`</p>

          </div>
          <hr>
          <button type="button" class="btn btn-danger" id="removeVideo">Убрать</button>

        </div>
        `;
      break;
      
      case "text" : //С текстом
        cards.innerHTML += `
          <div class="card" id="contentCard" style="width: 18rem;">
            <div class="card-body">
              <p class="card-text" id="cardContent">`+contentValue+`</p>
              
              <hr>
              <p class="card-text" id="cardTime">`+ contentTime +`</p>

            </div>

            <hr>
            <button type="button" class="btn btn-danger" id="removeText">Убрать</button>

          </div>
        `;
      break;
    }
  }

  //Removing Event Удаление события
  document.querySelector('.cards').addEventListener('click', function(e : any){
    var findType;
    var findValue;
    var findTime;
    var emg;

    switch(e.target['id']){

      case 'removeImage':
      var emg = e.target.parentElement;

      findType = "image";
      findValue = emg.querySelector('#cardContent')['src'];
      findValue = findValue.slice(29);
      findTime = e['path'][1].querySelector('#cardTime')['innerText'];
      
      //Removing
      e['path'][1].remove()
      removeItem(findType, findValue, findTime);

      break;

      case 'removeVideo':
      var emg = e.target.parentElement;

      findType = "video";
      findValue = emg.querySelector('#cardContent')['src'];
      findValue = findValue.slice(29);
      findTime = e['path'][1].querySelector('#cardTime')['innerText'];


      //Removing
      e['path'][1].remove()
      removeItem(findType, findValue, findTime);
      break;

      case 'removeText'://Удаляем карточку с текстом

        findType = "text";
        findValue = (e['path'][1].querySelector('#cardContent')['innerText']);
        findTime = (e['path'][1].querySelector('#cardTime')['innerText']);

        //Removing
        e['path'][1].remove()
        removeItem(findType, findValue, findTime);

      break;
    }
  })

  function Validation(nHr, nMn){//Проверка каждую минуту, если дата совпадает с предстоящим напоминанием
    var gt = new Date();
    var findTime;
    var nD, nM, nY, fD, fM, fY, fHr, fMn;

    nD = gt.getDate().toString();
    nM = gt.getMonth();
    nY = gt.getFullYear();

    nM++;

    nD = nD<10?"0"+nD:nD;
    nM = nM<10?"0"+nM:nM;
    nHr = nHr<10?"0"+nHr:nHr;
    nMn = nMn<10?"0"+nMn:nMn;

    nD = nD.toString();
    nM = nM.toString();
    nY = nY.toString();
    nHr = nHr.toString();
    nMn = nMn.toString();

    for(var i = 0; i < eventArray.length; i++){
      if(eventArray[i] != null) {findTime = eventArray[i]['evTime']; var text = eventArray[i]['evText']}
        fD = findTime.slice(8, 10);
        fM = findTime.slice(5, 7);
        fY = findTime.slice(0, 4);
        fHr = findTime.slice(11, 13);
        fMn = findTime.slice(14, 16);
        if(fY == nY && fM == nM && fD == nD && fHr == nHr && fMn == nMn) {
          showAlert(i, text);
        }
    }   
  };
});

//Remove Function //Удаление карточки
function removeItem(keyType, keyValue, keyTime){//Получаем ключевые поля для сравнения
  keyTime = " " + keyTime;
  var id; 

  var js = window.localStorage.getItem('ClockNotesKey');
    var pjs = JSON.parse(js);
    for(var i = 0; i < pjs.length; i++){
      if(keyType == pjs[i]['contentType'] && keyValue == pjs[i]['contentValue'] && keyTime == pjs[i]['contentTime']) id = i; 
    }
    
    tempArray = contentArray;
    tempArray.splice(id, 1);
    window.localStorage.setItem('ClockNotesKey', JSON.stringify(tempArray));
}

//Remove Alert / Удаление напоминания
function removeAlert(key){
  var ejs = window.localStorage.getItem('ClockNotesEvents');
    var epjs = JSON.parse(ejs);
    for(var i = 0; i < epjs.length; i++){
      if(key == epjs[i]['id']) key = i; 
    }
    console.log(key)
    tempArray = eventArray;
    tempArray.splice(key, 1);
    window.localStorage.setItem('ClockNotesEvents', JSON.stringify(tempArray));
}

function fillEvents(tID, tTime, tText){//Функция создания нового List Item с событием
  var day = tTime.slice(8, 10);
  var month = tTime.slice(5, 7);
  var year = tTime.slice(0, 4);
  var hour = tTime.slice(11, 13);
  var minute = tTime.slice(14, 16);
  tempList += `
    <a href="#" id="listID" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <p id="findItem" style="display:none">`+tID+`</p>
        <h5 class="mb-1">`+ day + "." + month + "." + year + " | " + hour + ":" + minute + `</h5>
        <small class="text-muted"><button type="button" id="removeItem" class="btn btn-danger btn-sm">×</button></small>
      </div>
      <p>`+ tText +`</p>
    </a>
  `
}

function showAlert(key, text){//Вывод напоминания
  var alrt = document.querySelector('.modalHelper');
  alrt.innerHTML = `
  <div class="modal" tabindex="-1" role="dialog" id="AlertModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Напоминание</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>`+text+`</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="removeAlert" data-dismiss="modal">Принять и удалить</button>
      </div>
    </div>
  </div>
</div>
  `;

  $('#AlertModal')['modal']('show');
  msc.playMusic();//Воспроизведение звука при напоминании

  document.querySelector('#removeAlert').addEventListener('click', function(){
    msc.pauseMusic();//Остановка звука
    removeAlert(key);//Удаление события
  })
}