class CameraService {

  initCamera(onSuccess, onError) {
    document.addEventListener('deviceready', function(){
      let options = {
        quality: 80,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        mediaType: navigator.camera.MediaType.PICTURE,
        encodingType: navigator.camera.EncodingType.JPEG,
        cameraDirection: navigator.camera.Direction.BACK,
        targetWidth: 720,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
      navigator.camera.getPicture(function(imageURI){
        let imageResponse = imageURI;
        onSuccess(imageResponse);
      }, function(err){
        onError(err);
      }, options);
    });
  }

  initGallery(onSuccess, onError) {
    document.addEventListener('deviceready', function(){
      let options = {
        quality: 80,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: navigator.camera.MediaType.PICTURE,
        encodingType: navigator.camera.EncodingType.JPEG,
        cameraDirection: navigator.camera.Direction.BACK,
        targetWidth: 720,
        allowEdit: true,
        correctOrientation: true
      }
      navigator.camera.getPicture(function(imageURI){
        let imageResponse = imageURI;
        onSuccess(imageResponse);
      }, function(err){
        onError(err);
      }, options);
    });
  }

}

export default new CameraService();