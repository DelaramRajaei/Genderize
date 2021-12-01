inquery = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const url = `https://api.genderize.io/?name=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      document.getElementById(result_gender).innerText = result.gender;
      document.getElementById(result_probability).innerText = result.probability;
    })
    .catch((err) => console.error(err));
};

const form = document.getElementById("application_form");
form.addEventListener("submit", inquery);
