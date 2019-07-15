export const isAuthenticated = () => {
    let user = localStorage.getItem('token');
    if(user && user != "null") {
        return true;
    } else {
        return false;
    }
};