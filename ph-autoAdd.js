// ==UserScript==
// @name         PH - AutoAdd
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       triplecheeze+ant
// @match        *://*.pornhub.com/user/search*
// @grant        none
// ==/UserScript==



window.onload = function(){
    sleep(10);
    startA('none');
    startA('block');
    //startB('none');
    startB('block');
    startC('block');
    startDE();
    startF();
    startG();
    startH();
    startR0();
    startR1();
    startR2();
    RUN3();
    //deleteOldModalWindowUser();
    //elementModalWindowUser(id_ph);

};


/* ################################################################################################### */

// ########## START - ФУНКЦІЯ ДЛЯ ПАУЗИ МІЖ СТАДІЯМИ
function sleep(milliSeconds){
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
    console.log('### SLEEP',milliSeconds,'###')
}
// ########## END - ФУНКЦІЯ ДЛЯ ПАУЗИ МІЖ СТАДІЯМИ


/* ################################################################################################### */
// ГЛОБАЛЬНІ ЗМІННІ:
var xhr = new XMLHttpRequest();
var data = new FormData();
var _token = token;
// ПОВІДОМЛЕННЯ: яке ми пишемо при додаванні друга
// EN: You have a friend request from TTS AUDIO BOOK
// RU: У вас есть запрос на дружбу от TTS AUDIO BOOK
var myMessage = "У вас есть запрос на дружбу от TTS AUDIO BOOK";
// ПОВІДОМЛЕННЯ: при підписці - ми НЕ ПИШИМО ПОВІДОМЛЕНЬ!
var myMessage2 = "";
// час затримки, мінімально 10сек (=10000мс), оптимально 25сек+
var delay = 1000;
var url = "/user/friend_add_json?id=";
var url1 = "/user/friend_add_json?id=";
var url2 = "/user/subscribe_add_json?id=";
var _users = document.getElementsByClassName("userLink");
// починати відліх до дефолту з першого елемента
var count = 0;
// ПІД ЧАС ТЕСТУВАННЯ - вмикати завжди вимкненим
// але якщо в ПРОДАКШН, то треба закоментувати, бо не буде відбуватись автоСтарт при автоПереході на наступну сторінку
var started = false;
// вмикати завжди вимкненим
// localStorage.setItem('autoAdd', false);
// localStorage.setItem('node2', 'node2ls');
// приводимо до нульового значення, щоб алгоритм розбирав чторфнку завжди з самого початку
localStorage.setItem('idph','0');


function sendRequest(idph) {
                data.append('cancelRequest', 0);
                data.append('messageRequest', myMessage2);
                data.append('subscribe', 1);
                xhr.open('POST', url + idph + "&token=" + _token, true);
                xhr.send(data);
 }







// ########## START - RUN - ОСНОВНИЙ СКРИПТ
function RUN3() {
    'use strict';
    count = 0;
    started = false;
    var node = document.createElement("button");
    var node2 = document.createElement("button");
    // початковий текст на кнопці
    var nodeText = document.createTextNode("ЗУПИНЕНО Auto Add");
    var node2Text = document.createTextNode("СТАТУС");
    node.appendChild(nodeText);
    node2.appendChild(node2Text);
    node.classList.add("orangeButton");
    node2.classList.add("orangeButton");
    node.setAttribute("id", "autoadd");
    node2.setAttribute("id", "node2");
    node.type = "button";
    node2.type = "button";
    document.getElementsByClassName("searchActions")[0].appendChild(node);
    document.getElementsByClassName("searchActions")[0].appendChild(node2);
    window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
    var enabled = localStorage.getItem('autoAdd');
    if(enabled != "true") {
        localStorage.setItem('autoAdd', false);
    }else{
        var count = 0;
        document.getElementById("autoadd").innerHTML = "ПРАЦЮЄ auto add";
        started = true;
        console.log("### Створили кнопку в інтенрфейсі");
        // наступний рядок, робить команду автостарт при умові що перед рефрешем було включено.
        start();
    }
    var btn = document.getElementById('autoadd');
    btn.addEventListener("click", toggleAdd, false);
    function toggleAdd(){
        if(localStorage.getItem('autoAdd') === "true"){
            console.log("### ВИМИКАЄМО  autoAdd...");
            localStorage.setItem('autoAdd', false);
            document.getElementById("autoadd").innerHTML = "ЗУПИНЕНО";
            window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
            started = false;
        }else{
            console.log("### ЗАПУСКАЄМО autoAdd...");
            localStorage.setItem('autoAdd', true);
            document.getElementById("autoadd").innerHTML = "ПРАЦЮЄ";
            window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
            started = true;
            console.log("### ТИПУ ВІДПРАЦЮВАЛО...");
            sleep(3);
            start();
            // ТИПУ ВІДПРАВЛЯЄМО ЗАПИТ - ЗРОБЛЮ ТИПУ УСПІШНУ ЕМУЛЯЦІЮ В КОНСОЛЬ
        }
    }
// ########## СЕРЕДИНА - RUN - ОСНОВНИЙ СКРИПТ
};
// ########## END - RUN - ОСНОВНИЙ СКРИПТ
/* ################################################################################################### */


