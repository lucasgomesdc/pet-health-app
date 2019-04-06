class CameraService {

  initCamera(onSuccess, onError) {
    document.addEventListener('deviceready', function(){
      let options = {
        quality: 80,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        mediaType: navigator.camera.MediaType.PICTURE,
        encodingType: navigator.camera.EncodingType.PNG,
        cameraDirection: navigator.camera.Direction.BACK,
        targetWidth: 500,
        targetWidth: 500,
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
        encodingType: navigator.camera.EncodingType.PNG,
        cameraDirection: navigator.camera.Direction.BACK,
        targetWidth: 400,
        targetWidth: 400,
        allowEdit: true,
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