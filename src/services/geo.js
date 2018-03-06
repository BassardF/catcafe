export default class GeoServices {
  static getCurrentPosition () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      } else {
        reject(new Error('fail'));
      }
    })
  }
  static getLatLong (position) {
    return new Promise((resolve, reject) => {
      const latlng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      new google.maps.Geocoder().geocode({'latLng': latlng}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let components = results[0].address_components;
            let country = null;
            let city = null;
            for (let component = 0; component < (components.length); component++) {
              if (components[component].types[0] === 'country') {
                country = components[component].long_name;
              }
              if (components[component].types[0] === 'administrative_area_level_1') {
                city = components[component].long_name;
              }
            }
            if (country && city) resolve({country, city});
          }
        }
        reject(new Error('fail'));
      });
    });
  }
}
// https://maps.googleapis.com/maps/api/geocode/json?latlng=-41.2942955,174.78012909999998&key=AIzaSyC7x3_BYxA4ukRN48ZixDXh9isTwr81fXk
