# Canva API MCP Server

A Model Context Protocol (MCP) server for interacting with Canva's API. This server provides tools and resources for accessing designs, assets, and the current user in Canva.

## Features

- Tools for design metadata, image assets, uploads, and current user information
- Resources for documentation and entity details

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Inject a valid Canva OAuth access token into the server process environment at launch:
   ```
   CANVA_ACCESS_TOKEN=your_access_token
   ```
   This is the only required credential. Authorization and token refresh are handled externally; the server does not load `.env` files.
4. Start the server:
   ```
   npm run dev
   ```

## Testing with MCP Inspector

To test the server with the MCP Inspector:

```
npm run inspect
```

This will open a web interface where you can:
- Browse and test all available tools
- Access resources
- View server logs

## Available Tools

### Design Management
- `get_design` - Get information about a specific design
- `list_designs` - List designs with optional pagination

### Asset Management
- `get_asset` - Get metadata and thumbnail information for a specific asset
- `list_assets` - List images directly in a specified `folderId`, with optional pagination
- `upload_image` - Start an image upload job from a public URL (requires `url` and `title`; preview API)
- `get_upload_job` - Check an upload job by `jobId` and retrieve its asset on success

Use the returned `job.id` to check upload status until `success` or `failed`. For design and asset lists, pass the returned `continuation` token as `startAfter` to request the next page.

### User Management
- `get_current_user` - Get the current user ID and team ID

## Available Resources

### Documentation
- `canva://overview` - General API overview
- `canva://getting-started` - Getting started guide
- `canva://authentication` - Authentication information
- `canva://designs` - Designs API documentation
- `canva://brands` - Brand capability information
- `canva://assets` - Assets API documentation
- `canva://users` - Users API documentation

### Entity Resources
- `canva://design/{designId}` - Information about a specific design
- `canva://asset/{assetId}` - Information about a specific asset

## License

MIT
