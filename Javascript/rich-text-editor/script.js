const optionsButtons = document.querySelectorAll(".option-button");
function modifyText(command, value = null) {
    document.execCommand(command, false, value);
}
optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        modifyText(button.id);
        button.classList.toggle("active");
    });
});
document.getElementById("createLink").addEventListener("click", () => {
    const url = prompt("enter url:");
    if(url) modifyText("createlink", url);
});
document.getElementById("fontSize").addEventListener("change", (e) => {
    modifyText("fontSize", e.target.value);
});
document.getElementById("fontName").addEventListener("change", (e) => {
    modifyText("fontName", e.target.value);
});
document.getElementById("formatBlock").addEventListener("change", (e) => {
    modifyText("formatBlock", e.target.value);
});
document.getElementById("text-input").focus();