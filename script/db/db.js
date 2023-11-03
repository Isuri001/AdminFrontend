export function saveKey(role,key){
    localStorage.setItem("api-key",key)
}

export function getKey(){
    return localStorage.getItem("api-key")
}