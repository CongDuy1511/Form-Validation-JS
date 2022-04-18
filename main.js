const isStringNumber = (str) => {
    const regExpPattern = /\d+/g;
  
    if (regExpPattern.test(str)) {
      return true;
    }
  
    return false;
  };
  
  /**
   * ================================================
   * CREATE ARRAY OF PERSONS
   * ================================================
   */
  const inputNumber = prompt("Please input your number of persons: ");
  const MAX_PERSON = isStringNumber(inputNumber) ? parseInt(inputNumber) : 10;
  const NAMES = ["hung", "hoang", "long", "son", "khanh", "minh"];
  const AGES = [12, 22, 34, 23, 45];
  const GENDERS = ["male", "female", "others"];
  let COLUMNS = [
    "Fullname",
    "age",
    "email",
    "gender",
    "BMI",
    "health status",
    "action",
  ];
  
  // convert to uppercase for all column headers
  COLUMNS = COLUMNS.map((columnName) => columnName.toUpperCase());
  
  /**
   * random a integer number
   * @param {number} min
   * @param {number} max
   * @returns
   */
  function rd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // create PROTOTYPE Person to store all properties and methods
  const Person = function (
    fullName,
    age,
    email,
    gender,
    height,
    weight,
    address
  ) {
    // properties
    this.fullName = fullName;
    this.age = age;
    this.email = email;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.address = address;
  
    // method
    this.calculateBMI = function () {
      const BMI = weight / Math.pow(height, 2);
      return BMI;
    };
  
    this.guessHealth = function () {
      const BMIValue = this.calculateBMI();
  
      if (BMIValue < 18.5) {
        return "underweight";
      }
  
      if (BMIValue >= 18.5 && BMIValue <= 24.9) {
        return "normal weight";
      }
  
      if (BMIValue >= 25 && BMIValue <= 29.9) {
        return "overweight";
      }
  
      return "obesity";
    };
  };
  
  /**
   * generate list of person objects
   * @returns
   */
  function generatePersons() {
    const arrPersons = [];
  
    for (let count = 1; count <= MAX_PERSON; count++) {
      // create person
      const person = new Person(
        NAMES[rd(0, NAMES.length - 1)],
        AGES[rd(0, AGES.length - 1)],
        "myemail@gmail.com",
        GENDERS[rd(0, GENDERS.length - 1)],
        170,
        45,
        "123 Tran Cao Van"
      );
  
      person.BMI = person.calculateBMI();
      person.healthStatus = person.guessHealth();
  
      arrPersons.push(person);
    }
  
    return arrPersons;
  }
  
  // execute
  const persons = generatePersons();
  
    
  /**
   * ================================================
   * CREATE TABLE
   * ================================================
   */
  
  /**
   * create table headers
   * @param {array} columns list of columns
   * @returns {object} a part of table store columns data
   */
   const createTableHeaders = (columns) => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
  
    columns.forEach((columnName) => {
      const th = document.createElement("th");
      th.innerText = columnName;
      tr.appendChild(th);
    });
  
    thead.appendChild(tr);
  
    return thead;
  };
  
  /**
   * create table of content
   * @param {array} persons list of person objects
   * @returns {object} table body content
   */
  const createTableContent = (persons) => {
    const tbody = document.createElement("tbody");
  
    persons.forEach((personObj) => {
      const tr = document.createElement("tr");
  
      // create each td for each properties
      const tdFullName = document.createElement("td");
      tdFullName.innerText = personObj.fullName;
  
      const tdAge = document.createElement("td");
      tdAge.innerText = personObj.age;
  
      const tdEmail = document.createElement("td");
      tdEmail.innerText = personObj.email;
  
      const tdGender = document.createElement("td");
      tdGender.innerText = personObj.gender;
  
      const tdBMI = document.createElement("td");
      tdBMI.innerText = personObj.BMI;
  
      const tdHealthStatus = document.createElement("td");
      tdHealthStatus.innerText = personObj.healthStatus;
  
      const tdAction = document.createElement("td");
      tdAction.innerHTML = `
    <button type="button">Edit</button>
    <button type="button">Delete</button>
  `;
  
      // binding into tr element
      tr.append(
        tdFullName,
        tdAge,
        tdEmail,
        tdGender,
        tdBMI,
        tdHealthStatus,
        tdAction
      );
  
      // binding into tbody element
      tbody.appendChild(tr);
    });
  
    return tbody;
  };
  
  /**
   * this function create table of data
   * @param {array} columns list of columns
   * @param {array} persons list of person objects
   */
  const createTable = (columns, persons) => {
    const body = document.querySelector("body");
    const table = document.createElement("table");
    const thead = createTableHeaders(columns);
    const tbody = createTableContent(persons);
  
    // bind thead & tbody into table
    table.append(thead, tbody);
  
    // binding class "table table-strip" for css styling
    table.classList.add("table", "table-striped");
  
    // bind table into body
    body.appendChild(table);
  };
  
  // execute
  createTable(COLUMNS, persons);
  
  /**
   * ================================================
   * CREATE Form Adding Person
   * ================================================
   */
  
  const $ = (value) => {
    return document.getElementById(value);
  };
  
  const formValidation = {
    isFullNameValid: false,
    isAgeValid: false,
    isEmailValid: false,
  };
  
  // validate fullNameInput
  const fullNameInput = $("fullNameInput");
  fullNameInput.addEventListener("change", () => {
    const value = fullNameInput.value;
    const fullNameMessage = $("fullNameMessage");
  
    if (value.length <= 50 && value.length > 0) {
      fullNameMessage.innerText = "Good job!";
      fullNameMessage.setAttribute("class", "text-success");
      formValidation.isFullNameValid = true;
      return true;
    }
  
    fullNameMessage.innerText = "Max lenght 50 characters!";
    fullNameMessage.setAttribute("class", "text-danger");
    formValidation.isFullNameValid = false;
  
    return false;
  });
  
  // validate age input
  const ageInput = $("ageInput");
  
  // set default age
  ageInput.value = 18;
  
  ageInput.addEventListener("change", () => {
    const ageMessage = $("ageMessage");
  
    if (ageInput.value.length > 0) {
      ageMessage.innerText = "Good job!";
      ageMessage.setAttribute("class", "text-success");
      formValidation.isAgeValid = true;
      return true;
    }
  
    ageMessage.innerText = "Good job!";
    ageMessage.setAttribute("class", "text-danger");
    formValidation.isAgeValid = false;
    return false;
  });
  
  // validate email
  const emailInput = $("emailInput");
  emailInput.addEventListener("change", () => {
    const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]{3,5}.[a-zA-Z]{2,5}/g;
    const emailMessage = $("emailMessage");
  
    if (emailPattern.test(emailInput.value)) {
      emailMessage.innerText = "Good job!";
      emailMessage.setAttribute("class", "text-success");
      formValidation.isEmailValid = true;
      return true;
    }
  
    emailMessage.innerText = "Wrong email format!";
    emailMessage.setAttribute("class", "text-danger");
    formValidation.isEmailValid = false;
    return false;
  });
  
  const validateForm = () => {
    Object.keys(formValidation).forEach((key) => {
      if (!formValidation[key]) {
        return false;
      }
    });
  
    // enable button
    $("btnAdd").classList.remove("disabled");
  
    return true;
  };
  
  /**
   * ================================================
   *  ADD DATA TO TABLE
   * ================================================
   */
  
   const add = document.getElementById("add");
  
   const arrPerson = [];
   
   function addBtn() {
       let isName = false;
       let isAge = false;
       let isEmail = false;
       let isHeight = false;
       let isWeight = false;
       let isAddress = false;
   
       // Fullname
       const nameInput = document.getElementById("nameInput");
       const nameValue = nameInput.value;
       if (!nameValue || nameValue.length > 50) {
       const nameError = document.getElementById("nameError");
       nameError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isName = true;
       }
   
       // Age
       const ageInput = document.getElementById("ageInput");
       const ageValue = ageInput.value;
       if (!ageValue) {
       const ageError = document.getElementById("ageError");
       ageError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isAge = true;
       }
   
       // email
       const emailInput = document.getElementById("emailInput");
       const emailValue = emailInput.value;
       const emailPattern = /^[a-zA-Z0-9]+@([a-zA-Z]{3,10}).([a-zA-Z]{3,5})$/g;
       if (!emailPattern.test(emailValue)) {
           const emailError = document.getElementById("emailError");
           emailError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isEmail = true;
       }
   
       // gender
       const listRadioOptions = document.getElementsByName("gender");
       let selectedRadio = null;
   
       listRadioOptions.forEach((radioObj) => {
           if (radioObj.checked) {
           selectedRadio = radioObj.value;
           }
       });
   
       // Height
       const heightInput = document.getElementById("heightInput");
       const heightValue = heightInput.value;
       if (!heightValue) {
       const heightError = document.getElementById("heightError");
       heightError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isHeight = true;
       }
   
       // Weight
       const weightInput = document.getElementById("weightInput");
       const weightValue = weightInput.value;
       if (!weightValue) {
       const weightError = document.getElementById("weightError");
       weightError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isWeight = true;
       }
   
       // Address
       const addressInput = document.getElementById("addressInput");
       const addressValue = addressInput.value;
       if (!addressValue || addressValue.length > 100) {
       const addressError = document.getElementById("addressError");
       addressError.innerHTML = "<div style='color: red;'>Invalid</div>";
       } else {
           isAddress = true;
       }
   
       const tbody = document.getElementById('tbody');
       const td = document.getElementById('td');
       tbody.appendChild(td);
   
       if (isName && isEmail && isAge && isHeight && isWeight && isAddress) {
           const person = [
           nameValue,
           ageValue,
           emailValue,
           genderValue,
           heightValue,
           weightValue,
           addressValue,
           ];
   
           arrPerson.push(person);
           td.push(arrPerson);
           alert("Successfully add");
       }
   }
   
   
   // binding event handler for btn add
   add.addEventListener("click", addBtn);