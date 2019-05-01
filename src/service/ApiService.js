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

  requestRegisterMeetings(obj, jwt) { 
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/meetings/new', {
				method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestMeeting(userId, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/meetings/'+ userId, {
				method: "GET", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				}
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestListMeetings(obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/meetings', {
				method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestUpdateMeetings(userId, obj, jwt) { 
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/meetings/' + userId, {
				method: "PUT", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestDeleteMeetings(userId, jwt) { 
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/meetings/' + userId, {
				method: "DELETE", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				}
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestUpdateUser(id, obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/register/' + id, {
				method: "PUT", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestSaveHealth(url, obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/health/' + url, {
				method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestDeleteHealth(url, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/health/' + url, {
				method: "DELETE", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				}
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestListHealth(url, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/health/' + url, {
				method: "GET", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				}
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestListLocals(obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/local', {
        method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestLikeLocal(userId, localId, obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/local/'+userId+'/like/'+localId, {
        method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
      }).then((result)=>{
				result.json().then((result)=>{
					resolve(result);
				});
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  requestRatingLocal(userId, localId, obj, jwt) {
    return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/local/'+userId+'/rating/'+localId, {
        method: "POST", 
				headers: {
					"Content-Type": "application/json",
          "Authorization": "Bearer "+ jwt
				},
				body: JSON.stringify(obj)
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