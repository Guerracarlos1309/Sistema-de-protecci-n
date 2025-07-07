import React, { useState, useEffect } from 'react'
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
  CFormInput,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPrint, cilZoom } from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'
import logo from '../../../assets/images/fondo/consejomunicipal.jpg'

const api = helpFetch()

const Reportes = () => {
  const [reportes, setReportes] = useState([])
  const [filteredReportes, setFilteredReportes] = useState([])
  const [search, setSearch] = useState('')
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectedReporte, setSelectedReporte] = useState(null)

  useEffect(() => {
    loadReportes()
  }, [])

  useEffect(() => {
    filterReportes()
  }, [search, reportes])

  const loadReportes = () => {
    api.get('/reportes').then((data) => {
      if (!data.error) {
        setReportes(data)
        setFilteredReportes(data)
      }
    })
  }

  const filterReportes = () => {
    if (Array.isArray(reportes)) {
      const lowerSearch = search.toLowerCase()
      const filtered = reportes.filter((reporte) =>
        reporte.titulo.toLowerCase().includes(lowerSearch),
      )
      setFilteredReportes(filtered)
    }
  }

  const openDetailModal = (reporte) => {
    setSelectedReporte(reporte)
    setDetailVisible(true)
  }

  return (
    <div>
      <div className="mb-4 position-relative">
        <h2
          className="text-center position-relative pb-3"
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#4a4a4a',
            borderBottom: '3px solid',
            borderImage: 'linear-gradient(to right, transparent, #4a4a4a, transparent) 1',
          }}
        >
          Modulo de Reportes
        </h2>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              <strong>
                <h4 className="mb-0">Lista de Reportes</h4>
              </strong>
              <CFormInput
                type="text"
                placeholder="Buscar por título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: '300px' }}
              />
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Título</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredReportes.length > 0 ? (
                    filteredReportes.map((reporte, index) => (
                      <CTableRow key={reporte.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{reporte.titulo}</CTableDataCell>
                        <CTableDataCell>{reporte.fecha}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={reporte.estado === 'Activo' ? 'success' : 'danger'}>
                            {reporte.estado}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="success" className="me-1">
                            <CIcon icon={cilPrint} size="sm" /> Imprimir
                          </CButton>
                          <CButton
                            color="info"
                            className="me-1"
                            onClick={() => openDetailModal(reporte)}
                          >
                            <CIcon icon={cilZoom} size="sm" className="me-1" /> Detalles
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No se encontraron Reportes
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CModal visible={detailVisible} onClose={() => setDetailVisible(false)}>
          <CModalHeader>
            <CModalTitle>
              <h5>
                <strong>Detalles del Reporte</strong>
              </h5>
            </CModalTitle>
            <div className="ms-auto">
              <img
                src={logo}
                alt="Logo Consejo Municipal"
                style={{ width: '120px', height: 'auto', marginLeft: 100 }}
              />
            </div>
          </CModalHeader>
          {selectedReporte ? (
            <CModalBody>
              <CRow className="mb-3">
                <CCol xs="8">
                  <h5 className="fw-bold">{selectedReporte.titulo}</h5>
                </CCol>
                <CCol xs="4" className="text-end text-muted">
                  <small>{selectedReporte.fecha}</small>
                </CCol>
              </CRow>

              <CCard className="p-3 shadow-sm">
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <p>
                        <strong>ID:</strong> {selectedReporte.id}
                      </p>
                      <p>
                        <strong>Tipo de reporte:</strong> {selectedReporte.tipoReporte}
                      </p>
                      <p>
                        <strong>Estado:</strong>{' '}
                        <CBadge color={selectedReporte.estado === 'Activo' ? 'success' : 'danger'}>
                          {selectedReporte.estado}
                        </CBadge>
                      </p>
                    </CCol>
                    <CCol md="6">
                      <p>
                        <strong>Descripción:</strong> {selectedReporte.descripcion || 'N/A'}
                      </p>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CModalBody>
          ) : (
            <p className="text-center text-muted">No se seleccionó ningún reporte.</p>
          )}
          <CModalFooter>
            <CRow className="mt-3">
              <CCol className="text-center">
                <CButton className="me-1" color="danger" onClick={() => setDetailVisible(false)}>
                  Cerrar
                </CButton>
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </CRow>
    </div>
  )
}

export default Reportes
