# Getting started

Launch `node src/index.js` after installing dependencies with `npm ci`. The launcher supplies `CANVA_ACCESS_TOKEN` in the child process environment as the only credential. Runtime variables such as PATH are separate from credentials. The server does not read dotenv files.

The supplied OAuth access token must already be valid. For all design and asset tools, enable `design:meta:read asset:read asset:write folder:read` in the external authorization flow.

Use `get_current_user` to check the connected user ID and team ID. Use `list_designs` for accessible design metadata.
