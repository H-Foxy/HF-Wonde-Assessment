//Handle the submit button
function submitButtonClicked(){
  //Take user input
  var idInput = document.getElementById('idInput').value;
  clearScreen();
  getClasses(idInput);
  
}

async function getClasses(idInput){
  //URL and access token to request data from site
  const URL = "https://api.wonde.com/v1.0/schools/A1930499544/classes?include=students,employees";   
  const TOKEN = "Bearer 6afed359b8d6defa530114ff2cb732533618df36";

  //Retrieve the data and capture in response.json
  const RESPONSE = await fetch(URL,{
    headers: {"Authorization": TOKEN}
  })
  const DATA = await RESPONSE.json();
  var isFound = false

  //Iterate through arrays in data 
  DATA.data.forEach(classData =>{
    const STUDENTSDATA = classData.students.data; //Access the students data for each class
    const EMPLOYEESDATA = classData.employees.data; //Access the employees data for each class

    //Create arrays for necessary data only
    var employeesId = EMPLOYEESDATA.map(employee => employee.id);

    //Check if employee ID is valid
    if (employeesId.includes(idInput)){
      isFound = true;
      //Create arrays for all needed data
      var employeesFullNames = EMPLOYEESDATA.map(employee => `${employee.forename} ${employee.surname}`);
      var studentsFullNames = STUDENTSDATA.map(student => `${student.forename} ${student.surname}`);
      displayOutput(classData, employeesId, employeesFullNames, studentsFullNames);
    }
  });
  //Check isFound and output response
  if(isFound == false){
    alert("No classes found or input invalid");
  }
}

function displayOutput(classData,employeesId,employeesFullNames,studentsFullNames){

  //Create a header element to display the class name
  var classHeader = document.createElement("h1");
  classHeader.textContent = "Class: " + classData.name;
  classHeader.setAttribute("class", "output")
  document.body.appendChild(classHeader);
  
  //Create a header element to display the teacher names
  var teachersHeader = document.createElement("h2");
  teachersHeader.textContent = "Teacher/s: " + employeesFullNames.join(", ");
  teachersHeader.setAttribute("class", "output")
  document.body.appendChild(teachersHeader);
  
  //Create a paragraph element to display the student names
  var studentsParagraph = document.createElement("p1");
  studentsParagraph.textContent = "Students: " + studentsFullNames.join(", ");
  studentsParagraph.setAttribute("class", "output")
  document.body.appendChild(studentsParagraph);
}

function clearScreen(){
 // Clear the content by setting it to an empty string
 var outputElements = document.querySelectorAll(".output");
 outputElements.forEach(function(element){
  element.innerHTML = "";
  }) 
}