/* ################################################################################################### */
// START - СПРОБА ПЕРЕПИСАТИ НА МІЙ ФОРМАТ - не вдалась
    // дана функція працює корректно ЛИШЕ всережині материнської функції!
    function start(){
        console.log("004 start() ### Отримуємо лінк на Юзера");
        // ЦИКЛ вдя версії v02 :: var loop = setInterval(function(){},delay);
        var loop = setInterval(function(){
            if(started === false){
                console.log("005 start() ### Перевірка на те чи ВИМКНЕНО кнопку");
                console.log("006 start() ### КНОПКУ ВИМКНЕНО!");
                // Перевірка на те чи ВИМКНЕНО кнопку
                // якщо ми "очищуємо" інтервал, то виконання цикла - зупиняється!
                window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
                clearInterval(loop);
            }else if(count === _users.length){
                console.log("007 start() ### Перевірка на те, чи закінчився вже ВЕСЬ список, якщо закінчився, то автоматично клікається кнопка _Наступна_Сторінка_");
                // Перевірка на те, чи закінчився вже ВЕСЬ список, якщо закінчився, то автоматично клікається кнопка "Наступна Сторінка"
                count = 0;
                console.log("008 start() ###"+iteration+"### Переходимо на наступну сторінку");
                document.getElementsByClassName("page_next")[0].childNodes[0].click();
            }else{
                window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
                // ОТРИМАННЯ цифрового ID Юзера (щоб потім можна було зробити запит).
                console.log("010 start() ### ІТЕРАЦІЯ ",count," з " + _users.length);
                var iteration="("+count+"/"+_users.length+")"
                localStorage.setItem('_lsIteration', iteration);
                console.log("011 start() ###",iteration,"###");
                // попередня версія - де ми працювали з кожним елементом по порядку
                // var _id = _users[count].getAttribute("data-userid");
                // поточна версія - де ми працюємо ЛИШЕ з ПЕРШИМ елементом
                // власне idph це перший елемент, його ІД з DOM
                var idph = _users[0].getAttribute("data-userid");
                localStorage.setItem('idph',idph);
//localStorage.setItem('_lsPHdbIdph', idph);
                  console.log("100 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (1)" );
                  // обовязково видаляємо старі елементи (якщо вони є!)
                  console.log("200 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (2) - обовязково видаляємо старі елементи");
                  // deleteOldModalWindowUser();
                  // додаємо елемент з користувачем якого треба дослідити, чи вже на нього підписані
                  console.log("300 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (3) - додаємо елемент з користувачем якого треба дослідити, чи вже на нього підписані");
                  window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
                  elementModalWindowUser(idph);
                  // console.log("350 start() ###",iteration,"### User ID=" + idph + " знайдено! (3) - noneToBlock() - START");
                  //noneToBlock();
                  // console.log("360 start() ###",iteration,"### User ID=" + idph + " знайдено! (3) - noneToBlock() - END");
                  console.log("400 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (4) - перевіряємо чи підписані на цього користувача, і видаляємо/підписуємось");
                  subscribe(url,idph,_token);
                  console.log("500 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (5) - deleteOldModalWindowUser(); = START");
                  deleteOldModalWindowUser();
                  console.log("599 start() ###",iteration,"### User ID=" + localStorage.idph + " знайдено! (5) - deleteOldModalWindowUser(); = END");

                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4){
                        var res = JSON.parse(xhr.responseText);
                        if(res.success == "SPAM"){
                            sleep(800);
                            console.error("start() ###",iteration,"### INCREASE THE AUTO ADD DELAY,  REASON : SPAM // ТРЕБА ЗБІЛЬШИТИ ЧАС ЗАТРИМКИ, ПРИЧИНА: SPAM");
                            sleep(120000);
                        }else{
                            console.log("900 start() ###",iteration,"### (2-А) ### User ID=:" + localStorage.idph + " знайдено! ");
                            // обовязково видаляємо старі елементи
                            console.log("901 start() ###",iteration,"### (2-А) ### deleteOldModalWindowUser()");
                            deleteOldModalWindowUser();
                            // додаємо елемент з користувачем якого треба дослідити, чи вде на нього підписані
                            console.log("902 start() ###",iteration,"### (2-А) ### elementModalWindowUser(_id)");
                            elementModalWindowUser(idph);
                            // перевіряємо чи підписані на цього користувача, і видаляємо, якшо це так
                            console.log("903 start() ###",iteration,"### (2-А) ### deleteElement()");
                            subscribe();
                            // обовязково видаляємо старі елементи
                            console.log("904 start() ###",iteration,"### (2-А) ### deleteOldModalWindowUser()");
                            deleteOldModalWindowUser();
                        }
                        sleep(905);
                    }
                    sleep(906);
                };
                // підписуємось на користувача!
                subscribe(url,idph,_token);
                // збільшуємо значення лічильника на +1
                count++
                localStorage.setItem('_lScount', count);
                var lScount = localStorage.getItem('_lScount');
            }
// ЦИКЛ вдя версії v02 :: var loop = setInterval(function(){},delay);
        },delay);
    }
    var iteration = localStorage.getItem('_lsIteration');
// ########## END - СПРОБА ПЕРЕПИСАТИ НА МІЙ ФОРМАТ - не вдалась

