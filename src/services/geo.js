export default class GeoServices {
  static getCurrentPosition () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      } else {
        resolve(null);
      }
    })
  }
  static getLatLong (position) {
    const geocoder = new google.maps.Geocoder();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({'latLng': latlng}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let components = results[0].address_components;
          for (let component = 0; component < (components.length); component++) {
            if (components[component].types[0] === 'country') {
              let country = components[component].long_name;
              console.log('country', country);
            }
            if (components[component].types[0] === 'administrative_area_level_1') {
              let city = components[component].long_name;
              console.log('city', city);
            }
          }
        }
      }
    });
  }
}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=-41.2942955,174.78012909999998&key=AIzaSyC7x3_BYxA4ukRN48ZixDXh9isTwr81fXk
