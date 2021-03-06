<template>
  <div id="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'CafesMap',
  props: {
    cafes: Array,
    geo: Object,
    expanded: String,
    search: String
  },
  mounted () {
    if (this.cafes && this.cafes.length) {
      this.drawMap(this.cafes);
      this.currentCafeLength = this.cafes.length;
      this.currentSearch = this.search;
    }
  },
  watch: {
    expanded () {
      if (this.expanded && this.markers[this.expanded]) {
        this.selectAndCenterExpanded();
      }
    },
    cafes (cafs) {
      if (cafs.length !== this.currentCafeLength || this.currentSearch !== this.search) {
        this.currentCafeLength = this.cafes.length;
        this.currentSearch = this.search;
        this.drawMap(cafs);
      }
    }
  },
  data () {
    return {
      map: null,
      initialZoom: true,
      markers: {}
    }
  },
  methods: {
    selectAndCenterExpanded (force) {
      if (this.expanded && this.markers[this.expanded]) {
        const mk = this.markers[this.expanded];
        this.closeMarkers();
        google.maps.event.trigger(mk, 'click');
        const latLng = mk.getPosition();
        if (force || !this.map.getBounds().contains(mk.getPosition())) {
          this.map.setCenter(latLng)
        }
      }
    },
    drawMap (cafs) {
      // Size map
      const lcWidth = document.getElementById('left-column').offsetWidth;
      const width = lcWidth ? document.getElementById('right-column').offsetWidth : document.getElementById('core-wrapper').offsetWidth;
      document.getElementById('map').style.width = width + 'px';
      // Init the Map
      this.initialZoom = true;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48, lng: 2},
        zoom: 10
      });
      // Resize the minimum zoom after the 1st render
      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        let zoomChangeBoundsListener = google.maps.event.addListener(this.map, 'bounds_changed', (event) => {
          if (this.map.getZoom() > 15 && this.initialZoom === true) {
            this.map.setZoom(15);
            this.initialZoom = false;
          }
          google.maps.event.removeListener(zoomChangeBoundsListener);
        });
      });
      // Bounds
      const bounds = new google.maps.LatLngBounds();
      // Markers
      if (cafs && cafs.length) {
        for (let i = 0; i < cafs.length; i++) {
          // Marker
          const marker = new google.maps.Marker({
            position: {lat: cafs[i].geo[0], lng: cafs[i].geo[1]},
            map: this.map,
            title: cafs[i].name
          })
          // Info window
          const infowindow = new google.maps.InfoWindow({
            content: this.generateInfo(cafs[i])
          });
          marker.infowindow = infowindow;
          marker.addListener('click', function (c) {
            infowindow.open(this.map, marker);
            // Add see more listener
            const elt = document.getElementById('see-more-' + c.key);
            if (elt) elt.addEventListener('click', () => { this.showDetails(c.key) });
          }.bind(this, cafs[i]));
          this.markers[cafs[i].key] = marker;
          // Extend bound to include Marker
          bounds.extend(marker.position);
        }
        // Resize bounds
        this.map.fitBounds(bounds);
      } else {
        this.map.setZoom(2);
      }

      // Bubble map
      this.$emit('setmap', this.map)
      if (this.expanded) this.selectAndCenterExpanded(true);
    },
    showDetails (key) {
      this.$emit('details', key)
    },
    closeMarkers () {
      for (let key in this.markers) {
        this.markers[key].infowindow.close();
      }
    },
    generateInfo (caf) {
      return `
        <div>
          <div style='font-size:18px;margin-bottom:5px;'><b>${caf.name}</b></div>
          <div>${caf.address}</div>
          <div id='see-more-${caf.key}' style='cursor:pointer;color:#3f51b5;margin-top:5px;'>
            See Details
          </div>
        </div>
      `;
    }
  }
}
</script>

<style scoped>
#map {
  height: 600px;
}
h2{
  margin: 0px;
  font-size: 22px;
  font-weight: normal;
}
</style>
