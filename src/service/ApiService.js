class AuthenticateApiService { 
  requestPet(userId, jwt){
    return new Promise((resolve, reject)=>{
      fetch(global.API_ENDPOINT+ '/pet/'+userId, {
        method: "GET",
				headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
        }
      }).then((result)=> {
        result.json().then((pets)=>{
          let data = pets[0];
          resolve(data);
        });
      }).catch((err)=>{
        reject(err);
      });
    })
  }

}
export default new AuthenticateApiService();