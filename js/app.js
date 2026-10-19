
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
