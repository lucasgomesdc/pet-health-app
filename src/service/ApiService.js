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
        result.json().then((pet)=>{
          resolve(pet.pets[0]);
        });
      }).catch((err)=>{
        reject(err);
      });
    })
  }

  requestBreedList(jwt){ 
    return new Promise((resolve, reject)=>{
      fetch(global.API_ENDPOINT+ '/breed', {
        method: "GET",
				headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
        }
      }).then((result)=> {
        result.json().then((result)=>{
          resolve(result.breeds);
        });
      }).catch((err)=>{
        reject(err);
      });
    })
  }

  requestSavePet(pet, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/pet', {
				method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(pet)
			}).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
			}).catch((err)=>{
				reject(err);
			});
		});
  }

}
export default new AuthenticateApiService();