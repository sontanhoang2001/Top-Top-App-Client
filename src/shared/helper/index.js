// Translate Google Drive link to streamable link
const urlFromDriveUrl = (url) => url.replace('file/d/', 'uc?export=view&id=').replace('/view?usp=drivesdk', '');

const formatDate = (date) => {
    const d = date.$D;
    const m = date.$M + 1;
    const y = date.$y;

    const formated = `${d}-${m}-${y}`;
    return formated;// convert it into a date
}

export { urlFromDriveUrl, formatDate };
