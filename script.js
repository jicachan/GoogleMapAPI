/* --- Initiera karta --- */

function initMap() {
    // Map options
    var options = {
        zoom: 6,
        center: { lat: 57.7826, lng: 14.1618 } //Jönköping
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on maps
    google.maps.event.addListener(map, 'click',
    function(event) {
      // Add marker
      addMarker({ coords: event.latLng });
    });

    // Array of markers
    var markers = [
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


    /* Method adding new markers */
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            // icon: props.iconImage
        });

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
}
