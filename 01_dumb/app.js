var app = document.getElementById('app');
var pageNumber = 1;
function generatePage() {
    var contents = "<h1>My Site</h1><h2>Want to know what page you're on?</h2><ul><li>First item.</li><li>Second item: You are on page " + pageNumber + ".</li><li>Last item.</li></ul><button id=\"next\">Next Page</button>";
    app.innerHTML = contents;
    var button = document.getElementById('next');
    button.onclick = handleClick;
}

function handleClick() {
    pageNumber++;
    generatePage();
}

generatePage();