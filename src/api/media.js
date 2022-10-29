const uploadMedia = {
    uploadVideo: (dataSend) => {
        return fetch('https://script.google.com/macros/s/AKfycbwfLwoXDC50zx5lLJHv9mTRlxOQmvNiAcqYb31cGwlns_Rl62pfEWs8JBm3UCzlAxku/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
    }
};

export default uploadMedia;