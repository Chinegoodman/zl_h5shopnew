import Vue from 'vue';
import xqbottom from './xqbottom.vue'
const components = [xqbottom];
components.map(function(component) {
    Vue.component(component.name, component);
});