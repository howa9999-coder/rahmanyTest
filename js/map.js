const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Toggle between bars and times icon
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
let sideBar = true
document.querySelector('#tools').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar')
    if(sideBar){
        sidebar.style.display = "block";
        sideBar = false
    }else{
        sidebar.style.display = "none";
        sideBar = true
    }
})
function toggleContent(button) {
    const cont = button.closest('.cont');
    const content = cont.querySelector('.content'); // Assuming your content is inside a div with class 'content'

    if (content.style.display === 'none' || content.style.display === '') {
        // Show the content
        content.style.display = 'block';
        button.innerText = '-';
        cont.classList.add('expanded');
    } else {
        // Hide the content
        content.style.display = 'none';
        button.innerText = '+';
        cont.classList.remove('expanded');
    }
}
function btnFunction(param, btnClose){
    const contact = document.querySelector(param);
    const btn = document.querySelector(btnClose);
    contact.style.display = 'block'
    btn.innerHTML = "-"
}

// Initialize the map and set the view to Casablanca
var map = L.map('map').setView([33.5731, -7.5898], 6);

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

// Reset view
function home(){
    map.setView([33.5731, -7.5898], 6); // Use setView on the existing map instance
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
//draw
///////////////////DRAW PLUG IN //////////////////////////////////////////////////////////

// Initialize the Geoman Pro plugin with all available controls
/* var drawControl = map.pm.addControls({
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
    snapping: {
      // Configure snapping options if needed
    },
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
      color: 'red',
      fillColor: 'blue',
      fillOpacity: 0.4,
    },
  });
  // Disable drawing mode for circles and markers by default
  map.pm.disableDraw('Circle');
  map.pm.disableDraw('Marker');
  var drawLayer;
 // Create a layer group to hold the drawn shapes
drawLayer = L.layerGroup().addTo(map);

// Listen to when shapes are created and add them to the drawLayer
map.on('pm:create', function(e) {
  const layer = e.layer;
  drawLayer.addLayer(layer);
}); */

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

// Disable drawing mode for circles and markers by default
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
});


let currentLayer = null;

// Show form when a feature is created
map.on('pm:create', function(e) {
  currentLayer = e.layer;
  document.getElementById('feature-form').style.display = 'block';
});
// Save feature data
document.getElementById('save-feature').addEventListener('click', function() {
    if (currentLayer) {
      const name = document.getElementById('feature-name').value;
      const description = document.getElementById('feature-desc').value;
      const type = document.getElementById('feature-type').value;
      
      // Store properties
      currentLayer.feature = currentLayer.feature || {};
      currentLayer.feature.type = "Feature";
      currentLayer.feature.properties = {
        name: name,
        description: description,
        type: type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to layer group
      drawLayer.addLayer(currentLayer);
      
      // Create editable popup content
      updatePopupContent(currentLayer);
      
      // Close form and reset
      document.getElementById('feature-form').style.display = 'none';
      resetForm();
      currentLayer = null;
    }
  });
  function updatePopupContent(layer) {
    const properties = layer.feature.properties;
    let popupContent = `
      <div class="feature-popup">
        <h3>Feature Properties</h3>
        <div id="feature-properties-view">
          ${Object.entries(properties).map(([key, value]) => `
            <div class="property-row">
              <strong>${key}:</strong> <span id="prop-${key}">${value}</span>
            </div>
          `).join('')}
        </div>
        <div id="feature-properties-edit" style="display:none;">
          <form id="edit-properties-form">
            ${Object.entries(properties).map(([key, value]) => `
              <div class="form-group">
                <label for="edit-${key}">${key}:</label>
                <input type="text" id="edit-${key}" value="${value}" class="form-control">
              </div>
            `).join('')}
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary cancel-edit">Cancel</button>
          </form>
        </div>
        <button id="edit-properties-btn" class="btn btn-sm btn-warning">Edit</button>
      </div>
    `;
    
    layer.bindPopup(popupContent, { maxWidth: 300 });
    
    // When popup opens, set up event listeners
    layer.on('popupopen', function() {
      const popup = layer.getPopup();
      const content = popup.getElement();
      
      // Edit button click handler
      content.querySelector('#edit-properties-btn').addEventListener('click', function() {
        content.querySelector('#feature-properties-view').style.display = 'none';
        content.querySelector('#feature-properties-edit').style.display = 'block';
        this.style.display = 'none';
      });
      
      // Cancel edit button
      content.querySelector('.cancel-edit').addEventListener('click', function() {
        content.querySelector('#feature-properties-view').style.display = 'block';
        content.querySelector('#feature-properties-edit').style.display = 'none';
        content.querySelector('#edit-properties-btn').style.display = 'block';
      });
      
      // Form submit handler
      content.querySelector('#edit-properties-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update properties
        Object.keys(properties).forEach(key => {
          const input = content.querySelector(`#edit-${key}`);
          properties[key] = input.value;
          content.querySelector(`#prop-${key}`).textContent = input.value;
        });
        
        // Add updated timestamp
        properties.updatedAt = new Date().toISOString();
        
        // Switch back to view mode
        content.querySelector('#feature-properties-view').style.display = 'block';
        content.querySelector('#feature-properties-edit').style.display = 'none';
        content.querySelector('#edit-properties-btn').style.display = 'block';
        
        // Close and reopen popup to ensure proper rendering
        layer.closePopup();
        setTimeout(() => layer.openPopup(), 50);
      });
    });
  }
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
/* 
// Save feature data
document.getElementById('save-feature').addEventListener('click', function() {
  if (currentLayer) {
    const name = document.getElementById('feature-name').value;
    const description = document.getElementById('feature-desc').value;
    const type = document.getElementById('feature-type').value;
    
    // Store properties
    currentLayer.feature = currentLayer.feature || {};
    currentLayer.feature.type= "Feature",
    currentLayer.feature.properties = {
      name: name,
      description: description,
      type: type,
      createdAt: new Date().toISOString()
    };
    
    // Add to layer group
    drawLayer.addLayer(currentLayer);
    
    // Add popover with the data
    currentLayer.bindPopup(`
      <b>${name || 'Unnamed Feature'}</b><br>
      Type: ${type}<br>
      ${description ? 'Description: ' + description : ''}
    `);
    
    // Close form and reset
    document.getElementById('feature-form').style.display = 'none';
    resetForm();
    currentLayer = null;
  }
});

// Cancel button
document.getElementById('cancel-feature').addEventListener('click', function() {
  if (currentLayer) {
    map.removeLayer(currentLayer);
    document.getElementById('feature-form').style.display = 'none';
    resetForm();
    currentLayer = null;
  }
});

// Reset form function
function resetForm() {
  document.getElementById('feature-name').value = '';
  document.getElementById('feature-desc').value = '';
  document.getElementById('feature-type').value = 'building';
}

// Make features clickable to show popup
map.on('click', function(e) {
  // This ensures clicks on features will trigger their popups
  if (e.originalEvent && e.originalEvent.propagatedFrom) {
    e.originalEvent.propagatedFrom.fire('click');
  }
});

function down() {
    if (!drawLayer || drawLayer.getLayers().length === 0) {
      alert('No drawn elements to download!');
      return;
    }
    
    const geoJson = {
      type: 'FeatureCollection',
      features: drawLayer.getLayers().map(layer => {
        if (layer instanceof L.Marker) {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [layer.getLatLng().lng, layer.getLatLng().lat]
            },
            properties: layer.feature?.properties || {} // Include any stored properties
          };
        }
        
        // For other layer types, ensure properties are included
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
  } */

