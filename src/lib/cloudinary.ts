import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Uploads a Web/Node File object to Cloudinary.
 * @param file The file to upload.
 * @param folder Cloudinary folder designation.
 * @returns The secure URL of the uploaded asset.
 */
export async function uploadToCloudinary(file: File, folder: string = "skyefashion"): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("Invalid file upload");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Stream Error:", error);
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    ).end(buffer);
  });
}
