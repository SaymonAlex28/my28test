// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMnrU_jFpVJBxPcejmDa2ZNQoXxU2zNu8",
  authDomain: "appartament-d6ab4.firebaseapp.com",
  databaseURL: "https://appartament-d6ab4-default-rtdb.firebaseio.com",
  projectId: "appartament-d6ab4",
  storageBucket: "appartament-d6ab4.appspot.com",
  messagingSenderId: "507797619199",
  appId: "1:507797619199:web:771f2eaa3a1650cb7127ca",
  measurementId: "G-VY3FVRKHEG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var setpoint = "25";
var hyst_now = "0.1";
let utterance = null;
var sound_voice = true;
var tick_sound = true;

const container = document.querySelector('.progress');
container.addEventListener("click", () => {
  closeNav();
});

function openNav() {
  document.getElementById("mySidenav")
    .style.width = "250px";
  document.getElementById('set_now').value = `${setpoint}`;
  document.getElementById('set_hyst').value = `${hyst_now}`;
}
function closeNav() {
  document.getElementById("mySidenav")
    .style.width = "0";
}

var counterInput = document.getElementById('set_now');

// Функция для увеличения значения на 0.5
function increment() {
  var currentValue = parseFloat(counterInput.value);
  if (currentValue < 30) { // Устанавливаем максимальное значение (например, 10)
    counterInput.value = (currentValue + 0.2).toFixed(1);
  }
}

// Функция для уменьшения значения на 0.5
function decrement() {
  var currentValue = parseFloat(counterInput.value);
  if (currentValue >= 0.2) {
    counterInput.value = (currentValue - 0.2).toFixed(1);
  }
}

var counterHyst = document.getElementById('set_hyst');

// Функция для увеличения значения на 0.1
function incr_hyst() {
  var currentValue = parseFloat(counterHyst.value);
  if (currentValue < 3) { // Устанавливаем максимальное значение (например, 10)
    counterHyst.value = (currentValue + 0.1).toFixed(1);
  }
}

// Функция для уменьшения значения на 0.1
function decr_hyst() {
  var currentValue = parseFloat(counterHyst.value);
  if (currentValue >= 0.1) {
    counterHyst.value = (currentValue - 0.1).toFixed(1);
  }
}

// Функция для клика при нажатии на чекбокс и кнопки
const checkboxes = document.querySelectorAll('.checkboxGreen');
const but_setpoint = document.querySelectorAll('.but_setpoint');
const menu_top_but = document.querySelector('.menu_top_but');
const closebtn = document.querySelector('.closebtn');
const set_but = document.querySelectorAll('.set_but');
const snow_animation = document.querySelector('.snow_animation');
const sound_pictures = document.querySelectorAll('.sound_picture');
const clickSound = document.getElementById('clickSound');
const clickButton = document.getElementById('clickButton');
const mic_but = document.getElementById('mic_icon');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (tick_sound == true) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
  });
});
but_setpoint.forEach(button => {
  button.addEventListener('click', () => {
    if (tick_sound == true) {
      clickSound.currentTime = 0;
      clickButton.play();
    }
  });
});
menu_top_but.addEventListener('click', () => {
  if (tick_sound == true) {
    clickSound.currentTime = 0;
    clickButton.play();
  }
  });
closebtn.addEventListener('click', () => {
  if (tick_sound == true) {
    clickSound.currentTime = 0;
    clickButton.play();
  }
});
set_but.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    if (tick_sound == true) {
      clickSound.currentTime = 0;
      clickButton.play();
    }
  });
});
snow_animation.addEventListener('click', () => {
  if (tick_sound == true) {
    clickSound.currentTime = 0;
    clickButton.play();
  }
});
sound_pictures.forEach(button => {
  button.addEventListener('click', () => {
    if (tick_sound == true) {
      clickSound.currentTime = 0;
      clickButton.play();
    }
  });
});
mic_but.addEventListener('click', () => {
  if (tick_sound == true) {
    clickSound.currentTime = 0;
    clickButton.play();
  }
});


