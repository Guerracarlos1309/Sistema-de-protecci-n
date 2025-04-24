import React from 'react'
import { CFooter } from '@coreui/react'
import { color } from 'chart.js/helpers'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">
          &copy; 2025 Sistema de proteccion de niños, niñas y adolescentes del municipio Andres
          Bello.
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        Carlos Guerra.
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
