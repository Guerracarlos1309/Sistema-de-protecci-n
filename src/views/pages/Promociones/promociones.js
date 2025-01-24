/*import React, { useState } from 'react'
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
} from '@coreui/react'

const PromocionesModule = () => {
  const [promociones, setPromociones] = useState([
    {
      id: 1,
      titulo: 'Campaña de Vacunación',
      descripcion: 'Campaña de vacunación para niños y adolescentes',
      fecha: '2025-01-15',
      lugar: 'Centro Comunitario San José',
      beneficiarios: 'Niños de 0-12 años',
      estado: 'Activo',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    beneficiarios: '',
    estado: 'Activo',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPromocion = {
      id: promociones.length + 1,
      ...formData,
    }
    setPromociones([...promociones, newPromocion])
    setShowModal(false)
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      lugar: '',
      beneficiarios: '',
      estado: 'Activo',
    })
  }

  return (
    <div className="p-4">
      <CRow>
        <CCol>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Gestión de Promociones</h4>
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
                    {promociones.map((promocion) => (
                      <tr key={promocion.id}>
                        <td>{promocion.titulo}</td>
                        <td>{promocion.fecha}</td>
                        <td>{promocion.lugar}</td>
                        <td>{promocion.beneficiarios}</td>
                        <td>
                          <span
                            className={`badge ${promocion.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {promocion.estado}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <CButton color="info" size="sm" variant="outline">
                              Detalles
                            </CButton>
                            <CButton color="danger" size="sm" variant="outline">
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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Nueva Promoción</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel>Título</CFormLabel>
              <CFormInput
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Descripción</CFormLabel>
              <CFormTextarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Fecha</CFormLabel>
              <CFormInput
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Lugar</CFormLabel>
              <CFormInput
                value={formData.lugar}
                onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Beneficiarios</CFormLabel>
              <CFormInput
                value={formData.beneficiarios}
                onChange={(e) => setFormData({ ...formData, beneficiarios: e.target.value })}
                required
              />
            </div>
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
    </div>
  )
}

export default PromocionesModule*/

import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const InsertarDenuncias = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <CCard>
        <CCardHeader>
          <h3>Insertar Denuncia</h3>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="titulo">Título</CFormLabel>
              <CFormInput type="text" id="titulo" placeholder="Ingrese el título de la denuncia" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="descripcion">Descripción</CFormLabel>
              <CFormTextarea
                id="descripcion"
                rows="4"
                placeholder="Describa los detalles de la denuncia"
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="ubicacion">Ubicación</CFormLabel>
              <CFormInput
                type="text"
                id="ubicacion"
                placeholder="Ingrese la ubicación del incidente"
              />
            </div>
            <CButton color="primary" type="submit">
              Enviar Denuncia
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ced4da',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Agente Virtual
        </div>
        <div style={{ padding: '10px', flex: '1', overflowY: 'auto' }}>
          <p style={{ fontStyle: 'italic', color: '#6c757d' }}>
            "Hola, soy tu agente virtual. ¿En qué puedo ayudarte hoy?"
          </p>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '5px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InsertarDenuncias
