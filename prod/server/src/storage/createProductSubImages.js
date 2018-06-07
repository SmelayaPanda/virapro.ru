/**
 * When an image is uploaded in the Storage bucket
 * We generate a thumbnail automatically using ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firestore Database.
 *
 * NOTE: DON'T SHIFT DB STRUCTURE
 *
 * FUNCTION MAKE:
 * 1. Storage images:
 * products/{productId}/main        - main(img_0, img_1...): name from vuex storage (see: addNewProduct action)
 * products/{productId}/card_main
 * products/{productId}/thumb_main
 *
 * 2. Firestore update product images
 */
const mkdirp = require('mkdirp-promise');

const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

const THUMB_MAX_HEIGHT = 200; // px
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';

const CARD_MAX_HEIGHT = 800; // px
const CARD_MAX_WIDTH = 800;
const CARD_PREFIX = 'card_';


exports.handler = function (object, context, admin) {
  console.log(CONST.LOG_DELIMITER)
  // Include a Service Account Key to use a Signed URL
  let keyFilename = IS_PRODUCTION ? 'service-account-credentials-prod.json' : 'service-account-credentials-dev.json';
  const gcs = require('@google-cloud/storage')({keyFilename: keyFilename});
  // File and directory paths.
  const contentType = object.contentType; // This is the image Mime type
  const originalFilePath = object.name;
  const originalFileDir = path.dirname(originalFilePath);
  const originalFileName = path.basename(originalFilePath);

  const thumbFilePath = path.normalize(path.join(originalFileDir, `${THUMB_PREFIX}${originalFileName}`));
  const cardFilePath = path.normalize(path.join(originalFileDir, `${CARD_PREFIX}${originalFileName}`));
  const tempLocalFile = path.join(os.tmpdir(), originalFilePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);
  const tempLocalCardFile = path.join(os.tmpdir(), cardFilePath);

  if (!originalFilePath.startsWith('products/')) {
    console.log('This is not an product Image.');
    return true;
  }
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return true;
  }

  // Exit if the image is already a thumbnail.
  if (originalFileName.startsWith(THUMB_PREFIX) || originalFileName.startsWith(CARD_PREFIX)) {
    console.log('Already a Thumbnail.');
    return true;
  }

  // Exit if this is a move or deletion event.
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return true;
  }

  // Cloud Storage files.
  const bucket = gcs.bucket(object.bucket);
  const originalFile = bucket.file(originalFilePath);
  const thumbFile = bucket.file(thumbFilePath);
  const cardFile = bucket.file(cardFilePath);
  const metadata = {contentType: contentType};

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir)
    .then(() => {
      // Download file from bucket.
      return originalFile.download({destination: tempLocalFile});
    }).then(() => {
      console.log('The file has been downloaded to', tempLocalFile);
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
    }).then(() => {
      // Generate a card image using ImageMagick.
      return spawn('convert', [tempLocalFile, '-thumbnail', `${CARD_MAX_WIDTH}x${CARD_MAX_HEIGHT}>`, tempLocalCardFile], {capture: ['stdout', 'stderr']});
    }).then(() => {
      console.log('Thumbnail created at', tempLocalThumbFile);
      console.log('Card image created at', tempLocalCardFile);
      // Uploading the Thumbnail.
      return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
    }).then(() => {
      return bucket.upload(tempLocalCardFile, {destination: cardFilePath, metadata: metadata});
    }).then(() => {
      console.log('Thumbnail uploaded to Storage at', thumbFilePath);
      console.log('Card image uploaded to Storage at', cardFilePath);
      // Once the image has been uploaded delete the local files to free up disk space.
      fs.unlinkSync(tempLocalFile);
      fs.unlinkSync(tempLocalThumbFile);
      fs.unlinkSync(tempLocalCardFile);
      // Get the Signed URLs for the thumbnail and original image.
      const config = {
        action: 'read',
        expires: '03-01-2500',
      };
      return Promise.all([
        thumbFile.getSignedUrl(config),
        cardFile.getSignedUrl(config),
        originalFile.getSignedUrl(config),
      ]);
    }).then((results) => {
      console.log('Got Signed URLs.');
      const thumbResult = results[0];
      const thumbFileUrl = thumbResult[0];

      const cardResult = results[1];
      const cardFileUrl = cardResult[0];

      const originalResult = results[2];
      const originalFileUrl = originalResult[0];
      // originalFilePath = products/OIe9aAx6sceVylH8ozrH/main
      const productId = originalFilePath.split('/')[1]
      console.log('$*****---> Product id = ' + productId)
      // Add the URLs to the Database
      let updateData = {
        [originalFileName]: { // img_0, ..., img_4
          original: originalFileUrl,
          thumbnail: thumbFileUrl,
          card: cardFileUrl
        }
      }
      return admin.firestore().collection('products').doc(productId).update(updateData);
    }).then(() => {
      console.log('Thumbnail URLs saved to database.');
      return true;
    })
};

