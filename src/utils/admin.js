import Vue from 'vue';
function setAdminInfo(info) {
    localStorage.setItem('adminInfo', JSON.stringify(info));
    Vue.prototype.$adminInfo = info;
}

function getAdminInfo() {
    const info = JSON.parse(localStorage.getItem('adminInfo'));
    Vue.prototype.$adminInfo = info;
    return info;
}
export default {
    setAdminInfo,
    getAdminInfo
}