import mutiInput from "./packages/mutiInput";
import dragCard from './packages/dragCard';
const components = {
    zMutiInput: mutiInput,
    zDragCard: dragCard
}

const install = function(Vue) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
}

export default install