
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.body.classList.add('dark');
//        document.document-container.classList.add('dark');
        logo.setAttribute('src', 'https://wddbyui.github.io/wdd131/images/byui-logo-white.png');
    } else {
        document.body.classList.remove('dark');
//        document.document-container.classList.remove('dark');
        logo.setAttribute('src', 'https://wddbyui.github.io/wdd131/images/byui-logo-blue.webp');
    }
}           
                    