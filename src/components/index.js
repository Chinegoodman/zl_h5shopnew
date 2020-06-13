import Vue from 'vue';
import xqbottom from './xqbottom.vue'
import uploadfile from './uploadfile_multiple.vue'
const components = [xqbottom, uploadfile];
components.map(function(component) {
    Vue.component(component.name, component);
});