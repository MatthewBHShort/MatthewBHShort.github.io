function retrieveString() {
    const sharedString = localStorage.getItem('sharedString');
    console.log(sharedString);
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