/* ################################################################################################### */

// ########## START - ЗАВАНТАЖЕННЯ БЛОКА МОДАЛЬНОГО ВІКНА
function elementModalWindowUser(idph){
    console.log('303 elementModalWindowUser(idph) ### START ###');
    // elementModalWindowUser(436819712)
    // https://rt.pornhub.com/user/hover?id=436819712
    // https://good-code.ru/ajax-zapros/
    // Данные для передачи на сервер допустим id товаров и его количество
    // Создаём объект класса XMLHttpRequest
    var request = new XMLHttpRequest();
    // Составляем строку запроса и кладем данные, строка состоит из:
    // пути до файла обработчика ? имя в GET запросе где будет лежать значение запроса id_product и
    // через & мы передаем количество qty_product.
    var url = "https://rt.pornhub.com/user/hover?id="+localStorage.idph;
    // Здесь мы указываем параметры соединения с сервером, т.е. мы указываем метод соединения GET,
    // а после запятой мы указываем путь к файлу на сервере который будет обрабатывать наш запрос.
    request.open('GET', url);
    // Указываем заголовки для сервера, говорим что тип данных, - контент который мы хотим получить должен быть не закодирован.
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    // Здесь мы получаем ответ от сервера на запрос, лучше сказать ждем ответ от сервера
    request.addEventListener("readystatechange", () => {
        // request.readyState - возвращает текущее состояние объекта XHR(XMLHttpRequest) объекта,
        // бывает 4 состояния 4-е состояние запроса - операция полностью завершена, пришел ответ от сервера,
        // вот то что нам нужно request.status это статус ответа,
        // нам нужен код 200 это нормальный ответ сервера, 401 файл не найден, 500 сервер дал ошибку и прочее...
        // sleep(304);
        if (request.readyState === 4 && request.status === 200) {
            console.log("305 elementModalWindowUser(idph) ### РЕКВЕСТ модального вікна ВДАЛИЙ");
            // выводим в консоль то что ответил сервер
            // ЗАКОМЕНТУВАТИ наступний рядок ЯКЩО ВЖЕ ПРОДАКШЕНІ!
            // console.log( request.responseText );
            // https://learn.javascript.ru/modifying-document
            // где d1 - это ІД тега после которого мы выводим
            // де d2 - це відразу вивід (перед закриваючим body) коду модального вікна який нам виплюнув сервер на наш запит
            var d1 = window.document.getElementById('htcheck');
            var d2 = window.document.body.insertAdjacentHTML('beforeend', request.responseText);
            // 'beforebegin': до самого element (до открывающего тега).
            // 'afterbegin' : сразу после открывающего тега  element (перед первым потомком).
            // 'beforeend'  : сразу перед закрывающим тегом element (после последнего потомка).
            // 'afterend'   : после element (после закрывающего тега).
            // ПРИМЕР       : d1.insertAdjacentHTML('КАК_ВЫВОДИМ', 'HTML_КОД');
            // d1.insertAdjacentHTML('afterend', request.responseText);
            //document.body.insertAdjacentHTML('beforeend', request.responseText);
            window.document.body.innerHTML.replace(request.responseText);
            window.document.getElementsByClassName('avatarPopOver')[0].id='avatarPopOverId'+idph;
            // sleep(306);
            noneToBlock();
        }else{
            console.log("304 elementModalWindowUser(idph) ### РЕКВЕСТ модального вікна НЕ ВДАЛИЙ");
        };
    });
    // Выполняем запрос
    console.log("301 elementModalWindowUser(idph) ### виконуємо запит");
    request.send();
    // УВАГА!
    // технологічна пауще не менше 5000, бо від сервера не встигає надійти відповідь, і це ламає алгоритм!
    // sleep(5000);
    console.log('349 elementModalWindowUser(idph) ### END ###');
};
sleep(1);
// наступний рядок потрібен для відладки - його можна буде видалити якщо ВСЕ ПРАЦЮЄ!
    function noneToBlock() {
        console.log('351 noneToBlock() ### START');
        var idph = localStorage.idph;
        if (window.document.getElementById('avatarPopOverId'+idph)) {
            console.log('352 noneToBlock() ### якщо є елемент avatarPopOverId то змінюємо його кольори на синій');
            window.document.getElementById('avatarPopOverId'+idph).style.display='block';
            window.document.getElementById('avatarPopOverId'+idph).style.background='blue';
            // фарбуємо КНОПКУ2
            window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='blue';
            console.log('353 noneToBlock() ### БАЧИТЬ елементів для опрацювання [',window.document.getElementsByClassName("avatarPopOver").length,'] ');
        } else {
            console.log('354 noneToBlock() ### АБО ::: ЩОСЬ ПІШЛО НЕ ТАК, БО МУСИТЬ БУТИ =1. ТОЖ DOM ЧОМУСЬ НЕ ЗЧИТАВСЯ ПОВНІСТЮ - ТРЕБА ШУКАТИ ПОМИЛКИ!');
            console.log('355 noneToBlock() ### АБО ::: ВАРТО ЗАЧЕКАТИ ПАРУ ЦИКЛІВ, ПОКИ СКРИПТ НЕ ПРОГРУЗИТЬ ВСІ ПАРАМЕТРИ І ВИЙДЕ В РЕЖИМ ПРОДАКШН');
            console.log('356 noneToBlock() ### АБО ::: якщо НЕМА елемента avatarPopOverId, і з вигляду все працює правильно, - то видаляємо ВСІ непотрібні попапи');
            console.log('357 noneToBlock() ### ВЖУХ! І МИ ВИДАЛИЛИ СТАРІ ПОПАПИ функцією deleteOldModalWindowUser()');
            // фарбуємо КНОПКУ2
            window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
            deleteOldModalWindowUser();
        }
        console.log('358 noneToBlock() ### END');
    };
