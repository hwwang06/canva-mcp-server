# Credential injection

The launch credential allowlist contains only `CANVA_ACCESS_TOKEN`. Requests use `Authorization: Bearer <access token>`.

Client ID, client secret, and refresh token stay outside this server. OAuth authorization, token exchange, and token refresh are external responsibilities. The server neither reads credential files nor performs these operations. Missing access tokens fail startup; API authentication failures are returned as errors, without mock fallback.

See [Canva authentication](https://www.canva.dev/docs/apps/rest-apis/authentication/).
