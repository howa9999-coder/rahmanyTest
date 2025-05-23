// Initialize the map and set the view to Casablanca

var map = L.map('map').setView([33.5731, -7.5898], 6); // Default to Casablanca


// Try to get user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Success - center map on user's location
            map.setView([position.coords.latitude, position.coords.longitude], 12);
        },
        function(error) {
            // Error - keep default Casablanca view
            console.error("Geolocation error:", error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
} else {
    // Geolocation not supported - keep default Casablanca view
    console.log("Geolocation is not supported by this browser");
}

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

var OpenSeaMap = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
}).addTo(map);


	// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
	var OWM_API_KEY = '06aac0fd4ba239a20d824ef89602f311';

	var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: 'files/NT2.png', appId: OWM_API_KEY});
	var cloudscls = L.OWM.cloudsClassic({opacity: 0.5, appId: OWM_API_KEY});
	var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: OWM_API_KEY} );
	var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5, appId: OWM_API_KEY});
	var rain = L.OWM.rain({opacity: 0.5, appId: OWM_API_KEY});
	var raincls = L.OWM.rainClassic({opacity: 0.5, appId: OWM_API_KEY});
	var snow = L.OWM.snow({opacity: 0.5, appId: OWM_API_KEY});
	var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
	var pressurecntr = L.OWM.pressureContour({opacity: 0.5, appId: OWM_API_KEY});
	var temp = L.OWM.temperature({opacity: 0.5, appId: OWM_API_KEY});
	var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});

 	var localLang = getLocalLanguage();

	var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'leaflet/owmloading.gif', minZoom: 5,
			appId: OWM_API_KEY});



// Reset view - tries geolocation first, falls back to Casablanca
function home() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success - center map on user's location
                map.setView([position.coords.latitude, position.coords.longitude], 11);
            },
            function(error) {
                // Error - fall back to default Casablanca view
                console.error("Geolocation error:", error.message);
                map.setView([33.5731, -7.5898], 6);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        // Geolocation not supported - use default Casablanca view
        console.log("Geolocation is not supported by this browser");
        map.setView([33.5731, -7.5898], 6);
    }
}
//full screen
var btn = document.getElementById("full-screen");
var body= document.querySelector('body');
function fullScreenview(){
  body.requestFullscreen();

};

// Create a new instance of the measurement control
var measureControl = L.control.measure({
    position: 'bottomleft'
  });
  
  // Add the measurement control to the map
  var measureControl = new L.Control.PolylineMeasure({
    position: 'topleft',
    unit: 'metres',
    showBearings: true,
    clearMeasurementsOnStop: false,
    showClearControl: true,
    showUnitControl: true,
    measureControlTitleOn: 'Turn on PolylineMeasure',
    measureControlTitleOff: 'Turn off PolylineMeasure',
    measureControlLabel: '&#8614;',
    backgroundColor: 'white',
    cursor: 'crosshair',
    clearControlTitle: 'Clear Measurements',
    unitControlTitle: {
      text: 'Change Units',
      metres: 'Meters',
      kilometres: 'Kilometers',
      feet: 'Feet',
      landmiles: 'Miles (Land)',
      nauticalmiles: 'Nautical Miles',
      yards: 'Yards',
      surveyfeet: 'Survey Feet',
      surveychains: 'Survey Chains',
      surveylinks: 'Survey Links',
      surveymiles: 'Survey Miles'
    }
  });
  
  measureControl.addTo(map);
//////////////////DRAW PLUG IN //////////////////////////////////////////////////////////
// Get the color picker element
const colorPicker = document.getElementById('color-picker');

// Initialize draw controls with dynamic color
var drawControl = map.pm.addControls({
  position: 'topleft',
  drawCircle: true,
  drawRectangle: true,
  drawPolygon: true,
  drawMarker: true,
  drawCircleMarker: true,
  drawPolyline: true,
  cutPolygon: true,
  removalMode: true,
  editMode: true,
  dragMode: true,
  pinningOption: true,
  snappingOption: true,
  snapping: {}, // Configure if needed
  tooltips: true,
  templineStyle: {
    color: 'green',
    dashArray: '5,5',
  },
  hintlineStyle: {
    color: 'white',
    dashArray: '1,5',
  },
  pathOptions: {
    color: colorPicker.value, // Use selected color
    fillColor: colorPicker.value, // Same for fill (adjust if needed)
    fillOpacity: 0.4,
  },
});

