let article = [];
let imgLib = [];
let links = [];
let tableText = [];
let commentsArr = [];
let mofHearts = [];
let mofButtons = [];
let aboutButtons = [];
// this whole script is similar to about me page script 
// thus no comments here
// only extra section is comment section but method remains the same
// comments are saved in an object
// if page is reloaded old comments will be reconstructed from sessionstorage
function myLoad(){
    if (sessionStorage.getItem("hasCodeRunBefore-mof") === null) {
        sessionStorage.setItem("mofArticles", JSON.stringify(article));
        sessionStorage.setItem("mofImages", JSON.stringify(imgLib));
        sessionStorage.setItem("mofLinks", JSON.stringify(links));
        sessionStorage.setItem("mofTableText", JSON.stringify(tableText));
        sessionStorage.setItem("mofHearts", JSON.stringify(mofHearts));
        sessionStorage.setItem("allComments", JSON.stringify(commentsArr));
        sessionStorage.setItem("mofButtons", JSON.stringify(mofButtons)); 
        sessionStorage.setItem("hasCodeRunBefore-mof", true);
    } 
    else{
        let comentSection = document.querySelector("#comments");
        article = JSON.parse(sessionStorage.getItem("mofArticles"));
        imgLib = JSON.parse(sessionStorage.getItem("mofImages"));
        links = JSON.parse(sessionStorage.getItem("mofLinks"));
        tableText = JSON.parse(sessionStorage.getItem("mofTableText"));
        commentsArr = JSON.parse(sessionStorage.getItem("allComments"));
        mofHearts = JSON.parse(sessionStorage.getItem("mofHearts"));
        mofButtons = JSON.parse(sessionStorage.getItem("mofButtons"));
        aboutButtons = JSON.parse(sessionStorage.getItem("aboutButtons"));

        commentsArr.forEach(function(p){
            comentSection.innerHTML += `
            <h3>${p.name}</h3>
            <p>${p.comment}</p>
            <hr>`;
        });

        mofHearts.forEach(function(i){
            let element = document.getElementById(i);
            let classes = `${element.className} active`;

            element.className = classes;
        });

        mofButtons.forEach(function(i){
            let btnElement = document.getElementById(i);
            btnElement.style.display = "none";
        })
    }
}

// save to folder section
function addEventButtons(){
    let buttons = document.querySelectorAll(".btn");
    let commentBtn = document.querySelector("#submitCommentBtn");
    let hearts = document.querySelectorAll(".heart");
    buttons.forEach(function(i){
        i.addEventListener('click', moveToLocal);
    });

    commentBtn.addEventListener("click", addComment);

    hearts.forEach(function(i){
        i.addEventListener('click', addHearts);
    });
}

function moveToLocal(e){
    // for text
    let path = e.target.parentNode.parentNode;
    let content = path.querySelectorAll("p,li,h2,h4");
    let className = path.className;


    if(className === "mof-text"){
        content.forEach(function(i){
            article.push(i.innerText);
        })
        sessionStorage.setItem("mofArticles", JSON.stringify(article));
        // hiding button
        let btnIdName = e.target.attributes[0].nodeValue;
        mofButtons.push(btnIdName);
        document.getElementById(btnIdName).style.display = "none";
        sessionStorage.setItem("mofButtons", JSON.stringify(mofButtons));
    }
    else if(className === "mof-img-btn"){
        let imgPath = path.firstElementChild.attributes[0].textContent;
        imgLib.push(imgPath);
        sessionStorage.setItem("mofImages", JSON.stringify(imgLib));
        // hiding button
        let btnIdName1 = e.target.attributes[0].nodeValue;
        mofButtons.push(btnIdName1);
        document.getElementById(btnIdName1).style.display = "none";
        sessionStorage.setItem("mofButtons", JSON.stringify(mofButtons));
    }
    else if(e.target.matches(".btn")){
        let tableLink = path.firstElementChild.attributes[0].textContent;
        let text = path.firstElementChild.textContent;
        links.push(tableLink);
        tableText.push(text)
        sessionStorage.setItem("mofLinks", JSON.stringify(links));
        sessionStorage.setItem("mofTableText", JSON.stringify(tableText));

        // hiding button
        let btnIdName2 = e.target.attributes[0].nodeValue;
        mofButtons.push(btnIdName2);
        document.getElementById(btnIdName2).style.display = "none";
        sessionStorage.setItem("mofButtons", JSON.stringify(mofButtons));
    }

    getFolderCount();
}
// comment section
function comments(name, comment){
    this.name = name;
    this.comment = comment;
};

function addComment(){
    if(document.querySelector("#commentName").value.length != 0 && document.querySelector("#comment").value.length != 0){
        let newComment = new comments(
            document.querySelector("#commentName").value,
            document.querySelector("#comment").value,
        );
        commentsArr.push(newComment);
        sessionStorage.setItem("allComments", JSON.stringify(commentsArr));
        addCommentToSection();
    }
    else(alert("We need to know who you are to leave a comment"));
}

function addCommentToSection(){
    let comentSection = document.querySelector("#comments")
    comentSection.innerHTML += `
    <h3>${document.querySelector("#commentName").value}</h3>
    <p>${document.querySelector("#comment").value}</p>
    <hr>`;
    document.querySelector("#commentName").value = '';
    document.querySelector("#comment").value = '';
}

function addHearts(e){
    mofHearts = JSON.parse(sessionStorage.getItem("mofHearts"));
    let findId = e.target.attributes[0].nodeValue;
    let idIndex = mofHearts.indexOf(findId);
    
    if(idIndex >= 0){
        mofHearts.splice(idIndex, 1);
        sessionStorage.setItem("mofHearts", JSON.stringify(mofHearts));
    }
    else{
        mofHearts.push(e.target.attributes[0].nodeValue);
        sessionStorage.setItem("mofHearts", JSON.stringify(mofHearts));
    }
}

function getFolderCount(){
    aboutButtons = JSON.parse(sessionStorage.getItem("aboutButtons"));
    mofButtons = JSON.parse(sessionStorage.getItem("mofButtons"));
    let aboutCount = 0;
    let mofCount = 0;
    if(mofButtons == null){
        aboutCount = aboutButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
    else if(aboutButtons == null){
        mofCount = mofButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
    else{
        aboutCount = aboutButtons.length;
        mofCount = mofButtons.length;
        alert(`You have ${mofCount + aboutCount} items in your saved folder`);
    }
}

addEventButtons(); // adding events to buttons