const scriptId = "AKfycbyISVUKqbQ4Z6qGcWqjgNhaLrukqTZlemeNsVidY8CPzIum67Fy-sBpECoo2G-b8Kpd";
const url = `https://script.google.com/macros/s/${scriptId}/exec`;

const uploadMedia = {
    uploadVideo: (dataSend) => {
        return fetch(url, //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
    },
    uploadMessageImage: (dataSend) => {
        return fetch(url,
            { method: "POST", body: JSON.stringify(dataSend) })
    },
    uploadMessageAudioRecorder: (dataSend) => {
        return fetch(url,
            { method: "POST", body: JSON.stringify(dataSend) })
    },
    uploadUserAvatar: (dataSend) => {
        return fetch(url,
            { method: "POST", body: JSON.stringify(dataSend) })
    }
};

export default uploadMedia;