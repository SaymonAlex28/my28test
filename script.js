function speak() {
  var text = document.getElementById('input').value;
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
// Проверяем поддержку браузером API распознавания речи
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "ru-RU"; // Устанавливаем язык на русский
recognition.continuous = true; // Постоянное прослушивание
recognition.interimResults = false; // Не показывать промежуточные результаты

// Функция, выполняемая при распознавании речи
recognition.onresult = function (event) {
  const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  console.log("Распознано:", command); // Вывод в консоль (можно убрать)

  if (command.includes("включить свет")) {
    turnOnLight();
  } else if (command.includes("выключить свет")) {
    turnOffLight();
  }
};

// Функция включения света
function turnOnLight() {
  document.body.style.backgroundColor = "yellow"; // Фон жёлтый
  document.body.style.color = "black"; // Текст чёрный для контраста
}

// Функция выключения света
function turnOffLight() {
  document.body.style.backgroundColor = "black"; // Фон чёрный
  document.body.style.color = "white"; // Текст белый для контраста
}

// Запуск распознавания речи
function startVoiceControl() {
  recognition.start();
  console.log("Голосовое управление включено...");
}

// Остановка прослушивания
function stopVoiceControl() {
  recognition.stop();
  console.log("Голосовое управление отключено...");
}

// Автоматический запуск голосового управления
startVoiceControl();

