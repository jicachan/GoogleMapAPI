var map;
var gmarkers = [];

/* --- Initiera karta --- */
function initMap() {
  // Map options
  var options = {
    zoom: 6,
    center: { lat: 57.7826, lng: 14.1618 } //Jönköping
  };

  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  // Lables of Coordinaters
  var lbLat = document.getElementById('lat');
  var lbLong = document.getElementById('long');

  // Listen for click on maps
  google.maps.event.addListener(map, 'click',
  function(event) {
    clearMarkers();

    // Add marker
    addMarker({ coords: event.latLng });

    lbLat.innerHTML = "Latitude: " + event.latLng.lat();
    lbLong.innerHTML = "Longitude: " + event.latLng.lng();

    initWeather(event.latLng.lat(), event.latLng.lng());
    //initWeather();
  });

  // Array of markers
  markers = [
    {
      coords: { lat: 56.0465, lng: 12.6945 }, //Helsingborg
      iconImage: 'images/erica35.png',
      content: '<h2>Erica Hsu</h2><p>Helsingborg</p>'
    },
    {
      coords: { lat: 55.6050, lng: 13.0038 }, //Malmö
      iconImage: 'images/oskar35.png',
      content: '<h2>Oskar Hulter</h2><p>Malmö</p>'
    },
    {
      coords: { lat: 59.8586, lng: 17.6389 }, //Uppsala
      iconImage: 'images/lina35.png',
      content: '<h2>Lina Flygerfeldt</h2><p>Uppsala</p>'
    }
  ];

  // Loop through markers-array
  for(var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }
}

/* Method adding new markers */
function addMarker(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    // icon: props.iconImage
  });

  // Only add markers without iconImage to gmarkers-list
  if (!props.iconImage) {
    gmarkers.push(marker);
  }

  // Check for custom-icon
  if(props.iconImage) {
    // Set icon images
    marker.setIcon(props.iconImage);
  }

  // Check for content
  if(props.content) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
}

function clearMarkers() {
  for (var i = 0; i < gmarkers.length; i++) {
    gmarkers[i].setMap(null);
  }
}


/* --- Display OpenWeatherMap --- */
function initWeather (_lat, _lng){
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat="+ _lat +"&lon="+ _lng +"&units=metric&lang=sv&appid=df7ba97e01ffc3eeadd7d1ae6cfad212",
    type: "GET",
    async: true,
    dataType: "JSON"
  }).done(function(data) {
    console.log(data);

    // Display weather data
    document.getElementById('city').innerHTML = 'City: ' + data.name;
    document.getElementById('country').innerHTML = 'Country code: ' + data.sys.country;
    document.getElementById('temp').innerHTML = 'Temperature in °C' + data.main.temp;
    document.getElementById('pressure').innerHTML = 'Pressure: ' + data.main.pressure;
    document.getElementById('humidity').innerHTML = 'Humidity: ' + data.main.humidity;

  }).fail(function(data) {
    console.log(data);
    // $("#weather-error").show();
    // $("#error-text").html(data.message);
  });
}
