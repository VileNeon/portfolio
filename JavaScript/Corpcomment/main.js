// -- GLOBAL -- //
const MAX_CHARS = 150;

const formEl = document.querySelector(".form");
const textareEl = document.querySelector(".form__textarea");
const counterEl=document.querySelector(".counter");
const feedbackListEl=document.querySelector(".feedbacks");
const submitBtnEl=document.querySelector(".submit-btn");
const spinnerEl=document.querySelector(".spinner");


const inputHandler = ()=>{
    //determine maximum number of characters
    const maxNrChars=MAX_CHARS;
    // determine number of charactrs currently typed
    let nrCharsTyped= textareEl.value.length;
    //calculate number of chars left (max - typed)
    const charsLeft=maxNrChars-nrCharsTyped;
    //show number
    counterEl.textContent = charsLeft;
};

textareEl.addEventListener("input",inputHandler);

// -- FORM COMPONENT -- //
const showVisualIndicator = (strAddclass)=>{
    formEl.classList.add(strAddclass)

    setTimeout(() => {
        formEl.classList.remove(strAddclass)
    }, 2000);
}


const submitHandler = event=>{
    // prevent default browser action (submitting form data to "action" address and loading a new page)
    event.preventDefault();
    //get text from textarea
    const text = textareEl.value;
    //validate text = check # exists and that text is long enough
    if (text.includes("#") && text.length > 4){
        
        showVisualIndicator("form--valid");
    }
    else{
        showVisualIndicator("form--invalid");
        
        
        textareEl.focus();

        return;
    }
    //add to list
    const hashtag = text.split(" ").find(word => word.includes("#"));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0,1).toUpperCase();
    const upvoteCount=0;
    const daysAgo=0;
    const feedbackItem={
        upvoteCount:upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text

    };
    //new feeedback item html
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>
    `;
    feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
    //feedback to server
    fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks",{
        method: `POST`,
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            console.log("Something went wrong");
            return;
        }
        
        console.log("Succesfully submitted");
        
    }).catch(error=>{
        console.log(error);
    });
    //clear textarea
    textareEl.value="";
    //blur submit button
    submitBtnEl.blur();
    //reset counter
    counterEl.textContent=MAX_CHARS;
};
// Submit Component
formEl.addEventListener("submit", submitHandler)

// -- FEEDBACK LIST COMPONENT -- ///
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
    .then(res => res.json())
    .then(data =>{
        //remove spinner
        spinnerEl.remove();

        data.feedbacks.forEach(element => {
            const feedbackItemHTML = `
            <li class="feedback">
                <button class="upvote">
                    <i class="fa-solid fa-caret-up upvote__icon"></i>
                    <span class="upvote__count">${element.upvoteCount}</span>
                </button>
                <section class="feedback__badge">
                    <p class="feedback__letter">${element.badgeLetter}</p>
                </section>
                <div class="feedback__content">
                    <p class="feedback__company">${element.company}</p>
                    <p class="feedback__text">${element.text}</p>
                </div>
                <p class="feedback__date">${element.daysAgo === 0 ? 'NEW' : `${element.daysAgo}d`}</p>
            </li>
        `;
        feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
            
        }).catch(error =>{
            feedbackListEl.textContent = `Faild to fetch feedback items. Error message: ${error.message}`;
        })
        
    });