//LAYER CONTROL
var baseMaps = {
    "CartoDB_DarkMatter": CartoDB_DarkMatter,
    "OpenStreetMap": osm,
    "Google Sat": googleSat
  };
  
  var overlayMaps = {
    "OpenSeaMap": OpenSeaMap,
    "Drawing layer": drawLayer
  };
 var loadedLayers = {}; // To store loaded layers for searching
// GeoJSON data variable
var dataJson = {
  "geojsonLayers": [
    {
      "name": "Lighthouse",
      "type": "point",
      "link": "../json/myGeojsonLayers/phares.geojson",
      "color": "#FF5733"
    },
    {
      "name": "Ports",
      "type": "point",
      "link": "../json/myGeojsonLayers/ports.geojson",
      "color": "#2980B9"
    },
    {
      "name": "Territorial Sea",
      "type": "polygon",
      "link": "../json/myGeojsonLayers/12NM.geojson",
      "color": "#2ECC71"
    },
    {
      "name": "Internal Waters",
      "type": "polygon",
      "link": "../json/myGeojsonLayers/Internal_waters.geojson",
      "color": "#3498DB"
    },
    {
      "name": "Contiguous Zone",
      "type": "polygon",
      "link": "../json/myGeojsonLayers/24NM.geojson",
      "color": "#8E44AD"
    },
    {
      "name": "Exclusive Economic Zone",
      "type": "polygon",
      "link": "../json/myGeojsonLayers/ZEEpoly.geojson",
      "color": "#F1C40F"
    },
    {
      "name": "MPA",
      "type": "polygon",
      "link": "../json/myGeojsonLayers/AMP_Maroc.geojson",
      "color": "#27AE60"
    }
  ]
};
// Load and process layers
function loadLayers() {
  const layerPromises = dataJson.geojsonLayers.map(layerInfo => {
      return fetch(layerInfo.link)
          .then(response => {
              if (!response.ok) throw new Error(`Failed to load ${layerInfo.link}`);
              return response.json();
          })
          .then(geojson => {
              const layer = L.geoJSON(geojson, {
                  pointToLayer: (feature, latlng) => {
                      return layerInfo.type === 'point' 
                          ? L.circleMarker(latlng, {
                              radius: 5,
                              color: layerInfo.color || 'blue',
                              fillOpacity: 0.8
                          })
                          : undefined;
                  },
                  style: layerInfo.type === 'polygon' ? {
                      color: layerInfo.color || 'blue'
                  } : undefined,
                  onEachFeature: (feature, layer) => {
                      const properties = Object.entries(feature.properties || {})
                          .map(([key, value]) => `<b>${key}:</b> ${value}`)
                          .join('<br>');
                      layer.bindPopup(`<b>${layerInfo.name}</b><br>${properties}`);
                  }
              });
              // Store layer for overlay and searching
              overlayMaps[layerInfo.name] = layer;
              loadedLayers[layerInfo.name] = geojson;
              // Populate the select dropdown
               const selectLayer = document.querySelector('#select-layer');
              // Check if the option already exists before adding
              if (![...selectLayer.options].some(option => option.value === layerInfo.name)) {
                  const option = document.createElement('option');
                  option.value = layerInfo.name; // Assign the layer name as the value
                  option.textContent = layerInfo.name; // Display the layer name as the option text
                  selectLayer.appendChild(option); // Add the option to the select element
              } 
              return layer;
          });
  });
  return Promise.all(layerPromises);
}
// Function to add the layer control
function layerControl() {
L.control.layers(baseMaps, overlayMaps).addTo(map);
}
// Initialize and load the layers
loadLayers().catch(error => console.error(error));

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
