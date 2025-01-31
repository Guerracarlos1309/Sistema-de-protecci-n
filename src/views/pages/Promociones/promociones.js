import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CFormSelect,
  CBadge,
} from '@coreui/react'
import { cilPrint, cilPencil, cilXCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { helpFetch } from '../../../api/helpFetch.js'
import logo from '../../../assets/images/fondo/consejomunicipal.jpg'

const api = helpFetch()

const promociones = () => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const [promociones, setPromociones] = useState([])
  const [promocionSeleccionada, setPromocionSeleccionada] = useState(null)
  const [newPromocionn, setNewPromocionn] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    beneficiarios: '',
    estado: 'Activo',
    tipoPromo: '',
    funcionario: '',
  })

  const openModal = (promocion) => {
    setPromocionSeleccionada(promocion)
    setVisibleDetails(true)
  }
  useEffect(() => {
    loadPromocion()
  }, [])

  const loadPromocion = () => {
    api.get('promociones').then((data) => {
      if (!data.error) {
        setPromociones(data)
      }
    })
  }
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e) => {
    api.post('promociones', { body: newPromocionn }).then((response) => {
      if (!response.error) {
        setShowModal(false)
        loadPromocion()
        setNewPromocionn({
          titulo: '',
          descripcion: '',
          fecha: '',
          lugar: '',
          beneficiarios: '',
          estado: 'Activo',
          tipoPromo: '',
          funcionario: '',
        })
      }
    })
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewPromocionn({
      ...newPromocionn,
      [id]: value,
    })
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
          Gestion de Promociones
        </h2>
      </div>
      <CRow>
        <CCol>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              <strong>
                <h4 className="mb-0">Gestión de Promociones</h4>
              </strong>
              <CButton
                color="light"
                variant="outline"
                onClick={() => setShowModal(true)}
                className="d-flex align-items-center gap-2"
              >
                Nueva Promoción
              </CButton>
            </CCardHeader>
            <CCardBody>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Título</th>
                      <th>Fecha</th>
                      <th>Lugar</th>
                      <th>Beneficiarios</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promociones.map((promociones) => (
                      <tr key={promociones.id}>
                        <td>{promociones.titulo}</td>
                        <td>{promociones.fecha}</td>
                        <td>{promociones.lugar}</td>
                        <td>{promociones.beneficiarios}</td>
                        <td>
                          <span
                            className={`badge ${promociones.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {promociones.estado}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <CButton
                              color="info"
                              className="me-1"
                              onClick={() => openModal(promociones)}
                            >
                              <CIcon icon={cilPencil} className="me-1" />
                              Detalles
                            </CButton>
                            <CButton color="danger" size="sm" className="me-1">
                              <CIcon icon={cilXCircle} className="me-1"></CIcon>
                              Delete
                            </CButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal size="lg" visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Nueva Promoción</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Título</CFormLabel>
                  <CFormInput
                    type="text"
                    id="titulo"
                    placeholder="Ingrese el titulo de la promoción"
                    value={newPromocionn.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel>Descripción</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="descripcion"
                    placeholder="Ingrese la descripcion de la promocion"
                    value={newPromocionn.descripcion}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel>Fecha</CFormLabel>
                  <CFormInput
                    type="date"
                    id="fecha"
                    value={newPromocionn.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel>Lugar</CFormLabel>
                  <CFormInput
                    type="text"
                    id="lugar"
                    placeholder="Ingrese el lugar prra realizar la promocion"
                    value={newPromocionn.lugar}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>

              <CCol md="6">
                <div className="mb-3">
                  <CFormLabel>Beneficiarios</CFormLabel>
                  <CFormSelect
                    id="beneficiarios"
                    aria-label="DefaultSelect"
                    value={newPromocionn.beneficiarios}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione el cargo: </option>
                    <option value="Menores 10 años"> Niños yniñas menores a 10 años</option>
                    <option value="10 a 15 años">
                      {' '}
                      Niños, niñas y adolescentes entre 10 y 15 años
                    </option>
                    <option value="16 a 18 años"> Adolescentes</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel> Tipo De promocion</CFormLabel>
                  <CFormSelect
                    id="tipoPromo"
                    aria-label="DefaultSelect"
                    value={newPromocionn.tipoPromo}
                    onChange={handleInputChange}
                  >
                    <option value=""> Seleccione el tipo de promocion</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel> Funcionario</CFormLabel>
                  <CFormSelect
                    id="funcionario"
                    aria-label="DefaultSelect"
                    value={newPromocionn.funcionario}
                    onChange={handleInputChange}
                  >
                    <option value=""> Seleccione el Funcionario</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CFormSelect>
                </div>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visibleDetails} onClose={() => setVisibleDetails(false)}>
        <CModalHeader>
          <CModalTitle>
            <strong>Detalles de la Promoción</strong>
          </CModalTitle>
          <div className="ms-auto">
            <img
              src={logo}
              alt="Logo Consejo Municipal"
              style={{ width: '120px', height: 'auto' }}
            />
          </div>
        </CModalHeader>

        <CModalBody>
          {promocionSeleccionada ? (
            <>
              <CRow className="mb-3">
                <CCol xs="8">
                  <h5 className="fw-bold">{promocionSeleccionada.titulo}</h5>
                </CCol>
                <CCol xs="4" className="text-end text-muted">
                  <small>{promocionSeleccionada.fecha}</small>
                </CCol>
              </CRow>
              <CCard className="p-3 shadow-sm">
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <p>
                        <strong>Lugar:</strong> {promocionSeleccionada.lugar}
                      </p>
                      <p>
                        <strong>Beneficiarios:</strong> {promocionSeleccionada.beneficiarios}
                      </p>
                    </CCol>
                    <CCol md="6">
                      <p>
                        <strong>Tipo de promoción:</strong> {promocionSeleccionada.tipoPromo}
                      </p>
                      <p>
                        <strong>Estado:</strong>{' '}
                        <CBadge
                          color={
                            promocionSeleccionada.estado === 'Activo' ? 'success' : 'secondary'
                          }
                        >
                          {promocionSeleccionada.estado}
                        </CBadge>
                      </p>
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CCol>
                      <p className="text-center">
                        <strong>Descripción:</strong> {promocionSeleccionada.descripcion}
                      </p>
                    </CCol>
                  </CRow>

                  <CRow className="mt-3">
                    <CCol className="text-start">
                      <p>
                        <strong>Funcionario:</strong> {promocionSeleccionada.funcionario}
                      </p>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </>
          ) : (
            <p className="text-center text-muted">No se ha seleccionado ninguna promoción.</p>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton color="danger" className="me-2" onClick={() => setVisibleDetails(false)}>
            <CIcon icon={cilXCircle} className="me-1"></CIcon>
            Cerrar
          </CButton>
          <CButton color="success" className="me-2">
            <CIcon icon={cilPrint} size="sm" />
            Imprimir
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default promociones
