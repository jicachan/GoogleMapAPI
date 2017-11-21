function initMap() {
    // Map options
    var options = {
        zoom: 7,
        center: { lat: 56.0465, lng: 12.6945 } //Helsingborg
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Add marker
    var marker = new google.maps.Marker({
        position: { lat: 56.0216, lng: 12.7429}, //Ramlösa
        map: map
    });


}
