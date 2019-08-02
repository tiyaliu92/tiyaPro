import { Message } from 'element-ui';
const mutations = {
    /**
     * @method 设置token
     */
    setToken(state, token) {
        localStorage.setItem("token", token);
        state.token = token;
    },
    /**
     * @method 清空token
     */
    removeToken() {
        if (navigator.userAgent.indexOf("Html5Plus") != -1) {
            //plus.storage.removeItem("token"); //PC电脑上运行时需注释掉
        } else {
            localStorage.removeItem("token");
        }
    }
}
export default mutations;