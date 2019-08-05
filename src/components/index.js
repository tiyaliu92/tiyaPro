import modal from "./modal"
import search from "./search"
const tiya = {
    install: function (Vue) {
        Vue.component("modal", modal)
        Vue.component("search", search)
    }
}

export default tiya