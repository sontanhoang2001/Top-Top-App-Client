const url = "https://script.google.com/macros/s/AKfycbyqw9C9zV1327MJqrInIJepZGhJnpz4dcvpmZ144eRCtkj851XpAJKggRGMHxr8IZwW/exec";
// const url = "https://script.google.com/macros/s/AKfycbwfLwoXDC50zx5lLJHv9mTRlxOQmvNiAcqYb31cGwlns_Rl62pfEWs8JBm3UCzlAxku/exec";

const uploadMedia = {
    uploadVideo: (dataSend) => {
        return fetch(url, //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
    },
    uploadMessageImage: (dataSend) => {
        return fetch(url, //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) })
    },
    uploadMessageAudioRecorder: (dataSend) => {
        return fetch(url, //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) })
    }
};

export default uploadMedia;