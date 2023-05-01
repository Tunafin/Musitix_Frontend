import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeLayout.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginLayout.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/newMessage/NewMessageLayout.vue')
  },
  {
    path: '/member',
    component: () => import('@/views/member/MemberLayout.vue'),   
    meta: { requiresAuth: true },
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/member/Account.vue'),
      },
      {
        path: ":pathMatch(.*)*",
        redirect: 'account'
      }
    ]
  }
]
export default routes
