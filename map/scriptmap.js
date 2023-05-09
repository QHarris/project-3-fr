function initMap() {
    new google.maps.Map(document.getElementById("map"), {
      mapId: "bf560cba325c3c63",
      center: { lat: 48.85, lng: 2.35 },
      zoom: 12,
    });
  }
  
  window.initMap = initMap;