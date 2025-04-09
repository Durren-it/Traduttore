// recupero i componenti dalla pagina html
const langButtons = document.querySelectorAll('.lang-button');
const textInput = document.querySelector('.text-input');
const translationText = document.querySelector('.translation-text');
const translationFlag = document.querySelector('.translation-flag');
const resetButton = document.querySelector('.reset-button');

// funzione di reset
function reset() {
    textInput.value = '';
    translationText.innerText = 'Traduzione';
    translationFlag.innerHTML = '';
    document.body.style.backgroundImage = '';
}

// funzione chiama API WEB
async function translate(text, lang, flag) {
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=it|${lang}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    const result = jsonData.responseData.translatedText;

    translationText.innerText = result;
    translationFlag.innerHTML = flag;
}

// funzione di settaggio di immagine background
function changeBackground(lang) {
    if (lang === 'en') {
        document.body.style.backgroundImage = "url('images/united-kingdom512.png')"
    } else if (lang === 'fr') {
        document.body.style.backgroundImage = "url('images/france512.png')"
    } else if (lang === 'es') {
        document.body.style.backgroundImage = "url('images/spain512.png')"
    }
}

// attaccare eventi ai bottoni
resetButton.addEventListener('click', reset);

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const text = textInput.value;
        const lang = button.dataset.lang;
        const flag = button.innerHTML;

        if (text == '') {
            alert('Inserisci un testo da tradurre!');
        } else {
            translate(text, lang, flag);
            changeBackground(lang);
        }
    })
})