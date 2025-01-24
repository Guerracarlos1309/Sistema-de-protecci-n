import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPrint, cilPencil } from '@coreui/icons'
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const Reportes = () => {
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    loadReportes()
  }, [])

  const loadReportes = () => {
    api.get('reportes').then((data) => {
      if (!data.error) {
        setReportes(data)
      }
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Reportes</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Título</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reportes.map((reporte) => (
                  <CTableRow key={reporte.id}>
                    <CTableHeaderCell scope="row">{reporte.id}</CTableHeaderCell>
                    <CTableDataCell>{reporte.titulo}</CTableDataCell>
                    <CTableDataCell>{reporte.fecha}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" className="me-2">
                        <CIcon icon={cilPrint} size="sm" /> Imprimir
                      </CButton>
                      <CButton color="warning">
                        <CIcon icon={cilPencil} size="sm" /> Editar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Reportes
