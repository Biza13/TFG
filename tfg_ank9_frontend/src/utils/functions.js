export function getFetch(url){
    return fetch (url)
            .then (resp => resp.json())
};