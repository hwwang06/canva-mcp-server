import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { canvaApiClient } from './api-client.js';
import { schemas } from './schemas.js';
import { resources } from './resources.js';

export const server = new McpServer({ name: 'Canva API', version: '1.0.0' });

function registerTool(name, description, inputSchema, request) {
  server.tool(name, description, inputSchema, async (args) => {
    try {
      const result = await request(args);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        isError: result.job?.status === 'failed'
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error: ${error.message}` }],
        isError: true
      };
    }
  });
}

registerTool(
  'get_design', 'Get design metadata, viewing/editing links, and thumbnail information.',
  { designId: schemas.designId },
  ({ designId }) => canvaApiClient.getDesign(designId)
);

registerTool(
  'list_designs', 'List accessible designs. Pass response.continuation as startAfter to retrieve the next page.',
  { limit: schemas.limit.optional(), startAfter: schemas.startAfter.optional() },
  ({ limit, startAfter }) => canvaApiClient.listDesigns(limit, startAfter)
);

registerTool(
  'get_asset', 'Get asset metadata and any thumbnail. This endpoint does not provide an original-media download URL.',
  { assetId: schemas.assetId },
  ({ assetId }) => canvaApiClient.getAsset(assetId)
);

registerTool(
  'list_assets', 'List image assets directly in a specified folder. Pass response.continuation as startAfter for the next page. This does not search all account assets.',
  {
    folderId: schemas.folderId,
    limit: schemas.limit.optional(),
    startAfter: schemas.startAfter.optional(),
    type: schemas.assetType.optional()
  },
  ({ folderId, limit, startAfter }) => canvaApiClient.listAssets(folderId, limit, startAfter)
);

registerTool(
  'upload_image', 'Start a preview API upload job from a public image URL. Use get_upload_job with job.id until success or failed; the job ID is not an asset ID.',
  { url: schemas.imageUrl, title: schemas.title },
  ({ url, title }) => canvaApiClient.uploadImage(url, title)
);

registerTool(
  'get_upload_job', 'Check a URL upload job. An in_progress job can be checked again with the same jobId; a successful job contains job.asset.',
  { jobId: schemas.jobId },
  ({ jobId }) => canvaApiClient.getUploadJob(jobId)
);

registerTool(
  'get_current_user', 'Get the user ID and team ID associated with the injected access token.',
  {},
  () => canvaApiClient.getCurrentUser()
);

server.resource(
  'canva_docs',
  new ResourceTemplate('canva://{section}', { list: undefined }),
  resources.documentationResource
);
server.resource(
  'canva_design',
  new ResourceTemplate('canva://design/{designId}', { list: undefined }),
  resources.designResource
);
server.resource(
  'canva_asset',
  new ResourceTemplate('canva://asset/{assetId}', { list: undefined }),
  resources.assetResource
);
