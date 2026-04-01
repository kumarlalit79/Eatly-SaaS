import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (buffer: Buffer, folder: string) => {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );
    stream.end(buffer);
  });
};

export const deleteImage = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};
