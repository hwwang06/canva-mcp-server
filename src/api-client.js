import axios from 'axios';

class CanvaApiClient {
  constructor() {
    this.baseUrl = 'https://api.canva.com/rest/v1';
    this.accessToken = process.env.CANVA_ACCESS_TOKEN;
    if (!this.accessToken) {
      throw new Error('Launch Canva MCP with CANVA_ACCESS_TOKEN set to a valid OAuth access token.');
    }
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  async makeRequest(method, endpoint, data = undefined) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: this.headers,
        data
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Canva API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      if (error.request) {
        throw new Error('No response received from Canva API');
      }
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }

  async getDesign(designId) {
    return this.makeRequest('GET', `/designs/${encodeURIComponent(designId)}`);
  }

  async listDesigns(limit = 50, startAfter = null) {
    const params = new URLSearchParams({ limit });
    if (startAfter) params.set('continuation', startAfter);
    return this.makeRequest('GET', `/designs?${params}`);
  }

  async getAsset(assetId) {
    return this.makeRequest('GET', `/assets/${encodeURIComponent(assetId)}`);
  }

  async listAssets(folderId, limit = 50, startAfter = null) {
    const params = new URLSearchParams({ limit, item_types: 'image' });
    if (startAfter) params.set('continuation', startAfter);
    return this.makeRequest('GET', `/folders/${encodeURIComponent(folderId)}/items?${params}`);
  }

  async uploadImage(url, title) {
    return this.makeRequest('POST', '/url-asset-uploads', { name: title, url });
  }

  async getUploadJob(jobId) {
    return this.makeRequest('GET', `/url-asset-uploads/${encodeURIComponent(jobId)}`);
  }

  async getCurrentUser() {
    return this.makeRequest('GET', '/users/me');
  }
}

export const canvaApiClient = new CanvaApiClient();
