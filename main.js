const localDiv = document.getElementById("local");
const genderResult = document.getElementById("result_gender");
const probabilityResult = document.getElementById("result_probability");
const localGenderDiv = document.getElementById("local_gender");
const errorDiv = document.getElementById("error");
const resultError = document.getElementById("result_error");

/**
 * This function is for getting the query for the given url using the fetch function.
 * Used preventDefault so that by submiting, the page won't be refreshed.
 * The validator is used for cheaking the limitation of the name - the name should be
 * uppercase, lowercase or have a space. If it is not an error is displayed on the screen.
 * After getting the information about gender and probability, it is going to be displayed on screen.
 * Then it is going to check if the this name have already exists. If it is true then the local section will show the 
 * last saved result.
 * Also this function checks if the given name exists. If not it is going to show an error.
 * 
 * @param {*} e event 
 */
const inquery = (e) => {
  e.preventDefault();
  errorDiv.style.display = "none";
  const validator = new RegExp(/^[a-zA-Z\s]{1,255}$/);
  const name = document.getElementById("name").value;
  if (!validator.test(name)) {
    genderResult.style.display = probabilityResult.style.display = "none";
    errorDisplay('Name is not accepted!');
    return console.log("error input");
  }
  const url = `https://api.genderize.io/?name=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      genderResult.innerText = capitalizeFirstLetter(result.gender);
      probabilityResult.innerText = result.probability;
      genderResult.style.display = probabilityResult.style.display = "block";
    })
    .catch((err) => errorDisplay('Name does not exist!'));

  const localGender = localStorage.getItem(name);

  if (!localGender) {
    localDiv.style.display = "none";
  } else {
    localGenderDiv.innerText = capitalizeFirstLetter(localGender);
    localDiv.style.display = "block";
  }
};

/**
 * This function is called when user click on the save button.
 * It is going to save the name and gender on local storage.
 */
const saveName = () => {
  const name = document.getElementById("name").value;

  document.getElementsByName("gender").forEach((elem) => {
    if (elem.checked || elem.checked === "checked") {
      localStorage.setItem(name, elem.value);
      localGenderDiv.innerText = capitalizeFirstLetter(elem.value);
      localDiv.style.display = "block";
    }
  });
};

/**
 * If the user want to clear saved gender for the name, after clicking on the clear button,
 * the data will be cleared and the display of local section is changed to none.
 */
const clearLocalStorage = () => {
  const name = document.getElementById("name").value;
  localStorage.removeItem(name);
  localDiv.style.display = "none";
};

/**
 * Get a string as an input and capitalize the first letter.
 */
capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * This function is for displaying all the errors whether it is an uncorrect name 
 * or the name does not exists. This function will display the error section and 
 * insert the given error test.
 * @param {*} error the error text
 */
const errorDisplay = (error) => {
  localDiv.style.display = genderResult.style.display = probabilityResult.style.display =
    "none";
  errorDiv.style.display = "block";
  resultError.innerText = error;
};

/**
 * The inquery function will be called when the submit button is clicked!
 */
const form = document.getElementById("application_form");
form.addEventListener("submit", inquery);

/**
 * The saveName function will be called when the save button is clicked!
 */
const saveBtn = document.getElementById("application_form_save");
saveBtn.addEventListener("click", saveName);

/**
 * The clearLocalStorage function will be called when the clear button is clicked!
 */
const clearBtn = document.getElementById("local_clear");
clearBtn.addEventListener("click", clearLocalStorage);
