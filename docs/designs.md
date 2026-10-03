# Design metadata

- `get_design(designId)`: `GET /rest/v1/designs/{designId}`, returning `{design}`.
- `list_designs(limit?, startAfter?)`: `GET /rest/v1/designs`, returning `{items, continuation}`. Pass `continuation` as `startAfter` for the next page; the API query parameter is named `continuation`.

Both tools require `design:meta:read`. The limit defaults to 50 (integers 1-100). Metadata includes the official fields such as `created_at`, `updated_at`, `thumbnail`, and `urls`; this server does not add editing or deletion tools.

See [Get design](https://www.canva.dev/docs/apps/rest-apis/reference/designs/get-design/) and [List designs](https://www.canva.dev/docs/apps/rest-apis/reference/designs/list-designs/).
