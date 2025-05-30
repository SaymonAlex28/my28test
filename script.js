let isListening = false;
let recognition;

// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   const voices = speechSynthesis.getVoices();
//   const russianVoice = voices.find(voice => voice.lang === 'ru-RU');
//   if (russianVoice) utterance.voice = russianVoice;

//   utterance.pitch = 1;
//   utterance.rate = 0.95;
//   speechSynthesis.speak(utterance);
// }

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  // Найти мужской голос на русском (если доступен)
  const russianMaleVoice = voices.find(voice =>
    voice.lang === 'ru-RU' &&
    (voice.name.toLowerCase().includes("male") ||
      voice.name.toLowerCase().includes("иван") ||
      voice.name.toLowerCase().includes("alexey") ||
      voice.name.toLowerCase().includes("maksim") ||
      voice.name.toLowerCase().includes("mikhail") ||
      voice.name.toLowerCase().includes("google русский мужской"))
  );

  const fallbackRussian = voices.find(voice => voice.lang === 'ru-RU');

  utterance.voice = russianMaleVoice || fallbackRussian;

  utterance.pitch = 1;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
}


speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();
  console.log("Доступные голоса:", voices);
};

// Настройка распознавания речи
function initRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    document.getElementById('status').textContent = `Вы сказали: "${transcript}"`;

    const tempMatch = transcript.match(/установи температуру\s(\d+[.,]?\d*)/);

    if (transcript.includes("привет джарвис") && transcript.includes("как дела")) {
      speak("Отлично, жду ваших указаний.");
    } else if (transcript.includes("джарвис") && transcript.includes("выключи микрофон")) {
      speak("Окей, выключаю микрофон.");
      isListening = false;
      recognition.stop();
      document.getElementById('toggle-btn').textContent = "▶️ Включить микрофон";
      document.getElementById('status').textContent = "⏸️ Прослушка остановлена.";
    } else if (tempMatch) {
      let temp = tempMatch[1].replace(",", ".");
      temp = parseFloat(temp).toFixed(1);
      speak(`Температура установлена на ${temp} градусов.`);
      document.getElementById('status').textContent = `Установлена температура: ${temp} °C`;
    } else {
      speak("Извините, я не понял ваш запрос.");
    }
  };
  

  recognition.onerror = function (event) {
    console.error("Ошибка:", event.error);
    document.getElementById('status').textContent = `Ошибка: ${event.error}`;
  };

  recognition.onend = function () {
    if (isListening) {
      recognition.start();  // повторный запуск для постоянной прослушки
    }
  };
}

// Переключатель микрофона
document.getElementById('toggle-btn').addEventListener('click', function () {
  if (!isListening) {
    if (!recognition) initRecognition();

    isListening = true;
    recognition.start();
    document.getElementById('toggle-btn').textContent = "⏹️ Остановить микрофон";
    document.getElementById('status').textContent = "🎤 Джарвис слушает...";
  } else {
    isListening = false;
    recognition.stop();
    document.getElementById('toggle-btn').textContent = "▶️ Включить микрофон";
    document.getElementById('status').textContent = "⏸️ Прослушка остановлена.";
  }
});

// Загрузка голосов для speechSynthesis
speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};
