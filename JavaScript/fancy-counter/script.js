const counterEl = document.querySelector(".counter");
const increaseButtoEl = document.querySelector(".counter__button--increase");
const decreaseButtonEl= document.querySelector(".counter__button--decrease");
const titleEl=document.querySelector(".counter__title");
const resetButtonEl=document.querySelector(".counter__reset-button");


const counterValueEl=document.querySelector(".counter__value");
increaseButtoEl.addEventListener("click",function(){
    //get current value of counter
    let currentValue=counterValueEl.textContent;
    //conver value to number type
    const CurrentValueAsNumber = +currentValue;
    //increment by 1
    let newValue= CurrentValueAsNumber+1;

    //check if new value is greater than 5
    if(newValue > 5){
        newValue=5;
        counterEl.classList.add("counter--limit");
        titleEl.innerHTML="BUY <b>PRO</b> TO GO >5";

        //disable both increase and decrease
        increaseButtoEl.disabled =true;
        decreaseButtonEl.disabled =true;
    }
    //set counter with new value
    counterValueEl.textContent=newValue;
});

decreaseButtonEl.addEventListener("click",()=>{
    //get current value of counter
    let currentValue=counterValueEl.textContent;
    //conver value to number type
    const CurrentValueAsNumber = +currentValue;
    //increment by 1
    let newValue= CurrentValueAsNumber-1;
    //check if new value is less than 0
    if(newValue <0){
        newValue =0;
    }

    //set counter with new value
    counterValueEl.textContent=newValue;
});

resetButtonEl.addEventListener("click", ()=>{
    counterValueEl.textContent=0;
    counterEl.classList.remove("counter--limit");
    titleEl.textContent="Fancy Counter";
    increaseButtoEl.disabled =false;
    decreaseButtonEl.disabled =false;

    increaseButtoEl.blur();
});
