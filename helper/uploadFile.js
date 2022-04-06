var admin = require('firebase-admin')
var serviceAccount = require('../serviceAccountKey.json')
const {
    SERVERERROR,
    SUCCESSCODE,
    CLIENTSIDEERROR
} = require('../constants/common');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://baaz-demo.appspot.com',
})

const uploadFile = async (imageInBase64, fileName) => {
    try {
        console.log(imageInBase64);
        console.log(fileName)
        const path = 'logos/' + fileName;
        const base64Image = imageInBase64.replace('data:image/png;base64,', '')
        var buf = await Buffer.from(base64Image, 'base64')
        var bucket = await admin.storage().bucket()
        var file = await bucket.file(path)
        await file.save(buf, {
            metadata: {
                firebaseStorageDownloadTokens: null,
            },
        })
        const urlOptions = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1000 * 60 * 180, // 3 hours
        }

        const [url] = await bucket.file(path).getSignedUrl(urlOptions)
        // console.log("url:::::", url);
        return url;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = uploadFile;