// Disable drawing mode for circles and markers by default (if needed)
map.pm.disableDraw('Circle');
map.pm.disableDraw('Marker');

// Create a layer group for drawn shapes
var drawLayer = L.layerGroup().addTo(map);

// Update color when a new color is picked
colorPicker.addEventListener('input', function() {
  map.pm.setPathOptions({
    color: this.value,
    fillColor: this.value, // Optional: Use a different fill color
    fillOpacity: 0.4,
  });
});

// Add new shapes to the layer group 
map.on('pm:create', function(e) {
  drawLayer.addLayer(e.layer);
  
  // Add minimal properties if needed (without popup)
  e.layer.feature = e.layer.feature || {};
  e.layer.feature.type = "Feature";
  e.layer.feature.properties = {
    createdAt: new Date().toISOString()
  };
});

  function down() {
    if (!drawLayer || drawLayer.getLayers().length === 0) {
      alert('No drawn elements to download!');
      return;
    }
    
    const geoJson = {
      type: 'FeatureCollection',
      features: drawLayer.getLayers().map(layer => {
        // For markers
        if (layer instanceof L.Marker) {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [layer.getLatLng().lng, layer.getLatLng().lat]
            },
            properties: layer.feature?.properties || {}
          };
        }
        
        // For other layers
        const geojson = layer.toGeoJSON();
        if (layer.feature?.properties) {
          geojson.properties = {
            ...geojson.properties,
            ...layer.feature.properties
          };
        }
        return geojson;
      })
    };
    
    // Create a download link
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geoJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'drawn_elements.geojson');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

//LAYER CONTROL
var baseMaps = {
    "CartoDB_DarkMatter": CartoDB_DarkMatter,
    "OpenStreetMap": osm,
    "Google Sat": googleSat
  };
  	var overlayMaps = {};
	overlayMaps[getI18n('OpenSeaMap')] = OpenSeaMap;
	overlayMaps[getI18n('Clouds')] = clouds;
	overlayMaps[getI18n('Cloudscls')] = cloudscls;
	overlayMaps[getI18n('Precipitation')] = precipitation;
	overlayMaps[getI18n('Precipitationcls')] = precipitationcls;
	overlayMaps[getI18n('Rain')] = rain;
	overlayMaps[getI18n('Raincls')] = raincls;
	overlayMaps[getI18n('Snow')] = snow;
	overlayMaps[getI18n('Temp')] = temp;
	overlayMaps[getI18n('Windspeed')] = wind;
	overlayMaps[getI18n('Pressure')] = pressure;
	overlayMaps[getI18n('Presscont')] = pressurecntr;
	overlayMaps[getI18n('City') + " (min Zoom 5)"] = city;
  overlayMaps[getI18n('Drawing')] = drawLayer;
  
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(map);

//Add scalebar to map
L.control.scale({metric: true, imperial: false, maxWidth: 100}).addTo(map);

//mousemove coordinates
const coordinates = document.getElementById("coordinates")
function onMapMove(e){
    let lat = e.latlng.lat
    let lng = e.latlng.lng
    coordinates.innerHTML = "";
    coordinates.innerHTML = `
    <div>
    <p> <b> Lat: </b> ${lat} </p>
    <p> <b> Lng: </b> ${lng} </p>
    </div>
    `;
}
map.on('mousemove', onMapMove)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Weather Forcast

const checkbox = document.getElementById("myCheckbox");
const dailyCheckbox = document.getElementById("myDailyCheckbox");
const weatherResult = document.getElementById("weather-result");
const weatherResult2 = document.getElementById("weather-result2");
const dailyWeatherResult = document.getElementById("daily-weather-result");

