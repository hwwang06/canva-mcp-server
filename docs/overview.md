# Canva REST API overview

This server exposes design metadata, folder-scoped image listing, asset metadata, asynchronous URL upload, and the current user's IDs. API base URL: `https://api.canva.com/rest/v1`.

Tools preserve official response envelopes: `{design}`, `{asset}`, `{items, continuation}`, `{job}`, or `{team_user}`. It does not expose Brand Kits or user directory management.

See [Canva REST documentation](https://www.canva.dev/docs/apps/rest-apis/).
