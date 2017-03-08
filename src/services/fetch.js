const url = {
    get: 'http://127.0.0.1:3010/',
    create: 'http://127.0.0.1:3010/reservation',
}
const myInit = { method: 'GET',
               headers: {
                   'Access-Control-Allow-Origin':'*'
               },
               cache: 'default' };

export function getData(pUrl='get', method = 'GET'){
    let myUrl = url[pUrl];
    if (method !== 'GET') myInit.method = method;

    return fetch(myUrl, myInit).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch(function(error) {
        console.log("Error detail: ",error);
    });

}