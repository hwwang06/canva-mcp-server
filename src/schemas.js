import { z } from 'zod';

export const schemas = {
  designId: z.string().describe('The Canva design ID'),
  assetId: z.string().describe('The Canva asset ID'),
  folderId: z.string().describe('The Canva folder ID; only images directly in this folder are listed'),
  jobId: z.string().describe('The ID returned by upload_image in job.id'),
  limit: z.number().int().min(1).max(100).default(50).describe('Number of items to return (1-100)'),
  startAfter: z.string().describe('The continuation token from the previous response'),
  title: z.string().min(1).max(255).describe('The asset name (1-255 characters)'),
  assetType: z.literal('IMAGE').describe('Folder listing supports IMAGE only'),
  imageUrl: z.string().url().describe('Publicly accessible URL of the image to upload')
};