function onMapClick(e) {
  if (checkbox.checked) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m` 
    const api2 = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height,swell_wave_height,swell_wave_direction,swell_wave_period,ocean_current_velocity,ocean_current_direction,sea_surface_temperature,wind_wave_direction,sea_level_height_msl&wind_speed_unit=kn`
    async function getData(){
            try{
                const response = await fetch(api)
                const data = await response.json();        
                const temperature = data.current.temperature_2m;
                const windSpeed = data.current.wind_speed_10m;
                weatherResult.innerHTML = "";
                weatherResult.innerHTML = "......";
                weatherResult.innerHTML = `
                    <div>Lat: ${lat}</div>
                    <div>Lng: ${lng}</div>
                    <div><b>Temperature: ${temperature} °C</b></div>
                    <div><b>Wind Speed: ${windSpeed} km/h</b></div>
                            `;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherResult.innerHTML = "Error loading weather data";
      }
    }
    getData();
        async function getData2(){
            try{
                const response = await fetch(api2)
                const data = await response.json();  
                const oceanCurrentDirection = data.current.ocean_current_direction
                const oceanCurrentVelocity = data.current.ocean_current_velocity
                const seaLevelHeight = data.current.sea_level_height_msl
                const seaSurfaceTemperature = data.current.sea_surface_temperature
                const swellWaveDirection = data.current.swell_wave_direction
                const swellWaveHeight = data.current.swell_wave_height
                const swellWavePeriod = data.current.swell_wave_period
                const waveHeight = data.current.wave_height
                const windWaveDirection = data.current.wind_wave_direction
                weatherResult2.innerHTML = "";
                weatherResult2.innerHTML = "......";
                weatherResult2.innerHTML = `
                    <div><b>Ocean Current Direction:</b> ${oceanCurrentDirection} °</div>
                    <div><b>Ocean Current Velocity:</b> ${oceanCurrentVelocity} kn</div>
                    <div><b>Sea Level Height:</b> ${seaLevelHeight} m</div>
                    <div><b>Sea Surface Temperature:</b> ${seaSurfaceTemperature} °C</div>
                    <div><b>Swell Wave Direction:</b> ${swellWaveDirection} °</div>
                    <div><b>Swell Wave Height:</b> ${swellWaveHeight} m</div>
                    <div><b>Swell Wave Period:</b> ${swellWavePeriod} s</div>
                    <div><b>Wave Height:</b> ${waveHeight} m</div>
                    <div><b>Wind Wave Direction:</b> ${windWaveDirection} °</div>

                            `;

      } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherResult.innerHTML = "Error loading weather data";
      }
    }
    getData2();
  }

  if (dailyCheckbox.checked) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const api3 = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&daily=wave_direction_dominant,wind_wave_direction_dominant,swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max&forecast_days=1&wind_speed_unit=kn` 
        async function getData3(){
            try{
                const response = await fetch(api3)
                const dailyData = await response.json();  
                const waveDirectionDominant = dailyData.daily.wave_direction_dominant 
                const  windWaveDirectionDominant = dailyData.daily.wind_wave_direction_dominant
                const  swell_wave_direction_dominant = dailyData.daily.swell_wave_direction_dominant
                const  swell_wave_height_max = dailyData.daily.swell_wave_height_max
                const  swell_wave_period_max= dailyData.daily.swell_wave_period_max

                dailyWeatherResult.innerHTML = "";
                dailyWeatherResult.innerHTML = "......";
                dailyWeatherResult.innerHTML = `
                    <div>Lat: ${lat}</div>
                    <div>Lng: ${lng}</div>
                    <div><b>wave Direction Dominant:</b> ${waveDirectionDominant} °</div>
                    <div><b>wind Wave Direction Dominant:</b> ${windWaveDirectionDominant} °</div>
                    <div><b>Swell Wave Direction Dominant:</b> ${swell_wave_direction_dominant} °</div>
                    <div><b>Swell Wave Height Max:</b> ${swell_wave_height_max} m</div>
                    <div><b>Swell Wave Period Max:</b> ${swell_wave_period_max} s</div>
                            `; 

      } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherResult.innerHTML = "Error loading weather data";
      }
    }
    getData3();
  }
}   
map.on('click', onMapClick)


