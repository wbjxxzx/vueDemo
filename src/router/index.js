import Vue from 'vue'
import Router from 'vue-router'
import Helloworld from '@/components/Helloworld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Helloworld
        }
    ]
})