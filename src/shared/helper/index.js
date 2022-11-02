// Translate Google Drive link to streamable link
const urlFromDriveUrl = (url) => url.replace('file/d/', 'uc?export=view&id=').replace('/view?usp=drivesdk', '');

export { urlFromDriveUrl };

