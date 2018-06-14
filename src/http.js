class ServeHTTP {

    //Make an HTTP GET request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
}


export const http = new ServeHTTP();