 const randomQuotAPIUrl = "http://api.quotable.io/random";
 const timerElement = document.getElementById('timer');

 const quoteDisplayElement = document.getElementById("quoteDisplay");
 const quoteInputElement = document.getElementById("quoteInput");


 function getRandomQuote(){
    return fetch(randomQuotAPIUrl).then(
        (response)=>{
           return response.json();
        }
    ).then((data)=>{
       return data.content;
    })
 }

 async function renderNewQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText='';
    quote.split('').forEach(element => {
        const charSpan = document.createElement("span"); 
        charSpan.innerText=element;
        quoteDisplayElement.appendChild(charSpan);
        
    });
    quoteInputElement.value=null;
    startTimer();
 }

quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct =true;
    arrayQuote.forEach((charSpan,index)=>{
        const char = arrayValue[index];
        if(char==null)
        {
            charSpan.classList.remove("correct");
            charSpan.classList.remove("incorrect");
            correct=false;
        }
        else if(char === charSpan.innerText){
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        }
        else{
            charSpan.classList.remove("correct");
            charSpan.classList.add("incorrect");
            correct=false;
        }
    })
    if(correct){
        renderNewQuote();
    }
})

let time;
let id;
function startTimer(){
    //timerElement.innerText=0;
    time=new Date();
    id=setInterval(()=>{
        timerElement.innerText=getTimeValue();
    },1000)

}

function getTimeValue(){
    return Math.floor((new Date() - time)/1000);
}


 renderNewQuote();