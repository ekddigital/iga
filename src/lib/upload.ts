import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateId } from "./utils";

if (
  !process.env.R2_ACCESS_KEY_ID ||
  !process.env.R2_SECRET_ACCESS_KEY ||
  !process.env.R2_BUCKET
) {
  console.warn("Missing R2 credentials - file uploads will not work");
}

const r2Client = new S3Client({
  region: "auto",
  endpoint:
    process.env.R2_ENDPOINT ||
    `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.R2_BUCKET || "iga-uploads";
const PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

/**
 * Allowed file types and max sizes
 */
export const UPLOAD_CONFIG = {
  images: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  documents: {
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
} as const;

/**
 * Upload a file to R2
 */
export async function uploadFile(
  file: Buffer,
  filename: string,
  mimeType: string,
  folder = "uploads"
): Promise<{ url: string; key: string }> {
  const ext = filename.split(".").pop() || "";
  const key = `${folder}/${generateId()}.${ext}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: mimeType,
    })
  );

  const url = PUBLIC_URL ? `${PUBLIC_URL}/${key}` : key;

  return { url, key };
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<void> {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

/**
 * Generate a presigned upload URL
 */
export async function getPresignedUploadUrl(
  filename: string,
  mimeType: string,
  folder = "uploads"
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const ext = filename.split(".").pop() || "";
  const key = `${folder}/${generateId()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: mimeType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  const publicUrl = PUBLIC_URL ? `${PUBLIC_URL}/${key}` : key;

  return { uploadUrl, key, publicUrl };
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: { size: number; type: string },
  type: keyof typeof UPLOAD_CONFIG
): { valid: boolean; error?: string } {
  const config = UPLOAD_CONFIG[type];

  if (!(config.mimeTypes as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${config.mimeTypes.join(", ")}`,
    };
  }

  if (file.size > config.maxSize) {
    return {
      valid: false,
      error: `File too large. Max size: ${config.maxSize / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}
