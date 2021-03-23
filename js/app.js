function main() {
  const textArea = document.querySelector('.quotes-container textarea');
  const startTimerBtn = document.querySelector(
    '.quotes-container .start-timer-btn'
  );
  const main = document.querySelector('main');
  const resultDiv = document.querySelector('.result');
  const wordsValue = document.querySelector('.result .words-value');
  const lettersValue = document.querySelector('.result .letters-value');
  const errorsValue = document.querySelector('.errors-value');
  function CalculatingPerMinute() {
    let arrayOfWords = '';
    let totalArrayOfWords = '';
    let wordsLength;
    let arrayOfLetters = '';
    let totalArrayOfLetters = '';
    let lettersLength;
    let errors = 0;

    function getNewQuote() {
      return fetch('https://api.quotable.io/random')
        .then((res) => {
          return res.json();
        })
        .then((quote) => {
          return quote.content;
        });
    }

    async function displayNewQuote() {
      const quote = await getNewQuote();
      const quotesDiv = document.querySelector('.quotes-container .quotes');
      quotesDiv.innerHTML = '';
      quote.split('').forEach((char) => {
        const p = document.createElement('p');
        p.innerText = char;
        quotesDiv.appendChild(p);
      });

      textArea.value = null;
    }

    displayNewQuote();

    textArea.addEventListener('input', comparingWords);
    function comparingWords() {
      const allQuotes = document.querySelectorAll('p');
      const arrayTextArea = textArea.value.split('');
      const textAreaValue = textArea.value;
      let correct = true;
      errors = 0;

      allQuotes.forEach((quote, index) => {
        const character = arrayTextArea[index];
        if (character == null) {
          quote.classList.remove('incorrect');
          quote.classList.remove('correct');
          correct = false;
        } else if (character == quote.innerText) {
          quote.classList.add('correct');
          quote.classList.remove('incorrect');
          // calculating words from a single quote //
          arrayOfWords = textAreaValue;
          const words = arrayOfWords.split(' ').filter((word) => {
            return /\S/.test(word);
          });
          wordsLength = words.length;

          // calculating letters from a single quote //
          arrayOfLetters = textAreaValue;
          const letters = arrayOfLetters.split('').filter((letter) => {
            return /\S/.test(letter);
          });
          lettersLength = letters.length;

          // console.log(typeof lettersLength);//
        } else {
          quote.classList.remove('correct');
          quote.classList.add('incorrect');
          correct = false;
          errors++;
        }
      });
      if (correct) {
        displayNewQuote();
        // calculating words from all quotes //
        totalArrayOfWords += textAreaValue;
        const words = totalArrayOfWords.split(' ').filter((word) => {
          return /\S/.test(word);
        });
        wordsLength = words.length;

        // Calculating letters from all quotes//
        totalArrayOfLetters += textAreaValue;
        const letters = totalArrayOfLetters.split('').filter((letter) => {
          return /\S/.test(letter);
        });
        lettersLength = letters.length;
      }
    }
    startTimerBtn.addEventListener('click', startTimer);
    function startTimer() {
      wordsValue.innerHTML = '--';
      lettersValue.innerHTML = '--';
      errorsValue.innerHTML = '--';
      textArea.value = '';
      wordsLength = 0;
      lettersLength = 0;
      errors = 0;
      textArea.removeAttribute('disabled');
      startTimerBtn.setAttribute('disabled', true);
      textArea.removeAttribute('disabled');

      let timer = 60;
      const runTimer = setInterval(() => {
        const minutes = document.querySelector('.minutes');
        const seconds = document.querySelector('.seconds');
        minutes.innerHTML = '00:';
        timer--;
        seconds.innerHTML = timer;
        if (timer === 0) {
          clearInterval(runTimer);
          textArea.setAttribute('disabled', true);
          startTimerBtn.removeAttribute('disabled');
          startTimerBtn.innerHTML = 'Start again';
          minutes.innerHTML = '01:';
          seconds.innerHTML = '00';
          errorsValue.innerHTML = errors;

          displayNewQuote();

          if (wordsLength > 0) {
            wordsValue.innerHTML = ` ${wordsLength}`;
          } else {
            wordsLength = 0;
            wordsValue.innerHTML = ` ${wordsLength} `;
          }

          if (lettersLength > 0) {
            lettersValue.innerHTML = ` ${lettersLength} `;
          } else {
            lettersLength = 0;
            lettersValue.innerHTML = ` ${lettersLength} `;
          }
          resultDiv.style.transform = 'translateX(0)';
        }
      }, 1000);
    }
  }

  CalculatingPerMinute();

  const changeModeBtn = document.querySelector('.mode button');

  changeModeBtn.addEventListener('click', function () {
    const modeDiv = document.querySelector('#mode');
    const container = document.querySelector('.container');
    const header = document.querySelector('header h1');
    const timerSpans = document.querySelectorAll('.timer span');
    const words = document.querySelector('.words');
    const letters = document.querySelector('.letters');
    const errors = document.querySelector('.errors');
    const quotesDiv = document.querySelector('.quotes');
    const note = document.querySelector('.note');
    const githubLink = document.querySelector('.social a');

    modeDiv.classList.toggle('background');
    changeModeBtn.classList.toggle('change');
    main.classList.toggle('main-background');
    header.classList.toggle('header-color');
    timerSpans.forEach((span) => {
      span.classList.toggle('timerSpan-color');
    });
    startTimerBtn.classList.toggle('start-timer-bg-color');
    words.classList.toggle('headers-color');
    letters.classList.toggle('headers-color');
    errors.classList.toggle('headers-color');
    textArea.classList.toggle('on-focus');
    resultDiv.classList.toggle('result-bg-color');
    resultDiv.classList.toggle('result-border-color');
    note.classList.toggle('note-color');
    quotesDiv.classList.toggle('quotes-color');
    githubLink.classList.toggle('github-color');
  });
}
main();
