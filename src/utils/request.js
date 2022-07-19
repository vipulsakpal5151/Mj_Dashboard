export default {
    access_control: {
        users: {
            viewUrl: 'http://localhost:8082/users',
            fetchColumnDataUrl: 'http://localhost:8082/users/fetch_column_data',
            updateUrl: 'http://localhost:8082/users/update',
            createUrl: 'http://localhost:8082/users/create'
        }
    },
    user_permissions: 'http://localhost:8082/roles/user_permissions'
}