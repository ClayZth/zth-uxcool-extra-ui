import mutiInput from "./packages/mutiInput";
const components = {
    zMutiInput: mutiInput
}

const install = function(Vue) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
}

export default install