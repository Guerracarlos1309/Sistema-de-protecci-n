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
} from '@coreui/react'
import { helpFetch } from '../../../api/helpFetch.js'

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

  // Load complaints when component mounts
  useEffect(() => {
    loadDenuncias()
  }, [])

  // Fetch complaints from API
  const loadDenuncias = () => {
    api
      .get('denuncias')
      .then((data) => {
        if (!data.error) {
          setDenuncias(data)
        }
      })
      .catch((error) => {
        console.error('Error loading complaints:', error)
      })
  }

  // Open info modal
  const handleMoreInfo = (denuncia) => {
    setSelectedDenuncia(denuncia)
    setIsInfoModalOpen(true)
  }

  // Open edit modal
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

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit edited complaint
  const handleEditSubmit = () => {
    if (selectedDenuncia) {
      api
        .put(`denuncias/${selectedDenuncia.id}`, editForm)
        .then((updatedDenuncia) => {
          // Update the list of complaints
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

  // Delete a complaint
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
      <CCard>
        <CCardHeader>
          <h2>Lista de Denuncias</h2>
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            {denuncias.map((denuncia) => (
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
                  <CButton
                    color="primary"
                    variant="outline"
                    className="me-2"
                    onClick={() => handleEdit(denuncia)}
                  >
                    Editar
                  </CButton>
                  <CButton
                    color="info"
                    variant="outline"
                    className="me-2"
                    onClick={() => handleMoreInfo(denuncia)}
                  >
                    Más Info
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => handleDelete(denuncia.id)}
                  >
                    Eliminar
                  </CButton>
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCard>

      {/* Info Modal */}
      <CModal visible={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Detalles de la Denuncia</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedDenuncia && (
            <>
              <h4>{selectedDenuncia.titulo}</h4>
              <p>
                <strong>Fecha:</strong> {selectedDenuncia.fecha}
              </p>
              <p>
                <strong>Denunciante:</strong> {selectedDenuncia.denunciante}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedDenuncia.descripcion}
              </p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsInfoModalOpen(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Modal */}
      <CModal visible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Editar Denuncia</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormInput
                type="text"
                name="titulo"
                label="Título"
                value={editForm.titulo}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <CFormTextarea
                name="descripcion"
                label="Descripción"
                value={editForm.descripcion}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                name="denunciante"
                label="Denunciante"
                value={editForm.denunciante}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="date"
                name="fecha"
                label="Fecha"
                value={editForm.fecha}
                onChange={handleEditChange}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsEditModalOpen(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleEditSubmit}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Denuncias
