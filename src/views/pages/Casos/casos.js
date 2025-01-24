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
import { cilPrint, cilSearch, cilFilter, cilBell, cilCheckCircle, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import logo from '../../../assets/images/fondo/consejomunicipal.jpg'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const casos = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSave, setVisibleSave] = useState(false)
  const [selectedCaso, setSelectedCaso] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterEstado, setFilterEstado] = useState('Todos')
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const itemsPerPage = 5
  const [casos, setCasos] = useState([])

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

  useEffect(() => {
    loadCasos()
  }, [])

  const loadCasos = () => {
    api.get('casos').then((data) => {
      if (!data.error) {
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
    api.post('casos', { body: formData }).then((response) => {
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
              >
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
              <CFormSelect
                id="tipoCaso"
                label="Tipo caso"
                value={formData.tipoCaso}
                onChange={handleInputChange}
              >
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
              <CFormInput
                id="funcionario"
                label="Funcionario"
                value={formData.funcionario}
                onChange={handleInputChange}
                required
              />
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
        <CModalBody>Usuario agregado con éxito.</CModalBody>
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
        <CCardHeader>
          <strong>Casos</strong>
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
              {casosPaginados.map((caso) => (
                <CTableRow key={caso.id}>
                  <CTableDataCell>{caso.id}</CTableDataCell>
                  <CTableDataCell>{caso.titulo}</CTableDataCell>
                  <CTableDataCell>{caso.fechaApertura}</CTableDataCell>
                  <CTableDataCell>
                    <span className={`badge bg-${estadosColores[caso.estado]}`}>{caso.estado}</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      variant="outline"
                      size="sm"
                      onClick={() => handleShowDetails(caso)}
                    >
                      Ver Detalles
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
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
            Imprimir
          </CButton>
          <CButton color="warning" onClick={() => set}>
            Editar
          </CButton>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default casos
