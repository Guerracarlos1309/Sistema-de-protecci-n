import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import { helpFetch } from '../../../api/helpFetch.js'
import logo from '../../../assets/images/fondo/consejomunicipal.jpg'
import { cilXCircle, cilZoom } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'
import { array } from 'prop-types'
const api = helpFetch()

const Denuncias = () => {
  const [denuncias, setDenuncias] = useState([])
  const [selectedDenuncia, setSelectedDenuncia] = useState(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    titulo: '',
    descripcion: '',
    denunciante: '',
    fecha: '',
  })

  useEffect(() => {
    loadDenuncias()
  }, [])

  const loadDenuncias = () => {
    api
      .get('denuncias')
      .then((data) => {
        if (!data.error && Array.isArray(data)) {
          setDenuncias(data)
        }
      })
      .catch((error) => {
        console.error('Error loading complaints:', error)
      })
  }

  const handleMoreInfo = (denuncia) => {
    setSelectedDenuncia(denuncia)
    setIsInfoModalOpen(true)
  }

  const handleEdit = (denuncia) => {
    setSelectedDenuncia(denuncia)
    setEditForm({
      titulo: denuncia.titulo,
      descripcion: denuncia.descripcion,
      denunciante: denuncia.denunciante,
      fecha: denuncia.fecha,
    })
    setIsEditModalOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditSubmit = () => {
    if (selectedDenuncia) {
      api
        .put(`denuncias/${selectedDenuncia.id}`, editForm)
        .then((updatedDenuncia) => {
          setDenuncias((prev) =>
            prev.map((d) => (d.id === selectedDenuncia.id ? updatedDenuncia : d)),
          )
          setIsEditModalOpen(false)
        })
        .catch((error) => {
          console.error('Error updating complaint:', error)
        })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta denuncia?')) {
      api
        .delete(`denuncias/${id}`)
        .then(() => {
          setDenuncias((prev) => prev.filter((d) => d.id !== id))
        })
        .catch((error) => {
          console.error('Error deleting complaint:', error)
        })
    }
  }

  return (
    <>
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
          Gestion de denuncias
        </h2>
      </div>
      <CCard>
        <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
          <strong>
            <h4 className="mb-0">Lista de Denuncias</h4>
          </strong>
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            {denuncias.length > 0 ? (
              denuncias.map((denuncia) => (
                <CListGroupItem
                  key={denuncia.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{denuncia.titulo}</h5>
                    <small>Fecha: {denuncia.fecha}</small>
                    <br />
                    <small>Denunciante: {denuncia.denunciante}</small>
                  </div>

                  <div>
                    <CButton color="info" className="me-1" onClick={() => handleMoreInfo(denuncia)}>
                      <CIcon icon={cilZoom} size="sm" className="me-1" />
                      Más Info
                    </CButton>
                    <CButton
                      color="danger"
                      className="me-1"
                      onClick={() => handleDelete(denuncia.id)}
                    >
                      <CIcon icon={cilXCircle} className="me-1"></CIcon>
                      Eliminar
                    </CButton>
                  </div>
                </CListGroupItem>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="5" className="text-center">
                  No se encontraron Expedientes.
                </CTableDataCell>
              </CTableRow>
            )}
          </CListGroup>
        </CCardBody>
      </CCard>

      <CModal visible={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Detalles de la Denuncia</CModalTitle>

          <div style={{ paddingRight: '0' }}>
            <img
              className="d-flex justify-content-between align-items-right"
              src={logo}
              alt="Logo"
              style={{ width: '120px', height: 'auto', marginLeft: '80%' }}
            />
          </div>
        </CModalHeader>

        {selectedDenuncia ? (
          <CModalBody>
            <CCard className="p-3 shadow-sm">
              <CCardBody>
                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Titulo:</strong> {selectedDenuncia.titulo}
                    </p>
                    <p className="mb-1">
                      <strong>Fecha:</strong> {selectedDenuncia.fecha}
                    </p>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Denunciante:</strong> {selectedDenuncia.denunciante}
                    </p>
                  </CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Dirección:</strong> {selectedDenuncia.direccion}
                    </p>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Teléfono:</strong> {selectedDenuncia.telefono}
                    </p>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Email:</strong> {selectedDenuncia.email}
                    </p>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <p className="mb-1">
                      <strong>Motivos:</strong> {selectedDenuncia.motivo}
                    </p>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CModalBody>
        ) : (
          <CModalBody>
            <p>No se seleccionó ninguna denuncia.</p>
          </CModalBody>
        )}

        <CModalFooter>
          <CButton color="danger" className="me-1" onClick={() => setIsInfoModalOpen(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Denuncias
