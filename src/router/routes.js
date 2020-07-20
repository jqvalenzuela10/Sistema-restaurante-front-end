
const routes = [
  { path: '/', component: () => import('pages/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/products', component: () => import('pages/products.vue') },
      { path: '/change_request', component: () => import('pages/change_request.vue') },
      { path: '/my_profile', component: () => import('pages/my_profile.vue') },
      { path: '/sales_invoices', component: () => import('pages/sales_invoices.vue') },
      { path: '/quotes', component: () => import('pages/quotes.vue') },
      { path: '/transactions', component: () => import('pages/transactions.vue') },
      { path: '/empleados', component: () => import('pages/empleados.vue') },      
      { path: '/calendar', component: () => import('pages/calendar.vue') },
      { path: '/sucursales', component: () => import('pages/sucursales.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
