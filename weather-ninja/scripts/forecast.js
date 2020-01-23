const key = 'CXmb8Oz3Gi2nutFcG3OI3kEdN8K4BOPI';

// get weather information
const getWeather = async cityKey => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city information
const getCity = async city => {
  // city search api end point
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  // to make a valid req to the api we need a query after the base url with the auth key and the city to search for
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  // return only the first match
  return data[0];
};

// getCity('Manchester')
//   .then(data => getWeather(data.Key))
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
