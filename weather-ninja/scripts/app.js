const cityform = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure properties
  // the const must be the same name as the properties we're getting from the object
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // display night or day in the placeholder
  time.setAttribute('src', weather.IsDayTime ? 'img/day.svg' : 'img/night.svg');

  // display the relative weather icon
  icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`);

  // remove the d-none class if present on card
  if (card.classList.contains('d-none')) card.classList.remove('d-none');
};

// updateCity will be async, because it will take some time to complete
const updateCity = async city => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityform.addEventListener('submit', e => {
  // prevent default action, so it doesn't refresh the page
  e.preventDefault();

  let city = cityform.city.value.trim();
  // clear out the form fields
  cityform.reset();

  // update the UI with the new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
