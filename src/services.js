const aws = require('aws-sdk')

aws.config.update({region: process.env.AWS_REGION})

const s3Instance = new aws.S3({
	region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
})

const uploadImage = async(name, image) => {
	await s3Instance.putObject({
		Bucket: process.env.AWS_BUCKET_NAME, 
		Key: name,
		Body: image,
		ContentType: 'image/png',
		ACL: 'public-read',
	}).promise()
	return process.env.AWS_BUCKET_URL + name
}

const deleteImage = async(name) => {
	return await s3Instance.deleteObject({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: name,
	}).promise()
}

module.exports = { uploadImage, deleteImage }