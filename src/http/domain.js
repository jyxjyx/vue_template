export default {
    development: '/api',
    production: process.env.VUE_APP_API_URL
}[process.env.NODE_ENV]