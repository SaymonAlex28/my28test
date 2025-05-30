let isListening = false;
let recognition;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const russianVoice = voices.find(voice => voice.lang === 'ru-RU');
  if (russianVoice) utterance.voice = russianVoice;

  utterance.pitch = 1;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
}

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

    if (transcript.includes("привет джарвис") && transcript.includes("как дела")) {
      speak("Отлично, жду ваших указаний.");
    }else if(transcript.includes("джарвис") && transcript.includes("выключи микрофон")) {
      speak("Окей, выключаю микрофон.");
      isListening = false;
      recognition.stop();
    }else{
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