// ########## END - ЗАВАНТАЖЕННЯ БЛОКА МОДАЛЬНОГО ВІКНА










/* ################################################################################################### */
// ########## START - КОСМЕТИЧНА ЧИСТКА
function deleteExist() {
    var elementPopOver = document.getElementsByClassName('avatarPopOver')
    var elementPopOverLength = elementPopOver.length;
    console.log('### - START - КОСМЕТИЧНА ЧИСТКА - ТИМЧАСОВО ВИМКНЕНО!!!');
    deleteOldModalWindowUser()
}
// ########## END - КОСМЕТИЧНА ЧИСТКА

/* ################################################################################################### */

// ########## START - ВИДАЛЕННЯ БЛОКА/БЛОКІВ ПОПЕРЕДНІХ МОДАЛЬНИХ ВІКОН
function deleteOldModalWindowUser() {
    // var idph = localStorage.getItem('idph');
    // перез збереженням - видаляэмо ВСІ ІСНУЮЧІ ОБЄКТИ --> class="avatarPopOver" - що розміщені перед закриваючим BODY
    // document.getElementsByClassName('avatarPopOver')[0].remove();
    // дізнаємось поточну кількість існуючих:
    var elementPopOver = document.getElementsByClassName('avatarPopOver');
    var elementPopOverLength = elementPopOver.length;
    // видаляємо усі окрім 0 (фактично першого) елемента:
    for (var i = 0; i < elementPopOverLength; i++) {
        // if (document.getElementsByClassName('avatarPopOver') && document.getElementById.length!=0) {
        if (document.getElementsByClassName('avatarPopOver')) {
            document.getElementsByClassName('avatarPopOver')[i].remove();
        }
        // document.getElementsByClassName('avatarPopOver')[0].remove();
        // видаляємо усі елементи окрім того що має ID
        // document.getElementsByClassName('user-flag large-avatar')[a].parentNode.style.background='red';
    };
    console.log("510 deleteOldModalWindowUser() ### ВИДАЛЕНО " + elementPopOverLength + " елементів СТАРИХ МОДАЛЬНИХ ВІКОН");
};
// ########## END - ВИДАЛЕННЯ БЛОКА/БЛОКІВ ПОПЕРЕДНІХ МОДАЛЬНИХ ВІКОН


/* ################################################################################################### */
// https://qna.habr.com/q/488804
// [ idph, Username , Lang , Subscribe , Frend ]
function lsSet(idph){
    // смикаємо змінну з LS
    idph = localStorage.idph;
    // створюємо змінну, щоб можна було її підставляти як параметр (бо "+" ламає запит).
    var lsPHdb_idph = 'lsPHdb_'+idph
    var username = window.document.getElementsByClassName('username')[0].innerText
    var lsString = {'idph':idph,'username':username,'lang':'ru','subs':'true','frend':'na'}
    localStorage.setItem(lsPHdb_idph,JSON.stringify(lsString));
    localStorage.setItem('_lsPHdbIdph',idph);
    localStorage.setItem('_lsPHdbUsername',username);
    localStorage.setItem('_lsPHdbLang','ru');
    localStorage.setItem('_lsPHdbSubs','true');
    localStorage.setItem('_lsPHdbFrend','na');
    localStorage._lsPHdbIdph;
    localStorage._lsPHdbUsername;
    localStorage._lsPHdbLang;
    localStorage._lsPHdbSubs;
    localStorage._lsPHdbFrend;
    console.log('lsSet() ### створили LS')
    console.log('lsSet() ###',localStorage._lsPHdbIdph,'/',localStorage._lsPHdbUsername,'/',localStorage._lsPHdbLang,'/',localStorage._lsPHdbSubs,'/',localStorage._lsPHdbFrend,' ')
};
// https://qna.habr.com/q/488804
// [ idph, Username , Lang , Subscribe , Frend ]
function lsGet(idph){
    // смикаємо змінну з LS
    idph = localStorage.idph;
    // створюємо змінну, щоб можна було її підставляти як параметр (бо "+" ламає запит).
    var lsPHdb_idph = 'lsPHdb_'+idph
    var lsPHdb = JSON.parse(window.localStorage.getItem(lsPHdb_idph));
    if (null !== lsPHdb) {
        var lsPHdbIdph = lsPHdb.idph;
        var lsPHdbUsername = lsPHdb.username;
        var lsPHdbLang = lsPHdb.lang;
        var lsPHdbSubs = lsPHdb.subs;
        var lsPHdbFrend = lsPHdb.frend;
        // перевірка
        // console.log('lsGet() ### ',lsPHdb.idph);
        // console.log('lsGet() ### ',lsPHdb.username);
        // console.log('lsGet() ### ',lsPHdb.lang);
        // console.log('lsGet() ### ',lsPHdb.subs);
        // console.log('lsGet() ### ',lsPHdb.frend);
        localStorage.setItem('_lsPHdbidph',lsPHdbIdph);
        localStorage.setItem('_lsPHdbUsername',lsPHdbUsername);
        localStorage.setItem('_lsPHdbLang',lsPHdbLang);
        localStorage.setItem('_lsPHdbSubs',lsPHdbSubs);
        localStorage.setItem('_lsPHdbFrend',lsPHdbFrend);
    }
    console.log('lsGet() ### VAR ##',lsPHdbIdph,'#',lsPHdbUsername,'#',lsPHdbLang,'#',lsPHdbSubs,'#',lsPHdbFrend,'#')
    console.log('lsGet() ### LS ###',localStorage._lsPHdbIdph,'#',localStorage._lsPHdbUsername,'#',localStorage._lsPHdbLang,'#',localStorage._lsPHdbSubs,'#',localStorage._lsPHdbFrend,'#')
    console.log('lsGet() ### END ##')
};
/* ################################################################################################### */

