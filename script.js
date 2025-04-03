if (!('webkitSpeechRecognition' in window)) {
  alert("Ваш браузер не поддерживает распознавание речи. Попробуйте Google Chrome.");
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const button = document.getElementById('startRecognition');
  const output = document.getElementById('output');

  button.addEventListener('click', () => {
    try {
      recognition.start();
      output.textContent = "Говорите, микрофон активирован...";
    } catch (err) {
      console.error("Ошибка запуска распознавания:", err);
      output.textContent = "Ошибка запуска распознавания.";
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Вы сказали: ${transcript}`;

    if (transcript.includes('изменить цвет')) {
      changeBackgroundColor();
    } else {
      output.textContent += `\nКоманда не распознана. Попробуйте снова.`;
    }
  };

  recognition.onerror = (event) => {
    console.error("Ошибка распознавания речи:", event.error);
    alert("Ошибка распознавания речи: " + event.error);
    output.textContent = "Произошла ошибка распознавания.";
  };

  recognition.onend = () => {
    output.textContent += "\nРаспознавание завершено.";
  };

  function changeBackgroundColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
    alert("Цвет фона изменён!");
  }
}