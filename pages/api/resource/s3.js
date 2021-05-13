import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const get = await s3.getSignedUrl("getObject", {
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.file,
    Expires: 60, // seconds
  });

  console.log("RESOURCE API", get);

  res.status(200).json(get);
}
