# Assets and URL upload jobs

- `get_asset(assetId)`: `GET /rest/v1/assets/{assetId}`, returning `{asset}`; requires `asset:read`.
- `list_assets(folderId, limit?, startAfter?, type?)`: `GET /rest/v1/folders/{folderId}/items?item_types=image`, returning `{items, continuation}`; requires `folder:read`. It lists images directly in one folder. Only `type: "IMAGE"` is supported. It does not list videos or all account assets. Limit defaults to 50 (integers 1-100); pass `continuation` as `startAfter` for the next page.
- `upload_image(url, title)`: `POST /rest/v1/url-asset-uploads` with `{name: title, url}`, returning `{job}`; requires `asset:write`. The URL must be public and title must contain 1-255 characters. There is no brandId parameter.
- `get_upload_job(jobId)`: `GET /rest/v1/url-asset-uploads/{jobId}`, returning `{job}`; requires `asset:read`. Save the job ID for later checks. `in_progress` means check again; `success` contains `job.asset`; `failed` returns the job's error details and is marked as a tool error.

URL upload is a preview API. The server does not poll internally. Job IDs and asset IDs are distinct. Asset records use `name`, lowercase types, and Unix timestamps. Thumbnail URLs expire; an asset record does not provide an original/full-resolution media download URL.

See [Asset metadata](https://www.canva.dev/docs/apps/rest-apis/reference/assets/get-asset/), [Folder items](https://www.canva.dev/docs/apps/rest-apis/reference/folders/list-folder-items/), [URL upload](https://www.canva.dev/docs/apps/rest-apis/reference/assets/create-url-asset-upload-job/), and [Upload status](https://www.canva.dev/docs/apps/rest-apis/reference/assets/get-url-asset-upload-job/).
