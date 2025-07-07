import path from 'path'
import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const funcionario = React.lazy(() => import('./views/pages/Funcionario/funcionario'))
const casos = React.lazy(() => import('./views/pages/Casos/casos'))
const expediente = React.lazy(() => import('./views/pages/Expediente/expediente'))
const reportes = React.lazy(() => import('./views/pages/Reportes/reportes'))
const promociones = React.lazy(() => import('./views/pages/Promociones/promociones'))
const denuncias = React.lazy(() => import('./views/pages/Denuncias/denuncias'))
const profile = React.lazy(() => import('./views/pages/Profile/Profile'))
const publico = React.lazy(() => import('./views/pages/publico/publico'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/funcionario', name: 'Funcionario', element: funcionario },
  { path: '/casos', name: 'Casos', element: casos },
  { path: '/expediente', name: 'Expediente', element: expediente },
  { path: '/reportes', name: 'Reportes', element: reportes },
  { path: '/promociones', name: 'promociones', element: promociones },
  { path: '/denuncias', name: 'Denuncias', element: denuncias },
  { path: '/profile', name: 'Profile', element: profile },
  { path: '/PUBLICO', name: 'Publico', element: publico },
]

export default routes
