import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { beforeEach } from './routerGuard'

const allRoutes = [
  ...routes,
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' } // 如果找不到路由，重導向到首頁
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})

// 設定導航守衛
router.beforeEach(beforeEach)

export default router
