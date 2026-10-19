
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

posts.forEach((post) => {

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector(".like-count");

    likeButton.addEventListener("click", () => {

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
    });
});
