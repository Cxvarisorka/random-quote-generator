const quote = document.querySelector('.quote');
const author = document.querySelector('.name');
const generateBtn = document.querySelector('#generate')

const speechBtn = document.querySelector('.speech');
const copyBtn = document.querySelector('.copy');

class App {
    #apiUrl = "https://api.quotable.io/random";
    #content = quote.textContent;
    #authorText = author.textContent;

    constructor(){
        generateBtn.addEventListener('click',this._sendRequest.bind(this));
        copyBtn.addEventListener('click',this._copyClipboard.bind(this));
        speechBtn.addEventListener('click',this._speechFunc.bind(this));
    }

    _sendRequest(){
        generateBtn.textContent = 'Loading Quote...';
        generateBtn.classList.add('loading');

        const request = new XMLHttpRequest();
        request.open('GET',this.#apiUrl);
        request.send();

        const requestFunc = function(){
            const quoteObj = JSON.parse(request.responseText);

            this.#content = quoteObj.content;
            this.#authorText = quoteObj.author;

            quote.textContent = this.#content;
            author.textContent = this.#authorText;

            generateBtn.textContent = 'New Quote';
            generateBtn.classList.remove('loading');
        }

        request.addEventListener('load',requestFunc.bind(this));
    }

    _speechFunc(){
        const utterance = new SpeechSynthesisUtterance(`${this.#content} by ${this.#authorText}`);
        speechSynthesis.speak(utterance);

        generateBtn.classList.add('loading');
        generateBtn.textContent = 'Speech is going...';

        utterance.addEventListener('end',function(){
            generateBtn.classList.remove('loading');
            generateBtn.textContent = 'New Quote';
        });
    }

    _copyClipboard(){
        navigator.clipboard.writeText(this.#content);
    }

}

const app = new App()