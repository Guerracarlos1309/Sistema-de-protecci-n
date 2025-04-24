import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilBriefcase,
  cilChild,
  cilLibraryAdd,
  cilUser,
  cilTag,
  cilLibrary,
  cilShieldAlt,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administrador',
  },
  {
    component: CNavItem,
    name: 'Funcionario',
    to: 'funcionario',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Casos',
    to: 'casos',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Expediente',
    to: 'expediente',
    icon: <CIcon icon={cilChild} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Promociones',
    to: 'promociones',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Usuario',
  },

  {
    component: CNavItem,
    name: 'Reportes',
    to: 'reportes',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Denuncias',
    to: 'denuncias',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default _nav
