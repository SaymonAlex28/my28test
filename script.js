<button id="toggle-btn">▶️ Включить Алису</button>
<div id="status">⏸️ Прослушка остановлена.</div>

<script>
let isListening = false;
let recognition;
let waitingForCommand = false;
let voicesLoaded = false;

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

// Загрузка голосов
function loadVoices() {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      voicesLoaded = true;
      resolve();
    } else {
      speechSynthesis.onvoiceschanged = () => {
        voicesLoaded = true;
        resolve();
      };
    }
  });
}

// Инициализация распознавания речи
function initRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    console.log("Распознано:", transcript);
    document.getElementById('status').textContent = `Вы сказали: "${transcript}"`;

    if (!waitingForCommand) {
      if (transcript.includes("алиса")) {
        await speak("Слушаю вас.");
        waitingForCommand = true;
        restartRecognition();
      } else {
        document.getElementById('status').textContent = `Ожидаю имя "Алиса"...`;
        restartRecognition();
      }
      return;
    }

    // === Основные команды ===
    const tempMatch = transcript.match(/(установи(ть)?|поставь|задай|измени|поставить)\s+(температуру\s*)?(\d+[.,]?\d*)/);
    if (tempMatch) {
      let temp = tempMatch[4] || tempMatch[3];
      temp = temp.replace(",", ".");
      temp = parseFloat(temp).toFixed(1);
      await speak(`Температура установлена на ${temp} градусов.`);
      document.getElementById('status').textContent = `Установлена температура: ${temp} °C`;
    } else if (transcript.includes("как дела")) {
      await speak("Отлично, жду ваших указаний.");
    } else if (transcript.includes("выключи микрофон")) {
      await speak("Окей, выключаю микрофон.");
      isListening = false;
      recognition.stop();
      document.getElementById('toggle-btn').textContent = "▶️ Включить Алису";
      document.getElementById('status').textContent = "⏸️ Прослушка остановлена.";
      return;
    } else {
      await speak("Извините, я не поняла ваш запрос.");
    }

    waitingForCommand = false;
    restartRecognition();
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

// Перезапуск распознавания
function restartRecognition() {
  recognition.stop();
  setTimeout(() => recognition.start(), 300);
}

// Кнопка управления
document.getElementById('toggle-btn').addEventListener('click', async function () {
  if (!voicesLoaded) await loadVoices();

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
</script>
