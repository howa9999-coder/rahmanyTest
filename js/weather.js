// API key: ee820f9a-24e7-11f0-a2ce-0242ac130003-ee82109e-24e7-11f0-a2ce-0242ac130003

const X = 58.7984;
const Y = 17.8081;
const apiKey= 'ee820f9a-24e7-11f0-a2ce-0242ac130003-ee82109e-24e7-11f0-a2ce-0242ac130003';
const params = 'waveHeight,airTemperature';

fetch(`https://api.stormglass.io/v2/weather/point?lat=${X}&lng=${Y}&params=${params}`, {
  headers: {
    'Authorization': apiKey
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
  console.log(jsonData)
});