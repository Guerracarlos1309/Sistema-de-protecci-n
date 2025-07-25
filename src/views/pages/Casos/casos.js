import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardHeader,
  CForm,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import {
  cilPrint,
  cilSearch,
  cilFilter,
  cilBell,
  cilCheckCircle,
  cilX,
  cilZoom,
  cilXCircle,
  cilPencil,
  cilLibraryAdd,
} from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'

import logo from '../../../assets/images/fondo/consejomunicipal.jpg'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const casos = () => {
  const [visible, setVisible] = useState(false)
  const [selectedCaso, setSelectedCaso] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterEstado, setFilterEstado] = useState('Todos')
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const itemsPerPage = 5
  const [casos, setCasos] = useState([])
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editConfirmationModalVisible, setEditConfirmationModalVisible] = useState(false)

  const [formData, setFormData] = useState({
    titulo: '',
    fechaApertura: '',
    fechaCierre: '',
    estado: 'Pendiente',
    detalles: '',
    denunciante: '',
    organismo: '',
    funcionario: '',
    tipoCaso: '',
    victima: '',
  })

  const [editFormData, setEditFormData] = useState({
    id: '',
    titulo: '',
    fechaApertura: '',
    fechaCierre: '',
    estado: 'Pendiente',
    detalles: '',
    denunciante: '',
    organismo: '',
    funcionario: '',
    tipoCaso: '',
    victima: '',
  })

  const handleEditCase = (caso) => {
    setEditFormData({
      id: caso.id,
      titulo: caso.titulo,
      fechaApertura: caso.fechaApertura,
      fechaCierre: caso.fechaCierre || '',
      estado: caso.estado,
      detalles: caso.detalles,
      denunciante: caso.denunciante,
      organismo: caso.organismo,
      funcionario: caso.funcionario,
      tipoCaso: caso.tipoCaso,
      victima: caso.victima,
    })

    setEditModalVisible(true)
    setVisible(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    const id = editFormData.id

    api.put('/casos', { body: editFormData }, id).then((response) => {
      if (!response.error) {
        loadCasos()
        setEditModalVisible(false)
        setEditConfirmationModalVisible(true)
        setVisible(false)
      } else {
        console.error('Error actualizando caso:', response)
      }
    })
  }

  const handleEditInputChange = (e) => {
    const { id, value } = e.target
    setEditFormData({ ...editFormData, [id]: value })
  }

  useEffect(() => {
    loadCasos()
  }, [])

  const loadCasos = () => {
    api.get('/casos').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setCasos(data)
      }
    })
  }

  const estadosColores = {
    Pendiente: 'warning',
    'En Proceso': 'info',
    Resuelto: 'success',
  }

  const casosFiltrados = casos.filter((caso) => {
    const matchTitle = caso.titulo && caso.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterEstado === 'Todos' || caso.estado === filterEstado
    return matchTitle && matchStatus
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const casosPaginados = casosFiltrados.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/casos', { body: formData }).then((response) => {
      if (!response.error) {
        loadCasos()
        setFormData({
          titulo: '',
          fechaApertura: '',
          fechaCierre: '',
          estado: 'Pendiente',
          detalles: '',
          denunciante: '',
          organismo: '',
          funcionario: '',
          tipoCaso: '',
          victima: '',
          fecha: '',
        })

        setAddModalVisible(false)
        setConfirmationModalVisible(true)
      }
    })
  }

  const handleShowDetails = (caso) => {
    setSelectedCaso(caso)
    setVisible(true)
  }

  const getEstadisticas = () => {
    const total = casos.length
    const pendientes = casos.filter((c) => c.estado === 'Pendiente').length
    const enProceso = casos.filter((c) => c.estado === 'En Proceso').length
    const resueltos = casos.filter((c) => c.estado === 'Resuelto').length
    return { total, pendientes, enProceso, resueltos }
  }

  const stats = getEstadisticas()

  const tipoCasoLabels = {
    1: 'Delito grave',
    2: 'Negligencia',
    3: 'Violencia',
  }

  const organismoLabels = {
    1: 'Defensoría Municipal',
    2: 'Defensoría Educativa',
    3: 'Consejo de Protección',
  }

  return (
    <div className="p-4">
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
          Gestión de Casos
        </h2>
        <CButton
          color="primary"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <CIcon icon={cilBell} className="me-2" />
          Notificaciones
        </CButton>
        <CButton
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          color="primary"
          onClick={() => setAddModalVisible(true)}
        >
          <CIcon icon={cilLibraryAdd} className="me-2" />
          Agregar Caso
        </CButton>
      </div>

      <CModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Agregar Nuevo Caso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-4">
              <CRow>
                <CCol md="6">
                  <CFormInput
                    id="titulo"
                    label="Título"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormInput
                    id="fechaApertura"
                    label="Fecha"
                    type="date"
                    value={formData.fechaApertura}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormSelect
                    id="estado"
                    label="Estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Estado del caso</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </CFormSelect>
                  <CFormTextarea
                    id="detalles"
                    label="Detalles"
                    rows="3"
                    value={formData.detalles}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md="6">
                  <CFormSelect
                    id="tipoCaso"
                    label="Tipo caso"
                    value={formData.tipoCaso}
                    onChange={handleInputChange}
                  >
                    <option value="placeholder" dissable selected>
                      Tipo de caso
                    </option>
                    <option value="1">Delito grave</option>
                    <option value="2">Violencia</option>
                    <option value="3">Negligencia</option>
                  </CFormSelect>

                  <CFormInput
                    id="denunciante"
                    label="Denunciante"
                    value={formData.denunciante}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormSelect
                    id="organismo"
                    label="Organismo"
                    value={formData.organismo}
                    onChange={handleInputChange}
                  >
                    <option value="placeholder" dissable selected>
                      Organismo responsable
                    </option>
                    <option value="1">Defensoria Municipal</option>
                    <option value="2">Defensoria Educativa</option>
                    <option value="3">Consejo de proteccion</option>
                  </CFormSelect>
                  <CFormInput
                    id="victima"
                    label="Victima"
                    value={formData.victima}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormSelect
                    id="funcionario"
                    label="Funcionario"
                    value={formData.funcionario}
                    onChange={handleInputChange}
                  >
                    <option value="placeholder" dissable selected>
                      Funcionario responsable
                    </option>
                    <option value="Jennifer Pulido">Jennifer Pulido</option>
                    <option value="Jennifer Guerrero">Jennifer Guerrero</option>
                    <option value="Daniela Lozano">Daniela Lozano</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </div>
            <CButton color="primary" onClick={handleSubmit} className="me-2" type="submit">
              Guardar
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={confirmationModalVisible} onClose={() => setConfirmationModalVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Éxito</CModalTitle>
        </CModalHeader>
        <CModalBody>Caso agregado con éxito.</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfirmationModalVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow className="mb-4 g-3">
        <CCol xs={12} md={3}>
          <CCard className="bg-primary text-white h-100">
            <CCardBody>
              <h5>Total Casos</h5>
              <h2>{stats.total}</h2>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={3}>
          <CCard className="bg-warning text-white h-100">
            <CCardBody>
              <h5>Pendientes</h5>
              <h2>{stats.pendientes}</h2>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={3}>
          <CCard className="bg-info text-white h-100">
            <CCardBody>
              <h5>En Proceso</h5>
              <h2>{stats.enProceso}</h2>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={3}>
          <CCard className="bg-success text-white h-100">
            <CCardBody>
              <h5>Resueltos</h5>
              <h2>{stats.resueltos}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <h2
        className="mb-4 text-center position-relative pb-3"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#4a4a4a',
          borderBottom: '3px solid',
          borderImage: 'linear-gradient(to right, transparent, #4a4a4a, transparent) 1',
        }}
      >
        Filtrar casos por:
      </h2>

      <CRow className="mb-4 align-items-center">
        <CCol md={6}>
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Buscar por título"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-4"
            />
            <CIcon
              icon={cilSearch}
              size="xl"
              className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
            />
          </div>
        </CCol>
        <CCol md={6} className="d-flex justify-content-end">
          <CDropdown className="me-2">
            <CDropdownToggle color="light">
              <CIcon icon={cilFilter} className="me-2" />
              Estado: {filterEstado}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => setFilterEstado('Todos')}>Todos</CDropdownItem>
              <CDropdownItem onClick={() => setFilterEstado('Pendiente')}>Pendiente</CDropdownItem>
              <CDropdownItem onClick={() => setFilterEstado('En Proceso')}>
                En Proceso
              </CDropdownItem>
              <CDropdownItem onClick={() => setFilterEstado('Resuelto')}>Resuelto</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
          <strong>
            <h4 className="mb-0">Casos</h4>
          </strong>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {casosPaginados.length > 0 ? (
                casosPaginados.map((caso, index) => (
                  <CTableRow key={caso.id}>
                    <CTableDataCell>
                      {' '}
                      <strong>{(currentPage - 1) * itemsPerPage + index + 1}</strong>
                    </CTableDataCell>
                    <CTableDataCell>{caso.titulo}</CTableDataCell>
                    <CTableDataCell>{caso.fechaApertura}</CTableDataCell>
                    <CTableDataCell>
                      <span className={`badge bg-${estadosColores[caso.estado]}`}>
                        {caso.estado}
                      </span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        className="me-2"
                        onClick={() => handleShowDetails(caso)}
                      >
                        <CIcon icon={cilZoom} className="me-1" />
                        Ver Detalles
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" className="text-center">
                    No se encontraron Casos
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>

          <CPagination className="justify-content-center">
            {[...Array(Math.ceil(casosFiltrados.length / itemsPerPage))].map((_, index) => (
              <CPaginationItem
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
          </CPagination>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader className="d-flex justify-content-between align-items-center">
          <CModalTitle>Detalles del Caso</CModalTitle>
          <div style={{ marginLeft: '55%', paddingRight: '0' }}>
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
                <span>
                  <p>
                    <strong>Título:</strong> {selectedCaso?.titulo}
                  </p>
                </span>
                <strong>Estado:</strong>{' '}
                <span className={`badge bg-${estadosColores[selectedCaso?.estado]}`}>
                  {selectedCaso?.estado}
                </span>
              </p>
            </div>
            <div className="d-flex flex-column align-items-end" style={{ marginLeft: 'auto' }}>
              <span>
                <strong>Fecha Apertura:</strong> {selectedCaso?.fechaApertura}
              </span>
              <span>
                <strong>Fecha de Cierre:</strong> {selectedCaso?.fechaCierre}{' '}
              </span>
            </div>
          </div>
          <div className="border-top mt-4 pt-4">
            <p>
              <strong>Niño, niña o adolescente:</strong> {selectedCaso?.victima}
            </p>

            <p>
              <strong>Detalles:</strong> {selectedCaso?.detalles}
            </p>
            <p>
              <strong>Tipo de caso:</strong>{' '}
              {tipoCasoLabels[selectedCaso?.tipoCaso] || 'No especificado'}
            </p>

            <p>
              <strong>Denunciante:</strong> {selectedCaso?.denunciante}
            </p>
          </div>
        </CModalBody>
        <CModalFooter>
          <div className="d-flex flex-column align-items-start" style={{ marginRight: 'auto' }}>
            <p>
              <strong>Funcionario:</strong> {selectedCaso?.funcionario}
            </p>
            <p>
              <strong>Organismo:</strong>{' '}
              {organismoLabels[selectedCaso?.organismo] || 'No especificado'}
            </p>
          </div>
        </CModalFooter>
        <CModalFooter>
          <CButton color="success" className="text-uppercase" style={{ width: '150px' }}>
            <CIcon icon={cilPrint} className="me-1"></CIcon>
            Imprimir
          </CButton>
          <CButton color="warning" onClick={() => handleEditCase(selectedCaso)}>
            <CIcon icon={cilPencil} className="me-1" />
            Editar
          </CButton>
          <CButton color="danger" onClick={() => setVisible(false)}>
            <CIcon icon={cilXCircle} className="me-1"></CIcon>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Editar Caso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <CRow>
                <CCol md="6">
                  <CFormInput
                    id="titulo"
                    label="Título"
                    value={editFormData.titulo}
                    onChange={handleEditInputChange}
                    required
                  />
                  <CFormInput
                    id="fechaApertura"
                    label="Fecha Apertura"
                    type="date"
                    value={editFormData.fechaApertura}
                    onChange={handleEditInputChange}
                    required
                  />
                  <CFormInput
                    id="fechaCierre"
                    label="Fecha Cierre"
                    type="date"
                    value={editFormData.fechaCierre}
                    onChange={handleEditInputChange}
                  />
                  <CFormSelect
                    id="estado"
                    label="Estado"
                    value={editFormData.estado}
                    onChange={handleEditInputChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </CFormSelect>
                  <CFormTextarea
                    id="detalles"
                    label="Detalles"
                    rows="3"
                    value={editFormData.detalles}
                    onChange={handleEditInputChange}
                    required
                  />
                </CCol>
                <CCol md="6">
                  <CFormSelect
                    id="tipoCaso"
                    label="Tipo caso"
                    value={editFormData.tipoCaso}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Tipo de caso</option>
                    <option value="1">Delito grave</option>
                    <option value="2">Violencia</option>
                    <option value="3">Negligencia</option>
                  </CFormSelect>
                  <CFormInput
                    id="denunciante"
                    label="Denunciante"
                    value={editFormData.denunciante}
                    onChange={handleEditInputChange}
                    required
                  />
                  <CFormSelect
                    id="organismo"
                    label="Organismo"
                    value={editFormData.organismo}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Organismo responsable</option>
                    <option value="1">Defensoria Municipal</option>
                    <option value="2">Defensoria Educativa</option>
                    <option value="3">Consejo de proteccion</option>
                  </CFormSelect>
                  <CFormInput
                    id="victima"
                    label="Victima"
                    value={editFormData.victima}
                    onChange={handleEditInputChange}
                    required
                  />
                  <CFormSelect
                    id="funcionario"
                    label="Funcionario"
                    value={editFormData.funcionario}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Funcionario responsable</option>
                    <option value="Jennifer Pulido">Jennifer Pulido</option>
                    <option value="Jennifer Guerrero">Jennifer Guerrero</option>
                    <option value="Daniela Lozano">Daniela Lozano</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleEditSubmit}>
            <CIcon icon={cilCheckCircle} className="me-1"></CIcon>
            Guardar Cambios
          </CButton>
          <CButton color="danger" onClick={() => setEditModalVisible(false)}>
            <CIcon icon={cilXCircle} className="me-1"></CIcon>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={editConfirmationModalVisible}
        onClose={() => setEditConfirmationModalVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Éxito</CModalTitle>
        </CModalHeader>
        <CModalBody>Caso editado con éxito.</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setEditConfirmationModalVisible(false)}>
            <CIcon icon={cilXCircle} className="me-1"></CIcon>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default casos