// ########## START - ВИДАЛЕННЯ, ЯКЩО ПІДПИСАНИЙ. І ПІДПИСАННЯ ЯКЩО НОВИЙ.
function subscribe(url,idph,_token) {
    // смикаємо змінну з LS
    idph = localStorage.idph;
    var lsPHdb_idph = 'lsPHdb_'+idph
    console.log("401 subscribe(url,idph,_token) ### START");
    //idph = localStorage.getItem('idph');
    console.log("401 subscribe(url,idph,_token) ### LS ### ");
    console.log("401 subscribe(url,idph,_token) ### LS ### ЯКЩО вже є в LS записане значення...");
    console.log("401 subscribe(url,idph,_token) ### LS ### IF localStorage._lsPHdbIdph=[",localStorage._lsPHdbIdph,"] ДОРІВНЮЄ localStorage.idph=[",localStorage.idph,"]");
    // {"idph":"125534601","username":"vortexonline ","lang":"ru","subs":"true","frend":"na"} ДОРІВНЮЄ localStorage.idph= 125534601
    lsGet(idph);
    if (localStorage._lsPHdbIdph === localStorage.idph) {
    // if (localStorage._lsPHdbUsername === window.document.getElementsByClassName('username')[0].innerText) {
        window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='red';
        window.console.log('subscribe(url,idph,_token) ### ТАК, ДОРІВНЮЄ! --> ВИДАЛЯЄМО! ###')
        // window.console.log('subscribe(url,idph,_token) ### LS ###',localStorage._lsPHdbIdph,'#',localStorage._lsPHdbUsername,'#',localStorage._lsPHdbLang,'#',localStorage._lsPHdbSubs,'#',localStorage._lsPHdbFrend,'#')
        // window.console.log("subscribe(url,idph,_token) ### LS ### якщо в LS вже стоїть помітка що ПІДПИСАНИЙ - відразу видаляємо! (без будь-яких запитів до сайта!)");
        window.document.getElementsByClassName('user-flag large-avatar')[0].parentNode.remove();
        window.console.log("subscribe(url,idph,_token) ### LS ### ВИДАЛИЛИ :",localStorage._lsPHdbIdph,"=",localStorage._lsPHdbUsername);
        //sleep(7000);
    } else {
    console.log('subscribe(url,idph,_token) ### НІ, НЕ ДОРІВНЮЄ! --> опрацьовуємо далі...')
    // ЯКЩО ЦЕ БІЛИЙ - ВИДАЛЯЄМО ЙОГО (він іноді може зявлятись).
    startG();
    }
    //localStorage.setItem('lSusername','0');
    //localStorage.setItem('lSsubscibertrue','0');
    //localStorage.setItem('lSsubscibertrueNum','0');
    window.console.log("401 B subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО наступний рядок буде ПОМИЛКА !!! ");
    //if (window.document.getElementsByClassName('buttonLabel')[1].innerText=='Подписаны') {
    var idClassSubscribe = '#avatarPopOverId'+idph+' .buttonLabel'
    if (window.document.querySelectorAll(idClassSubscribe)[1].innerText=='Подписаны') {
        window.console.log("402 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### ");
        window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='green';
        //var lSusername = localStorage.setItem('lSusername', document.getElementsByClassName('username')[0].innerText);
        //var lSsubscibertrue = localStorage.setItem('lSsubscibertrue', document.getElementsByClassName('buttonLabel')[1].innerText);
        //var lSsubscibertrueNum = localStorage.setItem('lSsubscibertrueNum',document.getElementsByClassName('subscribers-count')[0].innerText);
        //var username=window.document.getElementsByClassName('username')[0].innerText
        console.log("403 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### записали значення по цьому юзеру в LS: ");
        lsSet(idph);
        console.log("404 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### бо є значення в LS =",localStorage._lsPHdbIdph);
        //console.log("405 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### ВІКНО: ЮЗЕР        =",window.document.getElementsByClassName('username')[0].innerText," lsPHdbUsername=",localStorage._lsPHdbUsername,"==> GREEN/REMOVE!");
        //console.log('406 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### ВІКНО: ПОДПИСАНЫ   =',window.document.getElementsByClassName('buttonLabel')[1].innerText,' ==> GREEN/REMOVE!')
        //console.log('407 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### ВІКНО: ПІДПИСНИКІВ =',window.document.getElementsByClassName('subscribers-count')[0].innerText,' ==> GREEN/REMOVE!')
        //document.getElementsByClassName('user-flag large-avatar')[0].parentNode.style.background='green';
        window.document.getElementsByClassName('user-flag large-avatar')[0].parentNode.style.background='green';
        window.document.getElementsByClassName('avatarPopOver')[0].style.display='block';
        window.document.getElementsByClassName('avatarPopOver')[0].style.background='green';
        window.document.getElementsByClassName('user-flag large-avatar')[0].id=idph;
        // elementT2[0].parentNode.style.display='none';
        // document.getElementsByClassName("page_next")[0].childNodes[0].click();
        //sleep(5000);
        console.log('408 subscribe(url,idph,_token) ###')
        // власне і видаляємо...
        window.document.getElementsByClassName('user-flag large-avatar')[0].parentNode.remove();
        window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='white';
        console.log('409 subscribe(url,idph,_token) ### якшо ПІДПИСАНІ ТО ВИДАЛЯЄМО ### ВИДАЛЕНО ЕЛЕМЕНТ з вже підписаним користувачем ',localStorage.getItem('lsPHdb_'+idph))
        console.log('410 subscribe(url,idph,_token) ### ДЛЯ ПРОФІЛАКТИКИ: видаляємо попап deleteOldModalWindowUser() - START')
        deleteOldModalWindowUser();
        console.log('411 subscribe(url,idph,_token) ### ДЛЯ ПРОФІЛАКТИКИ: видаляємо попап deleteOldModalWindowUser() - END')
    } else {
        console.log("431 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ");
        console.log("432 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ...переходимо до Підписки");
//deleteOldModalWindowUser();
        // то переходимо до функції Підписки
        if (document.getElementsByClassName('buttonLabel')[1].innerText=='Подписаться') {
            window.document.getElementsByClassName("searchActions")[0].appendChild(node2).style.background='orange';
            console.log("433 subscribe(url,idph,_token) ### ВІКНО: IF ПІДПИСАТИСЬ ==> ORANGE/ADD!");
            // document.getElementsByClassName('user-flag large-avatar')[0].parentNode.style.background='orange';
            // document.getElementsByClassName('user-flag large-avatar')[1].innerText
            // document.getElementsByClassName('avatarPopOver')[0].style.display
            document.getElementsByClassName('user-flag large-avatar')[0].parentNode.style.background='orange';
            document.getElementsByClassName('avatarPopOver')[0].style.display='block';
            // elementT2[0].parentNode.style.display='none';
            console.log("434 subscribe(url,idph,_token) ### ВІКНО: IF ПІДПИСАТИСЬ ==> ORANGE/ADD!");
            console.log("435 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ПІДПИСАЛИСЬ");
            console.log("436 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ПІДПИСАЛИСЬ");
            console.log("437 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ПІДПИСАЛИСЬ");
            console.log("438 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ПІДПИСАЛИСЬ");
            console.log("439 subscribe(url,idph,_token) ### якшо НЕ ПІДПИСАНІ ТО ### ВІКНО: IF ПІДПИСАТИСЬ ==> ORANGE/ADD!");
            sleep(5000);
            // підписатись
            // ...
                // формуємо запит для надсилання на сервер з додаванням в друзі і/або підпискою на Юзера.
                // для уточнення коду/параметрів дивись орієнтовно на 75 рядок
                // https://rt.pornhub.com/user/hover?id="+localStorage.idph
                // РОЗКОМЕНТУВАТИ ДЛЯ РОБОТИ В ПРОДАКШН!!!
                sendRequest(idph);
            // видалити елемент, якщо вже на нього підписані
            // ...
            // document.getElementsByClassName('user-flag large-avatar')[0].parentNode.remove();
            console.log('447 subscribe(url,idph,_token) ### ТИПУ ПІДПИСАЛИСЬ')
            console.log('448 subscribe(url,idph,_token) ### ДЛЯ ПРОФІЛАКТИКИ: видаляємо попап deleteOldModalWindowUser() - START')
            deleteOldModalWindowUser();
            console.log('449 subscribe(url,idph,_token) ### ДЛЯ ПРОФІЛАКТИКИ: видаляємо попап deleteOldModalWindowUser() - END')
        };
    };
    console.log("420 subscribe(url,idph,_token) ### END");
};
// ########## END - ВИДАЛЕННЯ, ЯКЩО ПІДПИСАНИЙ. І ПІДПИСАННЯ ЯКЩО НОВИЙ.
/* ################################################################################################### */


