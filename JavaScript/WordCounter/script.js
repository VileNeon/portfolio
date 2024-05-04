const textareaEl= document.querySelector(".textarea");
const characterNumberEl = document.querySelector(".stat__number--characters");
const wordNumberEl = document.querySelector(".stat__number--words");
const twitterNumberEl = document.querySelector(".stat__number--twitter");
const facebookNumberEl = document.querySelector(".stat__number--facebook");

const inputHandler=()=>{
    
    //example of input validation
    if(textareaEl.value.includes("<script>")){
        alert("You cannot use <script> in your text");
        textareaEl.value= textareaEl.value.replace("<script>", "");
    }

    //determine new numbers
    let numberOfWords = textareaEl.value.split(" ").length;
    if(textareaEl.value.length===0){
        numberOfWords=0;
        
    }
    const numberOfCharacters=textareaEl.value.length;
    const twitterCharactersLeft = 280 -numberOfCharacters;
    const facebookCharactersLeft=2200-numberOfCharacters;
    //add visual indicator if limit is exceeded
    if(twitterCharactersLeft <0){
        twitterNumberEl.classList.add("stat__number--limit");
    }
    else if(twitterCharactersLeft>=0){
        twitterNumberEl.classList.remove("stat__number--limit");
    }

    if(facebookCharactersLeft<0){
        facebookNumberEl.classList.add("stat__number--limit");
    }
    else if(facebookCharactersLeft>=0){
        facebookNumberEl.classList.remove("stat__number--limit");
    }
    //set new numbers
    characterNumberEl.textContent = numberOfCharacters;
    twitterNumberEl.textContent =twitterCharactersLeft;
    facebookNumberEl.textContent=facebookCharactersLeft;
    wordNumberEl.textContent=numberOfWords;

    

};


textareaEl.addEventListener("input", inputHandler);

