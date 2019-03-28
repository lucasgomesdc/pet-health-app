export const isAuthenticated = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && (user.jwt != false || user.jwt != "")) {
        return true;
    } else {
        return false;
    }
};