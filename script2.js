


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







