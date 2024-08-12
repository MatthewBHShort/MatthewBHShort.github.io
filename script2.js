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
    { word: 'furance'},
    { word: 'Tankless Water Heater'},
    { word: 'Thermostat'}
];

function makeWordsClickable() {
    const elements = document.querySelectorAll('p, span, div');

    elements.forEach(element => {
        let html = element.innerHTML;

        wordsToLink.forEach(({ word, url }) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match the whole word, case-insensitive
            const replacement = `<a href=https://matthewbhshort.github.io/guide.html#"${word}" target="_blank">${word}</a>`;
            html = html.replace(regex, replacement);
        });

        element.innerHTML = html;
    });
}
window.onload = makeWordsClickable;







