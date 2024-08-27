

function retrieveString() {
    const sharedString = localStorage.getItem('sharedString');
    // console.log(sharedString);
    // document.getElementById('displayString').innerText = sharedString ? `${sharedString}` : 'No answers found.';
    document.getElementById('formatted-output').innerHTML = sharedString;
}
retrieveString();
function toggleContent() {
    var content1 = document.getElementById('formatted-output');
    var content2 = document.getElementById('guideContent');

    if (content1.classList.contains('hidden')) {
        content1.classList.remove('hidden');
        content2.classList.add('hidden');
    } else {
        content1.classList.add('hidden');
        content2.classList.remove('hidden');
    }



}


{/* <a href="page2.html#section2">Go to Section 2 on Page 2</a> */}

const wordsToLink = [
    { word: 'Furnace'},
    { word: 'Tankless Water Heater'},
    { word: 'Smart Thermostat'},
    { word: 'Air Handler'},
    { word: 'R-Value'},
    { word: 'Energy Audit'},
    { word: 'Electrical Panel'},
    { word: 'Hybrid Heating'},
    { word: 'Vapour Barrier'},
    { word: 'Induction Stove'},
    { word: 'Boiler'},
    { word: 'Heat Pump'},
    { word: 'Electric Baseboard Heaters'},
    { word: 'LED Lighting'},

];
function makeWordsClickable() {
    const elements = document.querySelectorAll('p, span, div');

    elements.forEach(element => {
        let html = element.innerHTML;
        wordsToLink.forEach(({ word }) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const hash = word.toLowerCase().replace(/ /g, '-');
            const replacement = `<a id="clickableWord" href="https://matthewbhshort.github.io/guide.html#${hash}">${word}</a>`;
            html = html.replace(regex, replacement);
        });
        element.innerHTML = html;
    });
}
window.onload = makeWordsClickable;

document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('info-popup');
    popup.classList.add('show');
    
    setTimeout(function() {
        if (popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
    }, 10000); 
});

function closePopup() {
    var popup = document.getElementById('info-popup');
    popup.classList.remove('show');
}





document.addEventListener('DOMContentLoaded', function () {



    const headings = document.querySelectorAll('h1');

    headings.forEach((heading) => {
        let nextElement = heading.nextElementSibling;

        while (nextElement && nextElement.tagName !== 'H1') {
            nextElement.style.display = 'none';
            nextElement = nextElement.nextElementSibling;
        }

        heading.classList.add('collapsed');
    });





    document.addEventListener('click', function (event) {
        // Check if the clicked element is an <h1> tag
        if (event.target.tagName === 'H1') {
            console.log(`H1 clicked: ${event.target.textContent.trim()}`);

            let nextElement = event.target.nextElementSibling;
            let isCollapsed = false;

            // Toggle visibility of all elements until the next h1
            while (nextElement && nextElement.tagName !== 'H1') {
                if (nextElement.style.display === 'none') {
                    nextElement.style.display = '';
                    isCollapsed = false;
                } else {
                    nextElement.style.display = 'none';
                    isCollapsed = true;
                }
                nextElement = nextElement.nextElementSibling;
            }

            // Toggle the arrow direction by adding/removing the collapsed class
            if (isCollapsed) {
                event.target.classList.add('collapsed');
            } else {
                event.target.classList.remove('collapsed');
            }
        }
    });

    console.log('Event delegation setup complete.');
});




