class GPSService {
  initGPS(onSuccess, onError) {
    document.addEventListener('deviceready', function() {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
  }
}

export default new GPSService();