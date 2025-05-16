/* // Windy API options
const options = {
    key: 'rO7B9qEwTHmfThLTlH5JpydrGSbm3nIc', // REPLACE WITH YOUR KEY !!!
    lat: 38,
    lon: -4,
    zoom: 5,
};

// Initialize Windy API
windyInit(options, (windyAPI) => {
    const { map, picker, utils, broadcast, store } = windyAPI;
    
    // Add fullscreen control
    map.addControl(new L.Control.Fullscreen({
        position: 'topleft',
        title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
        }
    }));
    
    // Create a marker cluster group
    const markers = L.markerClusterGroup();
    
    // Add some sample markers
    const cities = [
        { name: "Madrid", lat: 40.4168, lon: -3.7038, population: 3266126 },
        { name: "Barcelona", lat: 41.3851, lon: 2.1734, population: 1620343 },
        { name: "Valencia", lat: 39.4699, lon: -0.3763, population: 791413 },
        { name: "Seville", lat: 37.3891, lon: -5.9845, population: 688711 },
        { name: "Zaragoza", lat: 41.6488, lon: -0.8891, population: 666880 },
        { name: "Málaga", lat: 36.7213, lon: -4.4216, population: 571026 },
        { name: "Murcia", lat: 37.9922, lon: -1.1307, population: 447182 },
        { name: "Palma", lat: 39.5696, lon: 2.6502, population: 409661 },
        { name: "Bilbao", lat: 43.2630, lon: -2.9350, population: 346405 },
        { name: "Alicante", lat: 38.3452, lon: -0.4810, population: 334887 }
    ];
    
    cities.forEach(city => {
        const marker = L.marker([city.lat, city.lon])
            .bindPopup(`<b>${city.name}</b><br>Population: ${city.population.toLocaleString()}`);
        markers.addLayer(marker);
    });
    

    

    

    

    
    // Add a legend
    const legend = L.control({ position: 'bottomleft' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'custom-control legend');
        div.innerHTML = `
            <h3>Population Heatmap</h3>
            <i style="background: blue"></i> Low<br>
            <i style="background: cyan"></i> Medium<br>
            <i style="background: lime"></i> High<br>
            <i style="background: yellow"></i> Very High<br>
            <i style="background: red"></i> Extreme<br>
        `;
        return div;
    };
    
  
    
    // Windy API event handlers
    picker.on('pickerOpened', ({ lat, lon, values, overlay }) => {
        console.log('Picker opened at', lat, lon, 'with values:', values, 'overlay:', overlay);
        
        const windObject = utils.wind2obj(values);
        console.log('Wind object:', windObject);
        
        // Add a marker at the picker location
        const pickerMarker = L.marker([lat, lon])
            .bindPopup(`<b>Wind Data</b><br>
                Speed: ${windObject.windSpeed.toFixed(1)} kts<br>
                Direction: ${windObject.windDeg}°<br>
                ${windObject.windDir}`)
            .addTo(map);
        
        // Add to marker cluster (will be removed when picker closes)
        markers.addLayer(pickerMarker);
    });
    
    picker.on('pickerMoved', ({ lat, lon, values, overlay }) => {
        console.log('Picker moved to', lat, lon, 'with values:', values, 'overlay:', overlay);
    });
    
    picker.on('pickerClosed', () => {
        console.log('Picker closed');
    });
    
    store.on('pickerLocation', ({ lat, lon }) => {
        console.log('Picker location changed to:', lat, lon);
    });
    
    // Wait until weather is rendered
    broadcast.once('redrawFinished', () => {
        console.log('Weather rendering finished');
        
        // Open picker at initial location
        picker.open({ lat: options.lat, lon: options.lon });
        
        // Add our layers to the map
        map.addLayer(markers);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
});
 */

const options = {
    key: 'rO7B9qEwTHmfThLTlH5JpydrGSbm3nIc', // REPLACE WITH YOUR KEY !!!
    lat: 38,
    lon: -4,
    zoom: 5,
};

windyInit(options, (windyAPI) => {
    const { map, picker, utils, broadcast, store } = windyAPI;
    
    // Base layers
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    
    // Set default base layer
    osmLayer.addTo(map);
    
    // Function to initialize layer control
    const initLayerControl = () => {
        // Wait until overlays are available
        if (!windyAPI.map || !windyAPI.map.overlays) {
            setTimeout(initLayerControl, 100);
            return;
        }
        
        // Get Windy overlays
        const windyOverlays = {};
        Object.entries(windyAPI.map.overlays).forEach(([key, overlay]) => {
            if (overlay.layer) {
                windyOverlays[overlay.name] = overlay.layer;
            }
        });
        
        // Create layer control
        L.control.layers({
            "OpenStreetMap": osmLayer,
            "windy": windyOverlays
        }, {
            position: 'topright',
            collapsed: false
        }).addTo(map);
    };
    
    // Wait for Windy to be fully ready
    const waitForReady = () => {
        if (windyAPI.map && windyAPI.map.overlays) {
            initLayerControl();
        } else {
            setTimeout(waitForReady, 100);
        }
    };
    
    // Start the process
    waitForReady();
    
    // Windy event handlers
    broadcast.once('redrawFinished', () => {
        picker.open({ lat: options.lat, lon: options.lon });
    });
    
    window.addEventListener('resize', () => map.invalidateSize());
});

  /* // Windy API options
  const options = {
    key: 'rO7B9qEwTHmfThLTlH5JpydrGSbm3nIc', // REPLACE WITH YOUR KEY !!!
    lat: 38,
    lon: -4,
    zoom: 5,
};

// Initialize Windy API
windyInit(options, (windyAPI) => {
    const { map, picker, utils, broadcast, store } = windyAPI;

        // Windy API event handlers
        picker.on('pickerOpened', ({ lat, lon, values, overlay }) => {
            console.log('Picker opened at', lat, lon, 'with values:', values, 'overlay:', overlay);
            
            const windObject = utils.wind2obj(values);
            console.log('Wind object:', windObject);
        });
        
        picker.on('pickerMoved', ({ lat, lon, values, overlay }) => {
            console.log('Picker moved to', lat, lon, 'with values:', values, 'overlay:', overlay);
        });
        
        picker.on('pickerClosed', () => {
            console.log('Picker closed');
        });
        
        store.on('pickerLocation', ({ lat, lon }) => {
            console.log('Picker location changed to:', lat, lon);
        });
        
        // Wait until weather is rendered
        broadcast.once('redrawFinished', () => {
            console.log('Weather rendering finished');
            
            // Open picker at initial location
            picker.open({ lat: options.lat, lon: options.lon });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });
    
    // Create base layers
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});
    
    
    

    
    // Add layer control
    const baseLayers = {
        "OpenStreetMap": osmLayer,
    };
    
    L.control.layers(baseLayers, null, {
        position: 'topleft',
        collapsed: true
    }).addTo(map);
    
    // Set OpenStreetMap as default
    osmLayer.addTo(map);
    

}); */