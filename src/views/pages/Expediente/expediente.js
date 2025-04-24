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
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilPrint, cilXCircle, cilZoom } from '@coreui/icons'
import logo from '../../../assets/images/fondo/consejomunicipal.jpg'

const api = helpFetch()
const Expediente = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [selectedExpediente, setSelectedExpediente] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    caso: '',
    fechaApertura: '',
    fechaCierre: '',
    status: '',
  })
  const [detailVisible, setDetailVisible] = useState(false)
  const [expedientes, setExpedientes] = useState([])
  const [filteredExpediente, setFilteredExpediente] = useState([])
  const [search, setSearch] = useState('')

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const openEditModal = (expediente) => {
    setSelectedExpediente(expediente)
    setFormData(expediente)
    setEditVisible(true)
  }

  const openDetailModal = (expediente) => {
    setSelectedExpediente(expediente)
    setDetailVisible(true)
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
    api.get('/expediente').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setExpedientes(data)
        setFilteredExpediente(data)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/expediente', { body: formData }).then((response) => {
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

  const handleEditExpediente = (e) => {
    e.preventDefault()
    if (!selectedExpediente || !selectedExpediente.id) {
      console.error('No se ha seleccionado un expediente válido.')
      return
    }

    const id = selectedExpediente.id
    console.log('Guardando expediente:', formData, selectedExpediente)
    api.put('/expediente', { body: formData }, id).then((response) => {
      if (!response.error) {
        loadExpedientes()
        setEditVisible(false)
        setSelectedExpediente(null)
      }
    })
  }

  const filterExpe = () => {
    const lowerSearch = search.toLowerCase()
    const filtered = expedientes.filter((expediente) =>
      expediente.nombre.toLowerCase().includes(lowerSearch),
    )
    setFilteredExpediente(filtered)
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
          Gestion de Expedientes
        </h2>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              <strong>
                <h4 className="mb-0">Expedientes de Niños, Niñas y Adolescentes</h4>
              </strong>
              <CFormInput
                type="text"
                placeholder="Buscar Expediente por nombre"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  filterExpe()
                }}
                style={{ maxWidth: '300px' }}
              ></CFormInput>
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
                  {filteredExpediente.length > 0 ? (
                    filteredExpediente.map((expediente) => (
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
                        <CTableDataCell>
                          <CButton
                            color="info"
                            className="me-2"
                            onClick={() => openDetailModal(expediente)}
                          >
                            <CIcon icon={cilZoom} className="me-1" /> Ver detalles
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No se encontraron Expedientes.
                      </CTableDataCell>
                    </CTableRow>
                  )}
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
                  <option value="En Proceso">En Proceso</option>
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
                  <option value="En Proceso">En proceso</option>
                  <option value="Resuelto">Resuelto</option>
                </CFormSelect>
              </div>
              <CButton color="primary" type="submit">
                Actualizar
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>

        <CModal visible={detailVisible} onClose={() => setDetailVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle> Detalles del expediente</CModalTitle>
            <div style={{ marginLeft: '50%', paddingRight: '0' }}>
              <img
                className="d-flex justify-content-between align-items-right"
                src={logo}
                alt="Logo"
                style={{ width: '120px', height: 'auto' }}
              />
            </div>
          </CModalHeader>
          <CModalBody>
            <div
              className="d-flex justify-content-between align-items-start mb-4"
              style={{ paddingRight: '0' }}
            >
              <div className="d-flex flex-column">
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className={`badge bg-${estadosColores[selectedExpediente?.estado]}`}>
                    {selectedExpediente?.estado}
                  </span>
                </p>
              </div>
              <div className="d-flex flex-column align-items-end" style={{ marginLeft: 'auto' }}>
                <span>
                  <strong>Fecha Apertura:</strong> {selectedExpediente?.fechaApertura}
                </span>
                <span>
                  <strong>Fecha de Cierre:</strong> {selectedExpediente?.fechaCierre}{' '}
                </span>
              </div>
            </div>
            {selectedExpediente ? (
              <div className="border-top mt-4 pt-4">
                <p>
                  <strong> Nombre: </strong> {selectedExpediente.nombre}
                </p>
                <p>
                  <strong> Edad: </strong> {selectedExpediente.edad}
                </p>
                <p>
                  <strong> Caso: </strong> {selectedExpediente.caso}
                </p>
              </div>
            ) : (
              <p> No se selecciono ningun expediente</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="success" className="text-uppercase">
              <CIcon icon={cilPrint} size="sm" />
              Imprimir
            </CButton>

            <CButton color="danger" onClick={() => setDetailVisible(false)}>
              <CIcon icon={cilXCircle} className="me-1"></CIcon>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </div>
  )
}

export default Expediente
