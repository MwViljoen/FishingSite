// declaring empty arrays
let article = [];
let imgLib = [];
let hearts = [];
let aboutButtons = [];
let mofButtons = [];

function myLoad(){ // checking if page is new or already run before
    // if not run before then create empty key values of the arrays in sessionstorage
    if (sessionStorage.getItem("hasCodeRunBefore-aboutMe") === null) {
        sessionStorage.setItem("aboutMeArticles", JSON.stringify(article));
        sessionStorage.setItem("aboutMeImages", JSON.stringify(imgLib));
        sessionStorage.setItem("hearts", JSON.stringify(hearts));
        sessionStorage.setItem("aboutButtons", JSON.stringify(aboutButtons));
        sessionStorage.setItem("hasCodeRunBefore-aboutMe", true);
    } 
    else{ // if run before do the following
        // assign array in sessionstorage to page arrays
        article = JSON.parse(sessionStorage.getItem("aboutMeArticles"));
        imgLib = JSON.parse(sessionStorage.getItem("aboutMeImages"));
        hearts = JSON.parse(sessionStorage.getItem("hearts"));
        aboutButtons = JSON.parse(sessionStorage.getItem("aboutButtons"));
        mofButtons = JSON.parse(sessionStorage.getItem("mofButtons"));
        // reconstruct user inputs for likes
        hearts.forEach(function(i){
            let element = document.getElementById(i);
            let classes = `${element.className} active`;

            element.className = classes;
        });
        // if user moved an item to save folder the button will be hidden afterwards if page is left and came back later the button will be hidden again
        // using id's to hide the buttons that have already been clicked on
        aboutButtons.forEach(function(i){
            let btnElement = document.getElementById(i);
            btnElement.style.display = "none";
        })
    }
}
// adding event listeners to all buttons accordingly
function addEventButtons(){
    let buttons = document.querySelectorAll("main button");
    let hearts = document.querySelectorAll(".heart");
    buttons.forEach(function(i){
        i.addEventListener('click', moveToLocal);// event  for all save for later buttons
    })
    hearts.forEach(function(i){
        i.addEventListener('click', addHearts); // event for all hearts / likes
    })
}
// function to move data of corresponding save for later button to array and then sessionstorage
function moveToLocal(e){
    // path of element of all content
    let path = e.target.parentNode.parentNode;
    let content = path.querySelectorAll("h1,p");// selecting content to be moved to storage
    let className = path.className; //it gets name of class 
    //  if name of class is a text class for text then the text will be taken and stored in an array
    if(className === "about-card-1-text-container" || className === "about-card-2-text-container"){
        content.forEach(function(i){
            article.push(i.innerText);
        });
        sessionStorage.setItem("aboutMeArticles", JSON.stringify(article));// array is then stored in sessionstorage
        // hiding button, after the data is fetched and stored. the button will be hidden so the user can only add that data once
        let btnIdName = e.target.attributes[0].nodeValue; // getting id name of button 
        aboutButtons.push(btnIdName);// moves id name to array
        document.getElementById(btnIdName).style.display = "none"; // hiding button
        sessionStorage.setItem("aboutButtons", JSON.stringify(aboutButtons));// moving array with id's into sessionstorage
    }
    // for images, uses same principal as for text
    else if(className === "about-card-1-img-container" || className === "about-card-2-img-container"){
        let imgPath = path.firstElementChild.attributes[0].textContent;
        imgLib.push(imgPath);
        e.target.style.display = "none";
        sessionStorage.setItem("aboutMeImages", JSON.stringify(imgLib));
        // hiding button
        let btnIdName1 = e.target.attributes[0].nodeValue;
        aboutButtons.push(btnIdName1);
        document.getElementById(btnIdName1).style.display = "none";
        sessionStorage.setItem("aboutButtons", JSON.stringify(aboutButtons));
    }

    getFolderCount();// each time a user adds a item to saved folder it will run this function

}
// adds and removes heart id names in array for memmory of user input on likes
function addHearts(e){
    hearts = JSON.parse(sessionStorage.getItem("hearts"));// gets hearts from sessionstorage for compare
    let findId = e.target.attributes[0].nodeValue;// finding id of clicked heart
    let idIndex = hearts.indexOf(findId);// finding index in array of clicked heart
    
    if(idIndex >= 0){// if there is a match will return a index if not will return -1
        hearts.splice(idIndex, 1);// thus removes that id since the user must have clicked on it again and unliked the item
        sessionStorage.setItem("hearts", JSON.stringify(hearts));// stores new array to session
    }
    else{// if index is -1 it has not been liked thus adding the id of clicked heart to array and this is memory for if a user liked an item
        hearts.push(e.target.attributes[0].nodeValue);// pusing id name to array
        sessionStorage.setItem("hearts", JSON.stringify(hearts));// updating id array
    }
}
// if save for later is clicked on an item the id of that button was saved in array and session thus the count of ids in array can be counted to
//indicate amount of saved items. here item count from about me page and items from more on fishing page are added and displayed for user with alert
function getFolderCount(){
    aboutButtons = JSON.parse(sessionStorage.getItem("aboutButtons"));
    mofButtons = JSON.parse(sessionStorage.getItem("mofButtons"));
    let aboutCount = 0;
    let mofCount = 0;
    if(mofButtons == null){// if more on fishing has not been visited then that session will be null, thus 0 items then do the following
        aboutCount = aboutButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
    else if(aboutButtons == null){// if about page was not yet visited  about session is null then do this 
        mofCount = mofButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
    else{// if both pages are not null then both pages have been visited then do the following
        aboutCount = aboutButtons.length;
        mofCount = mofButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
}

addEventButtons();