$(document).ready(function () {
  let database = firebase.database();
  let Leavingroomlamp;
  let Leavroomlampstat;
  let Leavingroomsecur;
  let Leavroomsecurstat;

  let Bedroomlamp;
  let Bedroomlampstat;
  let Bedroomsecur;
  let Bedroomsecurstat;

  let Kitchenlamp;
  let Kitchenlampstat;
  let Kitchensecur;
  let Kitchensecurstat;

  let HeaterSetpoint;
  let Hysteresis;
  let Boiler_status;

  let Dev_temp;
  let Living_temp;
  let Bedroom_temp;
  let Kitchen_temp;

  database.ref().on("value", function (snap) {
    Leavingroomlamp = snap.val().Leavingroomlamp;
    Leavroomlampstat = snap.val().Leavroomlampstat;
    Leavingroomsecur = snap.val().Leavingroomsecur;
    Leavroomsecurstat = snap.val().Leavroomsecurstat;

    Bedroomlamp = snap.val().Bedroomlamp;
    Bedroomlampstat = snap.val().Bedroomlampstat;
    Bedroomsecur = snap.val().Bedroomsecur;
    Bedroomsecurstat = snap.val().Bedroomsecurstat;

    Kitchenlamp = snap.val().Kitchenlamp;
    Kitchenlampstat = snap.val().Kitchenlampstat;
    Kitchensecur = snap.val().Kitchensecur;
    Kitchensecurstat = snap.val().Kitchensecurstat;

    HeaterSetpoint = snap.val().HeaterSetpoint;
    setpoint = HeaterSetpoint;
    Hysteresis = snap.val().Hysteresis;
    hyst_now = Hysteresis;

    Dev_temp = snap.val().Dev_temp;
    Living_temp = snap.val().Living_temp;
    Bedroom_temp = snap.val().Bedroom_temp;
    Kitchen_temp = snap.val().Kitchen_temp;

    Boiler_status = snap.val().Boiler_status;

    if (Leavingroomlamp == "1") {
      document.getElementById('relay1').checked = 1;
    } else {
      document.getElementById('relay1').checked = 0;
    }
    if (Leavroomlampstat == "1") {
      document.getElementById("lamp_leavroom").classList.remove('lamp_off');
      document.getElementById("lamp_leavroom").classList.add('lamp_on');
    } else {
      document.getElementById("lamp_leavroom").classList.remove('lamp_on');
      document.getElementById("lamp_leavroom").classList.add('lamp_off');
    }
    if (Leavingroomsecur == "1") {
      document.getElementById('secur1').checked = 1;
    } else {
      document.getElementById('secur1').checked = 0;
    }
    if (Leavroomsecurstat == "1") {
      document.getElementById('now_secur1').checked = 1;
    } else {
      document.getElementById('now_secur1').checked = 0;
    }

    if (Bedroomlamp == "1") {
      document.getElementById('relay2').checked = 1;
    } else {
      document.getElementById('relay2').checked = 0;
    }
    if (Bedroomlampstat == "1") {
      document.getElementById("lamp_bedroom").classList.remove('lamp_off');
      document.getElementById("lamp_bedroom").classList.add('lamp_on');
    } else {
      document.getElementById("lamp_bedroom").classList.remove('lamp_on');
      document.getElementById("lamp_bedroom").classList.add('lamp_off');
    }
    if (Bedroomsecur == "1") {
      document.getElementById('secur2').checked = 1;
    } else {
      document.getElementById('secur2').checked = 0;
    }
    if (Bedroomsecurstat == "1") {
      document.getElementById('now_secur2').checked = 1;
    } else {
      document.getElementById('now_secur2').checked = 0;
    }

    if (Kitchenlamp == "1") {
      document.getElementById('relay3').checked = 1;
    } else {
      document.getElementById('relay3').checked = 0;
    }
    if (Kitchenlampstat == "1") {
      document.getElementById("lamp_kitchen").classList.remove('lamp_off');
      document.getElementById("lamp_kitchen").classList.add('lamp_on');
    } else {
      document.getElementById("lamp_kitchen").classList.remove('lamp_on');
      document.getElementById("lamp_kitchen").classList.add('lamp_off');
    }
    if (Kitchensecur == "1") {
      document.getElementById('secur3').checked = 1;
    } else {
      document.getElementById('secur3').checked = 0;
    }
    if (Kitchensecurstat == "1") {
      document.getElementById('now_secur3').checked = 1;
    } else {
      document.getElementById('now_secur3').checked = 0;
    }

    if (Dev_temp == "1") {
      document.getElementById('dev_temp').checked = 1;
    } else {
      document.getElementById('dev_temp').checked = 0;
    }
    if (Living_temp == "1") {
      document.getElementById('living_temp').checked = 1;
    } else {
      document.getElementById('living_temp').checked = 0;
    }
    if (Bedroom_temp == "1") {
      document.getElementById('bedroom_temp').checked = 1;
    } else {
      document.getElementById('bedroom_temp').checked = 0;
    }
    if (Kitchen_temp == "1") {
      document.getElementById('kitchen_temp').checked = 1;
    } else {
      document.getElementById('kitchen_temp').checked = 0;
    }
    if (Boiler_status == "1") {
      document.getElementById("boiler_stat").textContent = ('Идет Нагрев');
    } else {
      document.getElementById("boiler_stat").textContent = ('Остановлен');
    }
  });


  $("#relay1").click(function () {
    let firebaseRef = firebase.database().ref().child("Leavingroomlamp");
    if (Leavingroomlamp == "1") {
      firebaseRef.set("0");
      Leavingroomlamp = "0";
      if (sound_voice == true) {
      const textoff = "Лампа в спальне выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Leavingroomlamp = "1";
      if (sound_voice == true) {
      const texton = "Лампа в спальне включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })
  $("#secur1").click(function () {
    let firebaseRef = firebase.database().ref().child("Leavingroomsecur");
    if (Leavingroomsecur == "1") {
      firebaseRef.set("0");
      Leavingroomsecur = "0";
      if (sound_voice == true) {
      const textoff = "Охрана в спальне, выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Leavingroomsecur = "1";
      if (sound_voice == true) {
      const texton = "Охрана в спальне, включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  $("#relay2").click(function () {
    let firebaseRef = firebase.database().ref().child("Bedroomlamp");
    if (Bedroomlamp == "1") {
      firebaseRef.set("0");
      Bedroomlamp = "0";
      if (sound_voice == true) {
      const textoff = "Лампа у Насти, выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Bedroomlamp = "1";
      if (sound_voice == true) {
      const texton = "Лампа у Насти, включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })
  $("#secur2").click(function () {
    let firebaseRef = firebase.database().ref().child("Bedroomsecur");
    if (Bedroomsecur == "1") {
      firebaseRef.set("0");
      Bedroomsecur = "0";
      if (sound_voice == true) {
      const textoff = "Охрана у Насти, выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Bedroomsecur = "1";
      if (sound_voice == true) {
      const texton = "Охрана у Насти, включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  $("#relay3").click(function () {
    let firebaseRef = firebase.database().ref().child("Kitchenlamp");
    if (Kitchenlamp == "1") {
      firebaseRef.set("0");
      Kitchenlamp = "0";
      if (sound_voice == true) {
      const textoff = "Лампа на кухне, выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Kitchenlamp = "1";
      if (sound_voice == true) {
      const texton = "Лампа на кухне, включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })
  $("#secur3").click(function () {
    let firebaseRef = firebase.database().ref().child("Kitchensecur");
    if (Kitchensecur == "1") {
      firebaseRef.set("0");
      Kitchensecur = "0";
      if (sound_voice == true) {
      const textoff = "Охрана на кухне, выключена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(textoff);
      speechSynthesis.speak(utterance);
      }
    } else {
      firebaseRef.set("1");
      Kitchensecur = "1";
      if (sound_voice == true) {
      const texton = "Охрана на кухне, включена";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  // установка температуры
  $("#save_but").click(function () {
    const set_value = document.getElementById("set_now").value;
    let firebaseRef = firebase.database().ref().child("HeaterSetpoint");
    firebaseRef.set(set_value)
      .then(() => {
        showInfoMessage("Настройки сохранены успешно");
        if (sound_voice == true) {
        const texton = "Установка температуры, сохранена успешно";
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(texton);
        speechSynthesis.speak(utterance);
        }
      })
      .catch((error) => {
        showInfoMessage("Ошибка при сохранении" + error, true);
      });
    function showInfoMessage(message, isError = false) {
      const infoContainer = document.getElementById("infoContainer");
      infoContainer.innerHTML = message;

      if (isError) {
        infoContainer.style.backgroundColor = "red";
      } else {
        infoContainer.style.backgroundColor = "#4CAF50";
      }
      infoContainer.style.display = "block";

      setTimeout(() => {
        infoContainer.style.display = "none";
      }, 3000); // Скрыть информер через 3 секунды
    }
  })

  // Гистерезис
  $("#save_hyst").click(function () {
    const set_hyst = document.getElementById("set_hyst").value;
    let firebaseRef = firebase.database().ref().child("Hysteresis");
    firebaseRef.set(set_hyst)
      .then(() => {
        showInfoMessage("Настройки сохранены успешно");
        if (sound_voice == true) {
        const texton = "Установка гистерезиса, сохранена успешно";
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(texton);
        speechSynthesis.speak(utterance);
        }
      })
      .catch((error) => {
        showInfoMessage("Ошибка при сохранении" + error, true);
      });
    function showInfoMessage(message, isError = false) {
      const infoContainer = document.getElementById("infoContainer");
      infoContainer.innerHTML = message;

      if (isError) {
        infoContainer.style.backgroundColor = "red";
      } else {
        infoContainer.style.backgroundColor = "#4CAF50";
      }
      infoContainer.style.display = "block";

      setTimeout(() => {
        infoContainer.style.display = "none";
      }, 3000); // Скрыть информер через 3 секунды
    }
  });

  $("#dev_temp").click(function () {
    let firebaseRef1 = firebase.database().ref().child("Dev_temp");
    let firebaseRef2 = firebase.database().ref().child("Living_temp");
    let firebaseRef3 = firebase.database().ref().child("Bedroom_temp");
    let firebaseRef4 = firebase.database().ref().child("Kitchen_temp");
    if (Dev_temp == "1") {
      firebaseRef1.set("0");
      Dev_temp = "0";
    } else {
      firebaseRef1.set("1");
      Dev_temp = "1";
      firebaseRef2.set("0");
      Living_temp = "0";
      firebaseRef3.set("0");
      Bedroom_temp = "0";
      firebaseRef4.set("0");
      Kitchen_temp = "0";
      if (sound_voice == true) {
      const texton = "Выбрано управление, средней температурой";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  $("#living_temp").click(function () {
    let firebaseRef1 = firebase.database().ref().child("Dev_temp");
    let firebaseRef2 = firebase.database().ref().child("Living_temp");
    let firebaseRef3 = firebase.database().ref().child("Bedroom_temp");
    let firebaseRef4 = firebase.database().ref().child("Kitchen_temp");
    if (Living_temp == "1") {
      firebaseRef2.set("0");
      Living_temp = "0";
    } else {
      firebaseRef2.set("1");
      Living_temp = "1";
      firebaseRef1.set("0");
      Dev_temp = "0";
      firebaseRef3.set("0");
      Bedroom_temp = "0";
      firebaseRef4.set("0");
      Kitchen_temp = "0";
      if (sound_voice == true) {
      const texton = "Выбран датчик, температуры в спальне";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  $("#bedroom_temp").click(function () {
    let firebaseRef1 = firebase.database().ref().child("Dev_temp");
    let firebaseRef2 = firebase.database().ref().child("Living_temp");
    let firebaseRef3 = firebase.database().ref().child("Bedroom_temp");
    let firebaseRef4 = firebase.database().ref().child("Kitchen_temp");
    if (Bedroom_temp == "1") {
      firebaseRef3.set("0");
      Bedroom_temp = "0";
    } else {
      firebaseRef3.set("1");
      Bedroom_temp = "1";
      firebaseRef1.set("0");
      Dev_temp = "0";
      firebaseRef2.set("0");
      Living_temp = "0";
      firebaseRef4.set("0");
      Kitchen_temp = "0";
      if (sound_voice == true) {
      const texton = "Выбран датчик, температуры у Насти";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })

  $("#kitchen_temp").click(function () {
    let firebaseRef1 = firebase.database().ref().child("Dev_temp");
    let firebaseRef2 = firebase.database().ref().child("Living_temp");
    let firebaseRef3 = firebase.database().ref().child("Bedroom_temp");
    let firebaseRef4 = firebase.database().ref().child("Kitchen_temp");
    if (Kitchen_temp == "1") {
      firebaseRef4.set("0");
      Kitchen_temp = "0";
    } else {
      firebaseRef4.set("1");
      Kitchen_temp = "1";
      firebaseRef1.set("0");
      Dev_temp = "0";
      firebaseRef2.set("0");
      Living_temp = "0";
      firebaseRef3.set("0");
      Bedroom_temp = "0";
      if (sound_voice == true) {
      const texton = ">>Выбран датчик, температуры на кухне";
      speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(texton);
      speechSynthesis.speak(utterance);
      }
    }
  })
});

let datacheck = firebase.database();
let Leavingroom_temp;
let Bedroom_temp;
let Kitchen_temp;
let Outside_temp;
let Deviation_temp;
datacheck.ref().on("value", function (snap) {
  Leavingroom_temp = snap.val().Templeavingroom;
  Bedroom_temp = snap.val().Tempbedroom;
  Kitchen_temp = snap.val().Tempkitchen;
  Outside_temp = snap.val().Outside_temp;
  Deviation_temp = snap.val().Deviation_temp;
  document.getElementById("tempC_1").innerHTML = `${Leavingroom_temp}`;
  document.getElementById("tempC_2").innerHTML = `${Bedroom_temp}`;
  document.getElementById("tempC_3").innerHTML = `${Kitchen_temp}`;
  document.getElementById("outside_temp").innerHTML = `${Outside_temp}`;
  document.getElementById("devhome_temp").innerHTML = `${Deviation_temp}`;

});

let wifilevels = firebase.database();
let wifi_boiler;
let wifi_leavingroom;
let wifi_bedroom;
let wifi_kitchen;
wifilevels.ref().on("value", function (snap) {
  wifi_boiler = snap.val().WifiBoiler;
  wifi_leavingroom = snap.val().WifiLeavingroom;
  wifi_bedroom = snap.val().WifiBedroom;
  wifi_kitchen = snap.val().WifiKitchen;
  document.getElementById("wifi_boiler").innerHTML = `${wifi_boiler}`;
  document.getElementById("wifi_leavingroom").innerHTML = `${wifi_leavingroom}`;
  document.getElementById("wifi_bedroom").innerHTML = `${wifi_bedroom}`;
  document.getElementById("wifi_kitchen").innerHTML = `${wifi_kitchen}`;
});



// Озвучка температуры
const talk_heart = document.getElementById("heart");
talk_heart.addEventListener("click", () => {
  if (sound_voice == true) {
    const text = "Привет! Люблю Тебя, Кошечка моя";
    speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
});

const talk_templeavroom = document.querySelector("#tempC_1");
talk_templeavroom.addEventListener("click", () => {
  if (sound_voice == true) {
  const text = " Температура в спальне, " + Leavingroom_temp + " градусов";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  }
});

const talk_tempbedroom = document.querySelector("#tempC_2");
talk_tempbedroom.addEventListener("click", () => {
  if (sound_voice == true) {
  const text = " температура у Насти," + Bedroom_temp + "градусов";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  }
});

const talk_tempkitchen = document.querySelector("#tempC_3");
talk_tempkitchen.addEventListener("click", () => {
  if (sound_voice == true) {
  const text = " температура в Гостинной," + Kitchen_temp + "градусов";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  }
});

const talk_outside = document.querySelector("#outside_temp");
talk_outside.addEventListener("click", () => {
  if (sound_voice == true) {
  const text = " температура на улице," + Outside_temp + "градусов";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  }
});

const talk_tempdev = document.querySelector("#devhome_temp");
talk_tempdev.addEventListener("click", () => {
  if (sound_voice == true) {
  const text = " средняя температура в доме," + Deviation_temp + "градусов";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  }
});

const full_screen = document.querySelector('.progress');
full_screen.addEventListener('dblclick', () => {
  if (document.documentElement.requestFullscreen) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Errror ${err}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
});

function response_dt() {
  let dt = new Date();
  let request = new XMLHttpRequest();
  document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  document.getElementById("date").innerHTML = dt.toLocaleDateString();
}
setInterval(response_dt, 500);



const numberOfSnowflakes = 80;

for (let i = 0; i < numberOfSnowflakes; i++) {
  createSnowflake();
}

function createSnowflake() {
  const snowflake = document.createElement('img');
  snowflake.src = 'snowflake.png';
  snowflake.className = 'snowflake';
  document.querySelector('.snowflakes').appendChild(snowflake);

  const size = Math.random() * 15 + 14 + 'px';
  snowflake.style.width = size;
  snowflake.style.height = size;

  const animationDuration = Math.random() * 12 + 11 + 's';
  snowflake.style.animationDuration = animationDuration;

  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.opacity = Math.random();

  snowflake.style.animationName = 'falling';
  snowflake.style.animationTimingFunction = 'linear';
  snowflake.style.animationIterationCount = 'infinite';

  // Добавляем стили через создание нового style элемента
  const keyframes = `@keyframes falling {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        50% {
            transform: translateY(100vh) translateX(${Math.random() > 0.9 ? '-' : ''}${Math.random() * 50}px) rotate(360deg);
        }
        100% {
            transform: translateY(100vh) translateX(${Math.random() > 0.9 ? '-' : ''}${Math.random() * 100}px) rotate(360deg);
        }
    }`;

  const style = document.createElement('style');
  style.appendChild(document.createTextNode(keyframes));
  document.head.appendChild(style);

  snowflake.style.animationDuration = animationDuration;
}

(async () => {
  let snow = document.getElementById('snow_animate');
  let anim_snow = document.getElementById('anim_icon');
  if (localStorage.getItem('theme') == "true") {
    snow.classList.remove('nosnowflakes');
    snow.classList.add('snowflakes');
    anim_snow.classList.remove('snow_picture');
    anim_snow.classList.add('animsnow_picture');
  } else {
    snow.classList.remove('snowflakes');
    snow.classList.add('nosnowflakes');
    anim_snow.classList.remove('animsnow_picture');
    anim_snow.classList.add('snow_picture');
  }
})();

function togglesnow() {
  let snow = document.getElementById('snow_animate');
  let anim_snow = document.getElementById('anim_icon');
  if (snow.classList.contains('snowflakes')) {
    localStorage.setItem('theme', false);
    snow.classList.remove('snowflakes');
    snow.classList.add('nosnowflakes');
    anim_snow.classList.remove('animsnow_picture');
    anim_snow.classList.add('snow_picture');
    if (sound_voice == true) {
    const text = "Анимация снежинок выключена";
    speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    }
  } else {
    localStorage.setItem('theme', true);
    snow.classList.remove('nosnowflakes');
    snow.classList.add('snowflakes');
    anim_snow.classList.remove('snow_picture');
    anim_snow.classList.add('animsnow_picture');
    if (sound_voice == true) {
    const text = "Анимация снежинок включена";
    speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    }
  }
};

// Управление с помощью микрофона
let isListening = false;
let recognition;
let waitingForCommand = false;

// Асинхронная функция для озвучивания
async function speak(text) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();
    const russianMaleVoice = voices.find(v =>
      v.lang === 'ru-RU' && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('иван'))
    );
    if (russianMaleVoice) utterance.voice = russianMaleVoice;

    utterance.pitch = 1;
    utterance.rate = 0.95;
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}

// === Основные команды ===
const voiceCommands = [
  {
    match: (text) => /(установи(ть)?|поставь|задай|измени|поставить)\s+(температуру\s*)?(\d+[.,]?\d*)/.test(text),
    action: async (text) => {
      const match = text.match(/(установи(ть)?|поставь|задай|измени|поставить)\s+(температуру\s*)?(\d+[.,]?\d*)/);
      if (!match) return;

      let temp = match[4].replace(",", ".");
      temp = parseFloat(temp);

      // === 🔒 Ограничения температуры ===
      if (temp < 18) {
        await speak("Температура не может быть ниже 18 градусов.");
        return;
      }

      if (temp > 30) {
        await speak("Температура не может быть выше 30 градусов.");
        return;
      }

      const roundedTemp = temp.toFixed(1);
      firebase.database().ref().child("HeaterSetpoint").set(roundedTemp);
      await speak(`Температура установлена на ${roundedTemp} градусов.`);
    }
    
  },
  {
    match: (text) => text.includes("как дела"),
    action: async () => {
      await speak("Отлично, жду ваших указаний.");
    }
  },
  {
    match: (text) => text.includes("включи лампу в спальне"),
    action: async () => {
      firebase.database().ref().child("Leavingroomlamp").set("1");
      await speak("Окей, включаю.");
    }
  },
  {
    match: (text) => text.includes("выключи лампу в спальне"),
    action: async () => {
      firebase.database().ref().child("Leavingroomlamp").set("0");
      await speak("Окей, выключаю.");
    }
  },
  {
    match: (text) => text.includes("включи гирлянду"),
    action: async () => {
      firebase.database().ref().child("Bedroomlamp").set("0");
      await speak("Окей, включаю.");
    }
  },
  {
    match: (text) => text.includes("выключи гирлянду"),
    action: async () => {
      firebase.database().ref().child("Bedroomlamp").set("1");
      await speak("Окей, выключаю.");
    }
  },
  {
    match: (text) => text.includes("выключи микрофон"),
    action: async () => {
      await speak("Окей, выключаю микрофон.");
      isListening = false;
      recognition.stop();
      mic_State = "off";
      localStorage.setItem("mic_State", mic_State);
      togglemic(mic_State);
    }
  }
];

// Инициализация распознавания речи
function initRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();

    if (!waitingForCommand) {
      if (transcript.includes("алиса")) {
        await speak("Слушаю вас.");
        waitingForCommand = true;
        restartRecognition();
      } else {
        restartRecognition();
      }
      return;
    }

    let handled = false;
    for (const command of voiceCommands) {
      if (command.match(transcript)) {
        await command.action(transcript);
        handled = true;
        break;
      }
    }

    if (!handled) {
      await speak("Извините, я не поняла ваш запрос.");
    }

    waitingForCommand = false;
    restartRecognition();
  };

  recognition.onend = function () {
    if (isListening) {
      recognition.start();
    }
  };
}

// Перезапуск распознавания
function restartRecognition() {
  recognition.onend = () => recognition.start();
  recognition.stop();
}

// Кнопка управления
const mic_icon = document.getElementById('mic_icon');
function togglemic(state) {
  if (state === "on") {
    mic_icon.src = "mic_on.png"; // Путь к включённой иконке
    if (!recognition) initRecognition();
    isListening = true;
    waitingForCommand = false;
    recognition.start();
  } else {
    mic_icon.src = "mic_off.png"; // Путь к выключенной иконке
    isListening = false;
    // recognition.stop();
  }
};

let mic_State = localStorage.getItem("mic_State") || "off";
togglemic(mic_State);

mic_icon.addEventListener("click", () => {
  mic_State = mic_State === "off" ? "on" : "off";
  localStorage.setItem("mic_State", mic_State);
  togglemic(mic_State);

  if (mic_State === "on") {
    if (sound_voice == true) {
  const text = "Управление с микрофона включено";
  speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
    }
  } else {
    if (sound_voice == true) {
    const text = "Управление с микрофона выключено";
    speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    }
  }
});

// Управление звуковым сопровождением
const sound_icon = document.getElementById('sound_icon');

function togglesound(state) {
  if (state === "on") {
    sound_icon.src = "Sound_on.png"; // Путь к включённой иконке
    sound_voice = true;
  } else {
    sound_icon.src = "Sound_off.png"; // Путь к выключенной иконке
    sound_voice = false;
  }
};

let sound_State = localStorage.getItem("sound_State") || "off";
togglesound(sound_State);

sound_icon.addEventListener("click", () => {
  sound_State = sound_State === "off" ? "on" : "off";
  localStorage.setItem("sound_State", sound_State);
  togglesound(sound_State);

  if (sound_State === "on") {
    const text = "Голосовое сопровождение, включено";
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
});

// Управление звуками при нажатии
const ticksnd_icon = document.getElementById('tick_icon');
function toggleticksound(state) {
  if (state === "on") {
    ticksnd_icon.src = "Sound_on.png"; // Путь к включённой иконке
    tick_sound = true;
  } else {
    ticksnd_icon.src = "Sound_off.png"; // Путь к выключенной иконке
    tick_sound = false;
  }
};

let tick_State = localStorage.getItem("tick_State") || "off";
toggleticksound(tick_State);

ticksnd_icon.addEventListener("click", () => {
  tick_State = tick_State === "off" ? "on" : "off";
  localStorage.setItem("tick_State", tick_State);
  toggleticksound(tick_State);

  if (tick_State === "on") {
    const text = "Звуки при нажатии, включены";
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
});

var units_status = firebase.database();
var stat_boiler;
var prev_statboiler;
var stat_leavingroom;
var prev_statleavingroom;
var stat_bedroom;
var prev_statbedroom;
var stat_kitchen;
var prev_statkitchen;
units_status.ref().on("value", function (snap) {
  stat_boiler = snap.val().StatusBoiler;
  stat_leavingroom = snap.val().StatusLeavingroom;
  stat_bedroom = snap.val().StatusBedroom;
  stat_kitchen = snap.val().StatusKitchen;
});

function status_device() {
  let boiler = document.getElementById('status_boiler');
  let leavingroom = document.getElementById('status_leavingroom');
  let bedroom = document.getElementById('status_bedroom');
  let kitchen = document.getElementById('status_kitchen');
  if (stat_boiler == prev_statboiler) {
    boiler.classList.remove('online_text');
    boiler.classList.add('main_text');
    prev_statboiler = stat_boiler;
  } else {
    boiler.classList.remove('main_text');
    boiler.classList.add('online_text');
    prev_statboiler = stat_boiler;
  }
  if (stat_leavingroom == prev_statleavingroom) {
    leavingroom.classList.remove('online_text');
    leavingroom.classList.add('main_text');
    prev_statleavingroom = stat_leavingroom;
  } else {
    leavingroom.classList.remove('main_text');
    leavingroom.classList.add('online_text');
    prev_statleavingroom = stat_leavingroom;
  }
  if (stat_bedroom == prev_statbedroom) {
    bedroom.classList.remove('online_text');
    bedroom.classList.add('main_text');
    prev_statbedroom = stat_bedroom;
  } else {
    bedroom.classList.remove('main_text');
    bedroom.classList.add('online_text');
    prev_statbedroom = stat_bedroom;
  }
  if (stat_kitchen == prev_statkitchen) {
    kitchen.classList.remove('online_text');
    kitchen.classList.add('main_text');
    prev_statkitchen = stat_kitchen;
  } else {
    kitchen.classList.remove('main_text');
    kitchen.classList.add('online_text');
    prev_statkitchen = stat_kitchen;
  }
}
setInterval(status_device, 6000);
