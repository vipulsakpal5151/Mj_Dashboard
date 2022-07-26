const nodeApiBaseUrl = 'http://localhost:8082'
export default {
    access_control: {
        users: {
            viewUrl: `${nodeApiBaseUrl}/users`,
            fetchColumnDataUrl: `${nodeApiBaseUrl}/users/fetch_column_data`,
            updateUrl: `${nodeApiBaseUrl}/users/update`,
            createUrl: `${nodeApiBaseUrl}/users/create`
        },
        roles: {
            viewUrl: `${nodeApiBaseUrl}/roles`,
            fetchColumnDataUrl: `${nodeApiBaseUrl}/roles/fetch_column_data`,
            updateUrl: `${nodeApiBaseUrl}/roles/update`,
            createUrl: `${nodeApiBaseUrl}/roles/create`
        }
    },
    user_permissions: `${nodeApiBaseUrl}/roles/user_permissions`
}