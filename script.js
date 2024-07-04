const csvUrl = 'https://raw.githubusercontent.com/MatthewBHShort/EnergyCoaching/main/answersFormatting5.csv';
const txtUrl = 'https://raw.githubusercontent.com/MatthewBHShort/EnergyCoaching/main/questions3.txt';






lastQuestionStrAdded = "";
lastQuestion = "start";





    fetch(txtUrl)
      .then(response => response.text())
      .then(data => {
        eval(data);
        console.log('Object fetched and assigned:', questions);

      })
      .catch(error => console.error('Error fetching the file:', error));

 





function saveString(passedThroughString) {
    // const inputString = document.getElementById('inputString').value;
    console.log(passedThroughString);
    const inputString = passedThroughString;
    localStorage.setItem('sharedString', inputString);
    window.location.href = 'http://localhost:8000/results.html';
    

}

function backButtonRemoveString(str){
    console.log(result.answerString);
    result.answerString = result.answerString.slice(0,-str.length);
    console.log(result.answerString);
}


async function saveLast (nextQuestion,currentQuestion, str){
    lastQuestionStrAdded = str;
    if(questions[nextQuestion].answers["Back"]){
        questions[nextQuestion].answers["Back"].next = currentQuestion;
    }else{
        questions[nextQuestion].answers["Back"] = { next: currentQuestion, action: () => {
            console.log("Created back button works!!");
            backButtonRemoveString(lastQuestionStrAdded);
        }};
    }
}



async function stringFunction(nextQuestion,currentQuestion, str){
    saveLast(nextQuestion, currentQuestion, str);
    result.answerString += str;
    // console.log("STRING: " + result.answserString);
}

async function addRemoveDriver (s){
    const driverString = s;
    if(result.driver.includes(driverString)){
        result.driver = result.driver.replace(driverString,'');
        console.log(driverString + " removed");
    }else{
        result.driver += driverString;
        console.log(s + " added");
    }
    console.log("result.driver: " + result.driver);   
}


async function fetchAndParseCSV(url) {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

const driver = "";

async function askForLetter(stringAnswer) {
  try {
    const csvData = await fetchAndParseCSV(csvUrl);
    const letter = removeRepeatingCharacters(stringAnswer);
    // const letter = "Z345";
   
    console.log(stringAnswer + "    ->    " + letter)

    function removeRepeatingCharacters(str) {
        return Array.from(new Set(str)).join("");
      }    

    fullResult = "";
    for(let i = 0; i < letter.length; i++){
        result = csvData.find(row => row.identifier && row.identifier.toLowerCase() === letter[i].toLowerCase());
        fullResult += result.paragraph;
        fullResult += "\n\n\n\n\n\n";
    }

    
    if (result) {
        console.log("FULLRESULTS: " + fullResult);
        saveString(fullResult);

    } else {
      document.getElementById('result').innerText = `No paragraph found for ${letter}`;
    }
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    document.getElementById('result').innerText = 'Error fetching or parsing CSV. Check the console for details.';
  }
}



// ---------------

// This is where questions object was

// ---------------

        
let current = "start";
let result = {
    answerString: "",
    driver: ""
};
let responses = [];

function askQuestion() {
    const q = questions[current];
    const questionElem = document.getElementById('question');
    const answersElem = document.getElementById('answers');
    questionElem.innerText = q.question;
    answersElem.innerHTML = '';

    for (let answer in q.answers) {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => handleAnswer(answer);
        answersElem.appendChild(button);
        

        
        if (answer == 'Reducing Costs' && result.driver.includes('costs')) {
            button.style.backgroundColor = '#5A8C2A'; 
        }
        if (answer == 'Reducing Emissions' && result.driver.includes('ghgs')) {
            button.style.backgroundColor = '#5A8C2A'; 
        }
        if (answer == 'Thermal Comfort' && result.driver.includes('comfort')) {
            button.style.backgroundColor = '#5A8C2A'; 
        }
        if (answer == 'Equipment at End of Life' && result.driver.includes('equipment')) {
            button.style.backgroundColor = '#5A8C2A'; 
        }
        // if(answer == 'Equipment at End of Life'){
        //     const space = document.createElement('br');
        //     answersElem.appendChild(space);
        // }
        if (answer == 'Next' && result.driver.length == 0) {
            button.style.backgroundColor = 'grey'; 
            questions["start"].answers["Next"].next = 'start';
        }
        if (answer == 'Next' && result.driver.length > 0) {
            button.style.backgroundColor = 'blue'; 
            questions["start"].answers["Next"].next = 'ductWork';
        }

        if(q.question == "Would you like to book a virtual consultation?" && answer == "Yes"){
            button.onclick = function() {
                window.location.href = 'https://calendly.com/cutyourhomecarbon'; // Replace with your desired URL
            };
        }
    }
}

function handleAnswer(answer) {
    const q = questions[current];
    responses.push({ question: q.question, answer: answer });
    if (q.answers[answer].action) {
        q.answers[answer].action();
    }
    current = q.answers[answer].next;

    if (current === "end") {
        const questionElem = document.getElementById('question');
        const answersElem = document.getElementById('answers');
        questionElem.innerText = questions[current].question;
        answersElem.innerHTML = '';

        const yesButton = document.createElement('button');
        yesButton.innerText = 'Yes';
        yesButton.onclick = () => {saveResponses(true)};
        answersElem.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.innerText = 'No';
        noButton.onclick = () => saveResponses(false);
        answersElem.appendChild(backButton);

        
        
    } else {
        askQuestion();
    }
}


function saveResponses(yesOrNo) {
    if(yesOrNo == true){
        var replies = JSON.stringify(responses,null,2);
        replies = formatResponses(replies);
        console.log(replies);
        // sendEmail(replies);
        askForLetter(result.answerString); 
    }
}

function formatResponses(r){
    r = r.replaceAll('\"question\"', '');
    r = r.replaceAll('\"answer\"', '');
    r = r.replaceAll('}', '');
    r = r.replaceAll('{', '');
    r = r.replaceAll(':', '');
    r = r.replaceAll('\",', '\"');
    r = r.replaceAll('\"', '');
    r = r.replaceAll(',', '');
    r = r.replaceAll(']', '');
    r = r.replaceAll('[', '');
    console.log(r);
    return r;
}


    
    // askQuestion();
    setTimeout(askQuestion, 200);
 


function sendEmail(r) {
    var recipient = "matthew@laszloenergy.com";
    var subject = "Home Energy Consultation Interest";
    var body = r;
    var cc = "";
    var bcc = "";

    var mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${cc}&bcc=${bcc}`;
    
    window.location.href = mailtoLink;
}