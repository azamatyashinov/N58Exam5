document.getElementById('dark-mode').addEventListener('change', function() {
    const darkModeElements = document.querySelectorAll('body');
    darkModeElements.forEach(element => {
        element.classList.toggle('dark', this.checked);
    });
});

const details = document.querySelectorAll('details');
const countriesDiv = document.getElementById("cards");
const filter = document.getElementById("filter");
const search = document.getElementById("search");
let countries = [];

function displayCountries(countries) {
  let str = "";
  countries.forEach((country) => {
    str += `
            <div class='card p-2  w-25' >
                <img src='${country.flags.svg}' alt='${
      country.name.official
    }' />   
                <h3> ${country.name.official}</h3>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>

            </div>
        `;
  });
  countriesDiv.innerHTML = str;
}

getAllCountries("https://restcountries.com/v3.1/all");

filter.addEventListener("change", function (e) {
  let value = filter.value;
  const filteredCountries = countries.filter((c) => c.region === value);
  console.log(filteredCountries);
  displayCountries(filteredCountries);
});

search.addEventListener("input", function (e) {
  let text = search.value;
  const searchedCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(text.toLowerCase())
  );
  displayCountries(searchedCountries);
});

async function getAllCountries(link) {
  try {
    const res = await fetch(link);
    const data = await res.json();
    countries = data;
    displayCountries(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getAllCountries("https://restcountries.com/v3.1/all");

filter.addEventListener("change", function (e) {
  let value = filter.value;
  const filteredCountries = countries.filter((c) => c.region === value);
  console.log(filteredCountries);
  displayCountries(filteredCountries);
});

countriesDiv.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const postId = card.dataset.postId;
        window.location.href = `card.html?postId=${postId}`;
    }
});