/* ################################################################################################### */




// ------------------------------------------------------------------
/* ################################################################################################### */
// ########## START A
function startA(displayType){
    console.log('A - START');
    var elementUser = document.getElementsByClassName('user-flag large-avatar');
    var elementUserLength = elementUser.length;
    for (var a = 0; a < elementUserLength; a++) {
        // приховуємо елементи
        //var elementHide = document.getElementsByClassName('user-flag large-avatar');
        // elementHide[i].style.display='none';
        document.getElementsByClassName('user-flag large-avatar')[a].style.display=displayType;
    //console.log ('A - ДЛЯ User оброблено ', [a], ' із ', elementUserLength-1, '. Із значенням =', document.getElementsByClassName('user-flag large-avatar')[a].style.display);
    }
};
// ########## END A
// ----------
// ########## START B
function startB(displayType){
    console.log('B - START');
    var elementVerified = document.getElementsByClassName('user-flag large-avatar verified-user');
    var elementVerifiedLength = elementVerified.length;
    for (var b = 0; b < elementVerifiedLength; b++) {
        // відновлюємо елементи - verified
        // var elementShowV = document.getElementsByClassName('user-flag large-avatar verified-user');
        // elementShowV[i].style.display='block';
        // document.getElementsByClassName('user-flag large-avatar verified-user')[b].style.display='block';
        document.getElementsByClassName('verified-user')[b].style.display=displayType;
    //console.log ('B - ДЛЯ Verified оброблено ', [b], ' із ',elementVerifiedLength-1, '. Із значенням =',document.getElementsByClassName('verified-user')[b].style.display);
    };
};
// ########## END B
// ----------
// ########## START C
function startC(displayType){
    console.log('C - START');
    var elementPremium = document.getElementsByClassName('user-flag large-avatar premium-user');
    var elementPremiumLength = elementPremium.length;
    for (var c = 0; c < elementPremiumLength; c++) {
        // відновлюємо елементи - premium
        // var elementShowP = document.getElementsByClassName('user-flag large-avatar premium-user');
        // elementShowP[i].style.display='block';
        //document.getElementsByClassName('user-flag large-avatar premium-user')[c].style.display='block';
        document.getElementsByClassName('premium-user')[c].style.display=displayType;
        console.log ('C - ДЛЯ Premium оброблено ', [c], ' із ',elementPremiumLength-1, '. Із значенням =',document.getElementsByClassName('premium-user')[c].style.display);
    };
};
// ########## END C
/* ################################################################################################### */
// ########## START E
function startDE(){
    console.log('E - START');
    var elementDisplayBlockLength = Array.prototype.slice.call(document.getElementsByClassName("user-flag large-avatar")).filter(function(node) { return node.style.display == "block" }).length
    for (var e = 0; e < elementDisplayBlockLength+1; e++) {
        // УТОЧНЕННЯ: "elementDisplayBlockLength+1" необхідно для того, щоб видаляти ПОРОЖНІ "none" - після останнього "block", інакше вони висять "хвостом" і заважають. дана операція суто КОСМЕТИЧНА!
        // ця обгортка, необхідна для того, що коли видаляється елемент, то треба зміститись на наступний, щоб не видалити знову вже елемент з "block
        // НЕ ПЕРЕРОБЛЯТИ НА ІНШУ ЛОГІКУ, БО ЦЕ НАЙОПТИМАЛЬНІШЕ - І ВОНО ПРАЦЮЄ!
        // ########## START D
        // рахуємо кількість елементів які містять display="none"
        // see https://stackoverflow.com/questions/35959954/how-to-count-elements-length-by-name-only-not-display-none-using-javascript
     //console.log('D - START');
        var elementDisplayNoneLength = Array.prototype.slice.call(document.getElementsByClassName("user-flag large-avatar")).filter(function(node) { return node.style.display == "none" }).length
        // тут треба вважати, що нам треба перебрати ВСІ елементи, і тим у яких display="none" зробити .parentNode.remove(); це буде "elementDisplayNoneLength" разів з "elementUserLength" (42)
        /* ################################################################################################### */
        for (var d = 0; d < elementDisplayNoneLength; d++) {
            if (document.getElementsByClassName("user-flag large-avatar")[e].style.display == "none") {
                console.log ('D - DELETE DisplayNone', [d], ' із ', elementDisplayNoneLength-1);
                document.getElementsByClassName('user-flag large-avatar')[e].parentNode.remove();
            };
        };
        // ########## END D
    };
};
// ########## END E
/* ################################################################################################### */
// ########## START F
function startF(){
    console.log('F - START');
    var elementPremiumWhite = document.getElementsByClassName('hiddenModalBoxWidget')
    var elementPremiumWhiteLength = elementPremiumWhite.length
    for (var f = 0; f < elementPremiumWhiteLength; f++) {
        // знаходити і видаляти батьківські ЛІ з цієї вибірки.
        // це БІЛІ ПРЕМІУМ ЮЗЕРИ - вони не додаються, тому вони не потрібні.
        // <span class="userLink hiddenModalBoxWidget marked clearfix">
        if (elementPremiumWhite) {
            console.log ('F - DELETE PremiumWhite', [f], ' із ', elementPremiumWhiteLength-1);
            elementPremiumWhite[0].parentNode.parentNode.remove();
        } else {
            console.log ('F - NONE PremiumWhite');
        };
    };
};
// ########## END F
// ########## START G
function startG(){
    console.log('G - START');
    var elementWhite = window.document.querySelectorAll('div[data-disable-popover="1"]')
    var elementWhiteLength = elementWhite.length
    for (var g = 0; g < elementWhiteLength; g++) {
        // знаходити і видаляти батьківські ЛІ з цієї вибірки.
        // це БІЛІ ЮЗЕРИ - вони не додаються, тому вони не потрібні.
        // <span class="userLink hiddenModalBoxWidget marked clearfix">
        if (elementWhite) {
            console.log ('G - DELETE White', [g], ' із ', elementWhiteLength-1);
            elementWhite[0].parentNode.parentNode.remove();
        } else {
            console.log ('G - NONE PremiumWhite');
        };
    };
};
// ########## END G
// ########## START H
function startH(){
    console.log('H - START');
    var elementWhite = window.document.querySelectorAll('div[data-disable-popover="1"]')
    var elementWhiteLength = elementWhite.length
    for (var h = 0; h < elementWhiteLength; h++) {
        // знаходити і видаляти батьківські ЛІ з цієї вибірки.
        // це БІЛІ ЮЗЕРИ - вони не додаються, тому вони не потрібні.
        // <span class="userLink hiddenModalBoxWidget marked clearfix">
        if (elementWhite) {
            console.log ('H - DELETE White', [h], ' із ', elementWhiteLength-1);
            elementWhite[0].parentNode.parentNode.remove();
        } else {
            console.log ('H - NONE PremiumWhite');
        };
    };
};
// ########## END H
/* ################################################################################################### */
// ########## START R0
function startR0(){
  // ОПТИМІЗАЦІЯ ІНТЕРФЕЙСА - ЩОБ НЕ ЗАВАЖАЛО :)
  // видаляємо верхнє меню - яке постійно вискакує і заважає :(
  console.log('R0 - START - ОПТИМІЗАЦІЯ ІНТЕРФЕЙСА');
  document.querySelector('#headerMenuContainer').style.display='none';
  document.querySelector('#js-networkBar').style.display='none';
  // видаляємо підвал
  document.querySelector('.footerContentWrapper').style.display='none';
};
// ########## END R0
/* ################################################################################################### */
// ########## START R1
function startR1(){
  // ВДАЛА спроба видалити рекламу НАД підвалом :)
  //document.getElementsByClassName('ad-link')[0].parentNode.style.display='none';
  console.log('R1 - START');
  var elementSpamReklama1 = document.getElementsByClassName('ad-link')
  var elementSpamReklama1Length = elementSpamReklama1.length
  if (elementSpamReklama1Length == 0) {
    console.log ('R1 - NONE SpamReklama1');
    } else {
    // -----
        for (var r1 = 0; r1 < elementSpamReklama1Length; r1++) {
            console.log ('R1 - DELETE SpamReklama1',r1,'із ',elementSpamReklama1Length-1);
            elementSpamReklama1[r1].parentNode.style.display='none';
            }
    // -----
  };
};
console.log('R1 - END');
// ########## END R1
/* ################################################################################################### */
// ########## START R2
function startR2(){
  // ВДАЛА спроба видалити рекламу ПРАВОРУЧ від відео :)
  // document.getElementsByClassName('adLink')[0].parentNode.parentNode.style.display='none';
  console.log('R2 - START');
  var elementSpamReklama2 = document.getElementsByClassName('adLink')
  var elementSpamReklama2Length = elementSpamReklama2.length
  if (elementSpamReklama2Length == 0) {
    console.log ('R2 - NONE SpamReklama2');
    } else {
    // -----
        for (var r2 = 0; r2 < elementSpamReklama2Length; r2++) {
            console.log('R2 - r2=',r2,'<',elementSpamReklama2Length);
            console.log ('R2 - DELETE SpamReklama2',r2,'із',elementSpamReklama2Length-1);
            elementSpamReklama2[r2].parentNode.parentNode.style.display='none';
        }
    // -----
  };
};
// ########## END R2
/* ################################################################################################### */





/* ################################################################################################### */

// ########## START - запис параметрів в LS
/*
function lsPhDb(){
    console.log("### РОЗРОБКА");
if(localStorage.getItem('lsPHdbSubscribe_'+username) === "true"){
    console.log("### РОЗРОБКА - зчитати значення LS і видалити якщо true");
    //document.getElementsByClassName('user-flag large-avatar')[0].parentNode.remove();
    console.log("### РОЗРОБКА - після видалення змінити значення LS на true");
    localStorage.setItem('lsPHdbSubscribe_'+username, true);
}else{
    console.log("### РОЗРОБКА - записати значення в LS: ");

    console.log("### РОЗРОБКА - записати значення в LS: lsPHdbSubscribe");
    localStorage.setItem('lsPHdbSubscribe_'+username, true);
    console.log("### РОЗРОБКА - записати значення в LS: lsPHdbFrend");
    localStorage.setItem('lsPHdbFrend_'+username, 'na');
    console.log("### РОЗРОБКА - записати значення в LS: lsPHdbLang");
    localStorage.setItem('lsPHdbLang_'+username, 'ru');
};
*/
// ########## END - запис параметрів в LS
/* ################################################################################################### */








