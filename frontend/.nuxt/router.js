import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _76002d57 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _c6254fb6 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _e3195f62 = () => interopDefault(import('../pages/user/user-create.vue' /* webpackChunkName: "pages/user/user-create" */))
const _179662d9 = () => interopDefault(import('../pages/user/users.vue' /* webpackChunkName: "pages/user/users" */))
const _60890e68 = () => interopDefault(import('../pages/workers/worker-create.vue' /* webpackChunkName: "pages/workers/worker-create" */))
const _4b5c25d4 = () => interopDefault(import('../pages/workers/workers.vue' /* webpackChunkName: "pages/workers/workers" */))
const _db9e1e66 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _ed1ccd56 = () => interopDefault(import('../pages/user/edit-user/_userId.vue' /* webpackChunkName: "pages/user/edit-user/_userId" */))
const _45328ed8 = () => interopDefault(import('../pages/workers/document-create/_workerId.vue' /* webpackChunkName: "pages/workers/document-create/_workerId" */))
const _fc917e6a = () => interopDefault(import('../pages/workers/edit-worker/_workerId.vue' /* webpackChunkName: "pages/workers/edit-worker/_workerId" */))
const _5c86652a = () => interopDefault(import('../pages/workers/worker-detail/_workerId.vue' /* webpackChunkName: "pages/workers/worker-detail/_workerId" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth/login",
    component: _76002d57,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _c6254fb6,
    name: "auth-register"
  }, {
    path: "/user/user-create",
    component: _e3195f62,
    name: "user-user-create"
  }, {
    path: "/user/users",
    component: _179662d9,
    name: "user-users"
  }, {
    path: "/workers/worker-create",
    component: _60890e68,
    name: "workers-worker-create"
  }, {
    path: "/workers/workers",
    component: _4b5c25d4,
    name: "workers-workers"
  }, {
    path: "/",
    component: _db9e1e66,
    name: "index"
  }, {
    path: "/user/edit-user/:userId?",
    component: _ed1ccd56,
    name: "user-edit-user-userId"
  }, {
    path: "/workers/document-create/:workerId?",
    component: _45328ed8,
    name: "workers-document-create-workerId"
  }, {
    path: "/workers/edit-worker/:workerId?",
    component: _fc917e6a,
    name: "workers-edit-worker-workerId"
  }, {
    path: "/workers/worker-detail/:workerId?",
    component: _5c86652a,
    name: "workers-worker-detail-workerId"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
