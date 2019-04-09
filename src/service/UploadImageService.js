class UploadImageService { 
  sendImageToAWS(imageObj, jwt){
    return new Promise((resolve, reject)=>{
      fetch(global.API_ENDPOINT + '/imageProfileUpload',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
        },
        body: JSON.stringify(imageObj)
      }).then((result)=> {
        result.json().then((data)=>{
          resolve(data.result);
        });
      }).catch((err)=>{
        reject(err);
      });
    });
  }
}

export default new UploadImageService();