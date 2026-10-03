# Current user

`get_current_user()` calls `GET /rest/v1/users/me` and returns `{team_user: {user_id, team_id}}`. It needs a valid access token but no specific scope. It does not return an arbitrary user's email, role, or profile.

The old `get_user(userId)` and `list_users` tools are not registered.

See [Current user](https://www.canva.dev/docs/apps/rest-apis/reference/users/users-me/).
