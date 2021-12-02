const localDiv = document.getElementById("local");
const genderResult = document.getElementById("result_gender");
const probabilityResult = document.getElementById("result_probability");
const localGenderDiv = document.getElementById("local_gender");
const errorDiv = document.getElementById("error");
const resultError = document.getElementById("result_error");

const inquery = (e) => {
  e.preventDefault();
  errorDiv.style.display = "none";
  const validator = new RegExp(/[a-zA-Z\s]{1,255}/);
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
    localGenderDiv.innerText = localGender;
    localDiv.style.display = "block";
  }
};

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

const clearLocalStorage = () => {
  const name = document.getElementById("name").value;
  localStorage.removeItem(name);
  localDiv.style.display = "none";
};

capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const errorDisplay = (error) => {
  localDiv.style.display = genderResult.style.display = probabilityResult.style.display =
    "none";
  errorDiv.style.display = "block";
  resultError.innerText = error;
};
const form = document.getElementById("application_form");
form.addEventListener("submit", inquery);

const saveBtn = document.getElementById("application_form_save");
saveBtn.addEventListener("click", saveName);

const clearBtn = document.getElementById("local_clear");
clearBtn.addEventListener("click", clearLocalStorage);
