export function getToken(){
    if(localStorage.getItem("token")){
        return localStorage.getItem("token")
    }
}