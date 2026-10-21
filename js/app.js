
const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", () => {

    const html = document.documentElement;

    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }

});


const posts = document.querySelectorAll(".post");



    // const likeButton = posts.querySelector(".like-button");
    // const likeCount = posts.querySelector(".like-count");

 

const feed = document.querySelector("#feed");
const postForm = document.querySelector("#post-form");
const postContent = document.querySelector("#post-content");

feed.addEventListener("click", (event) =>{
const likeButton = event.target.closest(".like-button");


if (!likeButton){
    return;
}

const newArticle = event.target.closest(".post");
const likeCount = newArticle.querySelector(".like-count");
  const isLiked = likeButton.classList.toggle("liked");

        let likes = Number(likeCount.textContent);

        if (isLiked) {
            likes++;
        } else {
            likes--;
        }

        likeCount.textContent = likes;

        likeButton.setAttribute(
            "aria-pressed",
            String(isLiked)
        );
})



postForm.addEventListener("submit", (event) => {
       event.preventDefault();
console.log("hola");
   
   
    const postSubmit = postContent.value.trim();
   
    if (postSubmit === "") {
        return;
    }


const createArticle = document.createElement("article");
const postP = document.createElement("p");
const postHeader = document.createElement("header");
const avatarContent = document.createElement("div");
const userContent = document.createElement("div");
const userProfile = document.createElement("h2");
const usertag = document.createElement('p');
const postFooter = document.createElement("footer");
const buttonLikes = document.createElement("button");
const counter = document.createElement("span");
const commentCount = document.createElement("span");

commentCount.textContent = '0';
counter.textContent = "0";
counter.classList.add("like-count");
buttonLikes.classList.add("like-button");
buttonLikes.setAttribute("type", "button");
buttonLikes.setAttribute("aria-pressed", "false");
buttonLikes.append("♡ ", counter, " likes");
postFooter.classList.add("post-footer");
avatarContent.classList.add("avatar");
avatarContent.textContent = "B";
postHeader.classList.add("post-header");
createArticle.classList.add("post");


postFooter.append(buttonLikes, commentCount);

userProfile.textContent ="Bryan Ynoa";
usertag.textContent = "@bryan"

userContent.prepend(userProfile);
userContent.append(usertag);

postHeader.prepend(avatarContent);
postHeader.append(userContent);
postP.textContent = postSubmit;
createArticle.append(postHeader);
createArticle.append(postP);
createArticle.append(postFooter);


postForm.after(createArticle);
postContent.value = ""
console.log(postSubmit);    
})
