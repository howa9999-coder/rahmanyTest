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
      "OpenStreetMap": osm
  };
  
  var overlayMaps = {
    "OpenSeaMap": OpenSeaMap,
    "Drawing layer": drawLayer
  };
  L.control.layers(baseMaps, overlayMaps).addTo(map);

//Add scalebar to map
L.control.scale({metric: true, imperial: false, maxWidth: 100}).addTo(map);








