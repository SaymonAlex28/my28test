function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const russianVoice = voices.find(voice => voice.lang === 'ru-RU');

  if (russianVoice) {
    utterance.voice = russianVoice;
  }

  utterance.pitch = 1;
  utterance.rate = 0.95;
  speechSynthesis.speak(utterance);
}

function startListening() {
  const status = document.getElementById('status');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.textContent = "Ваш браузер не поддерживает распознавание речи.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  status.textContent = "Слушаю...";

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    status.textContent = `Вы сказали: "${transcript}"`;

    if (transcript.includes("привет джарвис") && transcript.includes("как дела")) {
      speak("Отлично, жду ваших указаний.");
    } else {
      speak("Извините, я не понял ваш запрос.");
    }
  };

  recognition.onerror = function (event) {
    status.textContent = "Ошибка: " + event.error;
  };

  recognition.onend = function () {
    status.textContent += " (ожидание завершено)";
  };
}

// Чтобы голоса загрузились корректно
speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};
