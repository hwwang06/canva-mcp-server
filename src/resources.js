import { readFile } from 'node:fs/promises';
import { canvaApiClient } from './api-client.js';

const sections = ['overview', 'getting-started', 'authentication', 'designs', 'brands', 'assets', 'users'];

async function apiResource(uri, request) {
  try {
    const result = await request();
    return {
      contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(result, null, 2) }]
    };
  } catch (error) {
    return { contents: [{ uri: uri.href, mimeType: 'text/plain', text: `Error: ${error.message}` }] };
  }
}

export const resources = {
  async documentationResource(uri, { section }) {
    const text = sections.includes(section)
      ? await readFile(new URL(`../docs/${section}.md`, import.meta.url), 'utf8')
      : `Unknown documentation section '${section}'. Available sections: ${sections.join(', ')}`;
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text }] };
  },

  async designResource(uri, { designId }) {
    return apiResource(uri, () => canvaApiClient.getDesign(designId));
  },

  async assetResource(uri, { assetId }) {
    return apiResource(uri, () => canvaApiClient.getAsset(assetId));
  }
};
