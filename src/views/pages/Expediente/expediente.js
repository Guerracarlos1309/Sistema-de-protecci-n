import React, { useState, useEffect } from 'react'
import { helpFetch } from '../../../api/helpFetch.js'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilCloudDownload } from '@coreui/icons'

const api = helpFetch()
const Expediente = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [selectedExpediente, setSelectedExpediente] = useState(null)
  const [currentExpediente, setCurrentExpediente] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    caso: '',
    fechaApertura: '',
    fechaCierre: '',
    status: '',
  })

  const [expedientes, setExpedientes] = useState([])

  const handleEditExpediente = () => {
    if (!selectedExpediente || !selectedExpediente.id) {
      console.error('No se ha seleccionado un expediente válido.')
      return
    }

    const id = selectedExpediente.id
    e.preventDefault()
    console.log('Guardando expediente:', formData, selectedExpediente)
    api.put('expediente', { body: formData }, id).then((response) => {
      if (!response.error) {
        loadExpedientes()
        setEditVisible(false)
        setSelectedExpediente(null)
      }
    })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const openEditModal = (expediente) => {
    setCurrentExpediente(expediente)
    setFormData(expediente)
    setEditVisible(true)
  }

  const estadosColores = {
    Pendiente: 'warning',
    'En Proceso': 'info',
    Resuelto: 'success',
  }

  useEffect(() => {
    loadExpedientes()
  }, [])

  const loadExpedientes = () => {
    api.get('expediente').then((data) => {
      if (!data.error) {
        setExpedientes(data)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('expediente', { body: formData }).then((response) => {
      if (!response.error) {
        loadExpedientes()
        setFormData({
          nombre: '',
          edad: '',
          caso: '',
          fechaApertura: '',
          fechaCierre: '',
          status: '',
        })
        setVisible(false)
        setConfirmationModalVisible(true)
      }
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Expedientes de Niños, Niñas y Adolescentes</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" className="mb-3" onClick={() => setVisible(true)}>
              <CIcon icon={cilPlus} className="me-2" />
              Nuevo Expediente
            </CButton>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Edad</CTableHeaderCell>
                  <CTableHeaderCell>Caso</CTableHeaderCell>
                  <CTableHeaderCell>Fecha Apertura</CTableHeaderCell>
                  <CTableHeaderCell>Fecha Cierre</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {expedientes.map((expediente) => (
                  <CTableRow key={expediente.id}>
                    <CTableDataCell>{expediente.nombre}</CTableDataCell>
                    <CTableDataCell>{expediente.edad}</CTableDataCell>
                    <CTableDataCell>{expediente.caso}</CTableDataCell>
                    <CTableDataCell>{expediente.fechaApertura}</CTableDataCell>
                    <CTableDataCell>{expediente.fechaCierre}</CTableDataCell>
                    <CTableDataCell>
                      <span className={`badge bg-${estadosColores[expediente.estado]}`}>
                        {expediente.estado}
                      </span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        className="me-2"
                        onClick={() => openEditModal(expediente)}
                      >
                        <CIcon icon={cilPencil} className="me-1" /> Editar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Nuevo Expediente</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                placeholder="Ingrese el nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="edad">Edad</CFormLabel>
              <CFormInput
                type="number"
                id="edad"
                placeholder="Ingrese la edad"
                value={formData.edad}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="caso">Caso</CFormLabel>
              <CFormInput
                type="text"
                id="caso"
                placeholder="Ingrese el tipo de caso"
                value={formData.caso}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fechaApertura">Fecha Apertura</CFormLabel>
              <CFormInput
                type="date"
                id="fechaApertura"
                value={formData.fechaApertura}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fechaCierre">Fecha Cierre</CFormLabel>
              <CFormInput
                type="date"
                id="fechaCierre"
                value={formData.fechaCierre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormSelect
                id="estado"
                label="Estado"
                value={formData.estado}
                onChange={handleInputChange}
              >
                <option value="">Seleccione el estatus</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En proceso</option>
                <option value="Resuelto">Resuelto</option>
              </CFormSelect>
            </div>
            <CButton color="primary" onClick={handleSubmit} type="submit">
              Guardar
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Expediente</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditExpediente}>
            <div className="mb-3">
              <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                placeholder="Ingrese el nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="edad">Edad</CFormLabel>
              <CFormInput
                type="number"
                id="edad"
                placeholder="Ingrese la edad"
                value={formData.edad}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="caso">Caso</CFormLabel>
              <CFormInput
                type="text"
                id="caso"
                placeholder="Ingrese el tipo de caso"
                value={formData.caso}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fechaApertura">Fecha Apertura</CFormLabel>
              <CFormInput
                type="date"
                id="fechaApertura"
                value={formData.fechaApertura}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fechaCierre">Fecha Cierre</CFormLabel>
              <CFormInput
                type="date"
                id="fechaCierre"
                value={formData.fechaCierre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="estado">Estatus</CFormLabel>
              <CFormSelect id="estado" value={formData.estado} onChange={handleInputChange}>
                <option value="">Seleccione el estatus</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Resuelto">Resuelto</option>
              </CFormSelect>
            </div>
            <CButton color="primary" type="submit" onClick={handleEditExpediente}>
              Actualizar
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default Expediente
