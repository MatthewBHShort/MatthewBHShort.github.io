const csvUrl = 'https://raw.githubusercontent.com/MatthewBHShort/MatthewBHShort.github.io/main/answersFormatting.csv';
const txtUrl = 'https://raw.githubusercontent.com/MatthewBHShort/MatthewBHShort.github.io/main/questions.txt';


const startTime = new Date().toISOString();
console.log("Survey Started at: " + startTime);

const firebaseConfig = {
    apiKey: "AIzaSyATFx-WHCXHC2uA0FZZwIcPO7LAjRh8Wjg",
    authDomain: "energy-coaching-cbbc5.firebaseapp.com",
    databaseURL: "https://energy-coaching-cbbc5-default-rtdb.firebaseio.com",
    projectId: "energy-coaching-cbbc5",
    storageBucket: "energy-coaching-cbbc5.appspot.com",
    messagingSenderId: "85932482016",
    appId: "1:85932482016:web:9852865b84481d33f41f85",
    measurementId: "G-DWJ540T6WE"
};

saveResponseID = "";
const surveyResponseData = {
    timeStarted: "",
    timeFinished: "",
    drivers:"",
    heating:"",
    heatingAge: 0,
    cooling:"",
    coolingAge:0,
    fullSurvey:"",
    location: "",
    feedback: "i have not been updated yet!",
    email:"",
  };




firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

auth.signInWithEmailAndPassword("matthew@laszloenergy.com", "password")
    .then((userCredential) => {
        console.log("User signed in: ", userCredential.user);
    })
    .catch((error) => {
        console.error("Error signing in: ", error);
    });

    











lastQuestionStrAdded = "";
lastQuestion = "start";





    fetch(txtUrl)
      .then(response => response.text())
      .then(data => {
        eval(data);
        // console.log('Object fetched and assigned:', questions);

      })
      .catch(error => console.error('Error fetching the file:', error));

 





function saveString(passedThroughString) {
    console.log(passedThroughString);
    const inputString = passedThroughString;
    localStorage.setItem('sharedString', inputString);
    // window.location.href = 'https://matthewbhshort.github.io/results.html';
    // window.location.href = 'https://matthewbhshort.github.io/feedback.html';
    

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
        // console.log(driverString + " removed");
    }else{
        result.driver += driverString;
        // console.log(s + " added");
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
   
    console.log(stringAnswer + "    ->    " + letter)

    function removeRepeatingCharacters(str) {
        return Array.from(new Set(str)).join("");
      }    

    fullResult = "";
    for(let i = 0; i < letter.length; i++){
        result = csvData.find(row => row.identifier && row.identifier.toLowerCase() === letter[i].toLowerCase());
        fullResult += result.paragraph;
        fullResult += "\n";
        // fullResult += "\n\n\n\n\n\n";
    }
    

    
    if (result) {
        // console.log("FULLRESULTS: " + fullResult);
        saveString(fullResult);

    } else {
      document.getElementById('result').innerText = `No paragraph found for ${letter}`;
    }
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    document.getElementById('result').innerText = 'Error fetching or parsing CSV. Check the console for details.';
  }
}


        
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
                window.location.href = 'https://calendly.com/cutyourhomecarbon';
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
        answersElem.appendChild(noButton);
    
    } else {
        askQuestion();
    }
}


function saveResponses(yesOrNo) {
    if(yesOrNo == true){
        var replies = JSON.stringify(responses,null,2);
        replies = formatResponses(replies);
        surveyResponseData.fullSurvey = replies;
        saveData(replies,result.driver);
        console.log(replies);
        getLocation();
        // sendEmail(replies);
    }
    askForLetter(result.answerString); 
}

function formatResponses(r){
    r = r.replaceAll('\"question\"', '');
    r = r.replaceAll('Please choose all that apply then click Next.', '');
    r = r.replaceAll("\\n", '');
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
    setTimeout(askQuestion, 300);
 


function sendEmail(r) {
    var recipient = "matthew@laszloenergy.com";
    var subject = "Home Energy Consultation Interest";
    var body = r;
    var cc = "";
    var bcc = "";

    var mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${cc}&bcc=${bcc}`;
    
    window.location.href = mailtoLink;
}





function getLocation(){
    console.log("getting location: ");
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data.city, data.region, data.country);
        surveyResponseData.location = data.city + ", " + data.region + ", " + data.country + ".";
    })
    .catch(error => console.error('Error fetching location:', error));
}



function equipmentType(machine, heating){
    if(heating){
        console.log("Adding " + machine + " to heating.");
        surveyResponseData.heating = machine;
    }else{
        console.log("Adding " + machine + " to cooling.");
        surveyResponseData.cooling = machine;
    }
}

function equipmentAge(age, heating){
    if(heating){
        surveyResponseData.heatingAge = age;
    }else{
        surveyResponseData.coolingAge = age;
    }
}





function saveData(stringResponses,drivers){
    const user = auth.currentUser;
    if(drivers.includes("costs")){
        addToTally('costs',user);
    }
    if(drivers.includes("ghgs")){
        addToTally('ghgs',user);
    }
    if(drivers.includes("comfort")){
        addToTally('comfort',user);
    }
    if(drivers.includes("equipment")){
        addToTally('equipment',user);
    }
    formatResponseData(drivers);
}

function addToTally(driver,user){
    const userID = user.uid;
    const Ref = database.ref(driver + '/' + userID);
    Ref.transaction((currentValue) => {
        return (currentValue || 0) + 1;
    }).then(() => {
        console.log(driver + " tally updated successfully");
    }).catch((error) => {
        console.error("Error updating tally: ", error);
        alert("Error updating tally: " + error.message);
    });
}




function formatResponseData(drivers){
    const endTime = new Date().toISOString();
    const formattedResponseData = surveyResponseData;
    formattedResponseData.drivers = drivers;
    formattedResponseData.timeStarted = startTime;
    formattedResponseData.timeFinished = endTime;
    saveResponseData(formattedResponseData)
}

function saveResponseData(response) {
    responseId = database.ref('responses').push().key;
    saveResponseID = responseId;
    localStorage.setItem('responseID',saveResponseID);
    const responseData = response;

    const updates = {};
    updates['/responses/' + responseId] = responseData;
  
    return database.ref().update(updates)
      .then(() => {
        console.log('Data saved successfully');
        window.location.href = 'https://matthewbhshort.github.io/feedback.html';
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
      
  }
  
  
