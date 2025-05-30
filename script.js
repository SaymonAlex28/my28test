let isListening = false;
let recognition;
let waitingForCommand = false;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const russianMaleVoice = voices.find(v => v.lang === 'ru-RU' && v.name.toLowerCase().includes('male' || 'иван')); // подбираем мужской
  if (russianMaleVoice) utterance.voice = russianMaleVoice;

  utterance.pitch = 1;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
}

// Инициализация
function initRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    console.log("Распознано:", transcript);
    document.getElementById('status').textContent = `Вы сказали: "${transcript}"`;

    if (!waitingForCommand) {
      if (transcript.includes("алиса")) {
        speak("Слушаю вас.");
        waitingForCommand = true;
        restartRecognition();
      } else {
        document.getElementById('status').textContent = `Ожидаю имя "Алиса"...`;
        restartRecognition();
      }
      return;
    }

    // === Основные команды ===
    const tempMatch = transcript.match(/установи(ть)? температуру\s?(\d+[.,]?\d*)/);
    if (tempMatch) {
      let temp = tempMatch[2].replace(",", ".");
      temp = parseFloat(temp).toFixed(1);
      speak(`Температура установлена на ${temp} градусов.`);
      document.getElementById('status').textContent = `Установлена температура: ${temp} °C`;
    } else if (transcript.includes("как дела")) {
      speak("Отлично, жду ваших указаний.");
    } else if (transcript.includes("выключи микрофон")) {
      speak("Окей, выключаю микрофон.");
      isListening = false;
      recognition.stop();
      document.getElementById('toggle-btn').textContent = "▶️ Включить Алису";
      document.getElementById('status').textContent = "⏸️ Прослушка остановлена.";
      return;
    } else {
      speak("Извините, я не поняла ваш запрос.");
    }

    waitingForCommand = false;
    restartRecognition(); // снова ждём слово "Джарвис"
  };

  recognition.onerror = function (event) {
    console.error("Ошибка:", event.error);
    document.getElementById('status').textContent = `Ошибка: ${event.error}`;
  };

  recognition.onend = function () {
    if (isListening) {
      recognition.start();
    }
  };
}

function restartRecognition() {
  recognition.stop();
  setTimeout(() => recognition.start(), 300);
}

// Кнопка включения
document.getElementById('toggle-btn').addEventListener('click', function () {
  if (!isListening) {
    if (!recognition) initRecognition();
    isListening = true;
    waitingForCommand = false;
    recognition.start();
    document.getElementById('toggle-btn').textContent = "⏹️ Остановить Алису";
    document.getElementById('status').textContent = "🎤 Скажите: Алиса...";
  } else {
    isListening = false;
    recognition.stop();
    document.getElementById('toggle-btn').textContent = "▶️ Включить Алису";
    document.getElementById('status').textContent = "⏸️ Прослушка остановлена.";
  }
});

// Подгрузка голосов
speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};
