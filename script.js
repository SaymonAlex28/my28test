function speak() {
  var text = document.getElementById('input').value;
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
// Проверяем поддержку API распознавания речи
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "ru-RU"; // Русский язык
recognition.continuous = false; // Одноразовое прослушивание
recognition.interimResults = false; // Только финальный результат

// Функция обработки распознанного текста
recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.trim().toLowerCase();
  console.log("Распознано:", command);

  if (command.includes("включить свет")) {
    turnOnLight();
  } else if (command.includes("выключить свет")) {
    turnOffLight();
  }
};

// Функция включения света
function turnOnLight() {
  document.body.style.backgroundColor = "yellow"; // Фон жёлтый
  document.body.style.color = "black"; // Текст чёрный
}

// Функция выключения света
function turnOffLight() {
  document.body.style.backgroundColor = "black"; // Фон чёрный
  document.body.style.color = "white"; // Текст белый
}

// Запуск прослушивания по нажатию на кнопку
document.getElementById("micButton").addEventListener("click", function () {
  recognition.start();
  console.log("Голосовое управление активировано...");
});
