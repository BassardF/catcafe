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
  static calculateDistance (pos1, pos2) {
    if (pos1 && pos2 && pos1.lat && pos1.lng && pos2.lat && pos2.lng) {
      const R = 6371e3;
      const φ1 = pos1.lat * (Math.PI / 180);
      const φ2 = pos2.lat * (Math.PI / 180);
      const Δφ = (pos2.lat - pos1.lat) * (Math.PI / 180);
      const Δλ = (pos2.lng - pos1.lng) * (Math.PI / 180);
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (R * c) / 1000;
    }
  }
  static placeSearch (map, query) {
    return new Promise((resolve, reject) => {
      if (!map || !query) reject(new Error('Fail'));
      const service = new google.maps.places.PlacesService(map);
      service.textSearch({query}, (resp) => {
        if (resp && resp[0]) resolve(resp[0]);
        else reject(new Error('Fail'));
      });
    });
  }
  static detailedPlaceSearch (map, placeId) {
    return new Promise((resolve, reject) => {
      if (!map || !placeId) reject(new Error('Fail'));
      const service = new google.maps.places.PlacesService(map);
      service.getDetails({placeId}, (resp) => {
        if (resp) resolve(resp);
        else reject(new Error('Fail'));
      });
    });
  }
}
