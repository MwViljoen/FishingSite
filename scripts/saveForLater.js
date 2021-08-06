//creating empty arrays

let aboutMeArticles = [];
let aboutMeImages = [];
let mofArticles = [];
let mofImages = [];
let mofLinks = [];
let mofTableText = [];

function myLoad(){ // as soon as page has loaded get information from session storage and save in empty arrays
    aboutMeArticles = JSON.parse(sessionStorage.getItem("aboutMeArticles"));
    aboutMeImages = JSON.parse(sessionStorage.getItem("aboutMeImages"));
    mofArticles = JSON.parse(sessionStorage.getItem("mofArticles"));
    mofImages = JSON.parse(sessionStorage.getItem("mofImages"));
    mofLinks = JSON.parse(sessionStorage.getItem("mofLinks"));
    mofTableText = JSON.parse(sessionStorage.getItem("mofTableText"));
    addImages();// calling function to add images to saved folder
}

function addImages(){ 
    let imageLocation = document.querySelector("#imageGrid");// get location to append to
    // if no items have been saved to images then alert 
    if((aboutMeImages == null || aboutMeImages.length == 0) && (mofImages == null || mofImages.length == 0)){
        alert("There are no Saved Images");
    }
    // if there is something in array then add images to image grid of saved folder
    if(aboutMeImages != null){
        aboutMeImages.forEach(function(i){
        imageLocation.innerHTML += `
            <img src="${i}" alt="">`;
        });
    }// same for more on fishing page images, this method is used for both pages
    if(mofImages != null){
        mofImages.forEach(function(i){
            imageLocation.innerHTML += `
                <img src="${i}" alt="">`;
            });
    }

    addText();// adding text to save for later folder
}
// same as for images
//reconstructing text using p tag
function addText(){
    let articleLocation = document.querySelector("#articles");// path of where text must go
    if((aboutMeArticles == null || aboutMeArticles.length == 0) && (mofArticles == null || mofArticles.length == 0)){
        alert("There are no saved Articles!!!");
    }
    if(aboutMeArticles != null){
        aboutMeArticles.forEach(function(i){
        articleLocation.innerHTML += `
            <p>${i}</p>`;
        });
    }
    if(mofArticles != null){
        mofArticles.forEach(function(i){
            articleLocation.innerHTML += `
                <p>${i}</p>`;
            });
    }

    addLinks();// adding links  saved links to saved for later page
}

function addLinks(){
    if(mofLinks != null){
        linkLocation = document.querySelector("#links");
        linkLength = mofLinks.length;
        textLength = mofTableText.length;
        if(linkLength == textLength){
            for(i = 0; i < linkLength; i++){
                linkLocation.innerHTML += `
                    <div><a href="${mofLinks[i]}">${mofTableText[i]}</a></div>`;
            }
        }
    }

    createHeadings();// giving styles to p tags according to length and other factors
}

function createHeadings(){
    let allPs = document.querySelectorAll('p'); // select all p tags
    allPs.forEach(function(i){ // for each p tag 
        let iLength = i.innerText.length; // find length
        if(iLength <= 35){// if length is short make it a heading
            i.style.fontSize = "30px";
            i.style.fontWeight = "500";
        }
        else if(iLength > 35 && iLength <= 150){// if longer make it as if it is a list
            i.style.textIndent = "30px";
            i.style.fontSize = "18px";
        }
        else if( iLength > 150){// if paragraph make it a paragraph
            i.style.textAlign = "justify";
            i.style.fontSize = "16px";
        }
    });
}
