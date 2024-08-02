document.addEventListener("DOMContentLoaded", function() {
    setTimeout(loadContent, 2000);
});

function loadContent() {
    const content = document.getElementById("content");
    content.classList.add("content-loaded");

    const realContent = `
          <h1>Content</h1>
    `;
    content.innerHTML += realContent;
}