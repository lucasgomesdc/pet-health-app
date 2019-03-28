import fetch from '../library/fetchWithTimeout'

class AuthenticateApiService { 
	requestLogin(user, token){
		return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/auth/login', {
				method: "POST", 
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"Authorization": 'Bearer' + token
				},
				body: user
			}).then((result)=>{
				result.json().then((userAuth)=>{
					resolve(userAuth);
				});
			}).catch((err)=>{
				reject(err);
			});
		});
	}

	requestRegister(user){
		return new Promise((resolve, reject) =>{
			fetch(global.API_ENDPOINT + '/auth/register', {
				method: "POST", 
				headers: {"Content-Type": "application/json; charset=utf-8"},
				body: JSON.stringify(user)
			}).then((result)=>{
				result.json().then((userAuth)=>{
					resolve(userAuth);
				});
			}).catch((err)=>{
				reject(err);
			});
		});
	}
}
export default new AuthenticateApiService();