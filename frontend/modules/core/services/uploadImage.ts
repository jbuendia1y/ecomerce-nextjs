"use server";
import { auth } from "@/lib/auth";
import { getMyProfile } from "@/modules/auth/services/getMyProfile";
import { v2 as cloudinary, UploadApiResponse, v2 } from "cloudinary";

export const uploadImage = async (formData: FormData) => {
  const session = await auth();
  if (!session || !session.user?.id)
    return { error: new Error("Unauthorizated operation") };

  const userProfile = await getMyProfile(session.user.id);
  if (userProfile?.role !== "admin")
    return { error: new Error("Unauthorizated operation") };

  const file = formData.get("file") as File;
  if (!file) {
    return { error: new Error("Missing *file* field required to upload") };
  }

  const buffer = new Uint8Array(await file.arrayBuffer())

  const promised = new Promise<UploadApiResponse>((resolve, reject) => {
    v2.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        access_mode: "public",
        allowed_formats: ["jpg", "png", "webp"],
        unique_filename: true,
        quality_analysis: true,
        transformation: {
          quality: 50,
          format: "webp",
        },
        folder: "ecomerce-basic",
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result as UploadApiResponse);
      }
    );
    uploadStream.end(buffer);
  });

  return await promised;
};
