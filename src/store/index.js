import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsVies from './modules/tagsView'
import getters from './getter'
Vue.use(Vuex)
const store=new Vuex.Store({
    modules:{
        app,
        user,
        permission,
        tagsVies
    },
    getters
})

export default store