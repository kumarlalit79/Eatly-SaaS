import { uploadImage } from "../lib/cloudinary";

export const handleUpload = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await uploadImage(buffer, "eatly/menus");

  return {
    imageUrl: result.url,
    imageKey: result.publicId,
  };
};
