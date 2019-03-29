export const isAuthenticated = () => {
    let user = localStorage.getItem('token');
    if(user && (user.jwt != false || user.jwt != "")) {
        return true;
    } else {
        return false;
    }
};