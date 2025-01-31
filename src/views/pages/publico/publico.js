import React, { useState } from 'react'
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
  CFormInput,
} from '@coreui/react'

import logo from '../../../assets/images/fondo/consejomunicipal.jpg'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const VirtualAgent = ({ onAction }) => {
  const [message, setMessage] = useState('¡Hola! ¿En qué puedo ayudarte hoy?')

  const handleResponse = (action) => {
    if (action === 'denuncia') {
      setMessage('Perfecto. Vamos a iniciar el proceso de denuncia. Necesitaré algunos detalles.')
      onAction('denuncia')
    } else if (action === 'reporte') {
      setMessage('Genial, vamos a crear un reporte. ¿Qué tipo de reporte deseas generar?')
      onAction('reporte')
    }
  }

  return (
    <div style={styles.virtualAgent}>
      <div style={styles.avatar}>
        <img src={logo} alt="Logo" className="sidebar-brand-full" height={80} width={210} />
      </div>
      <div style={styles.chatBox}>
        <div>{message}</div>
      </div>
      <div style={styles.actions}>
        <CButton color="primary" style={styles.button} onClick={() => handleResponse('denuncia')}>
          Crear Denuncia
        </CButton>
        <CButton color="warning" style={styles.button} onClick={() => handleResponse('reporte')}>
          Crear Reporte
        </CButton>
      </div>
    </div>
  )
}

const ProtectionSystem = () => {
  const [action, setAction] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  })
  const [newDenuncia, setNewDenuncia] = useState({
    id: '',
    titulo: '',
    fecha: '',
    denunciante: '',
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    motivo: '',
    direccion: '',
  })

  const handleAgentAction = (actionType) => {
    setAction(actionType)
    setModalVisible(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    api.post('denuncias', { body: newDenuncia }).then((response) => {
      if (!response.error) {
        setModalVisible(false)
        setNewDenuncia({
          id: '',
          titulo: '',
          fecha: '',
          denunciante: '',
          nombre: '',
          cedula: '',
          telefono: '',
          email: '',
          motivo: '',
          direccion: '',
        })
      }
    })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewDenuncia({
      ...newDenuncia,
      [id]: value,
    })
  }

  return (
    <CRow style={styles.container}>
      <CCol lg="8">
        <CCard>
          <CCardHeader>
            <h4>Sistema de Protección de Niños, Niñas y Adolescentes</h4>
          </CCardHeader>
          <CCardBody>
            <div style={styles.longText}>
              El sistema de protección de niños, niñas y adolescentes busca garantizar los derechos
              de los menores mediante la atención, prevención y sanción de abusos o situaciones de
              riesgo. Nuestro objetivo es crear un entorno seguro y saludable para todos los niños,
              niñas y adolescentes, promoviendo su bienestar físico, emocional y psicológico. Todos
              debemos unir esfuerzos para prevenir la violencia y proteger a los más vulnerables de
              nuestra sociedad.
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="4">
        <CCard>
          <CCardHeader>
            <h5>Agente Virtual</h5>
          </CCardHeader>
          <CCardBody>
            <VirtualAgent onAction={handleAgentAction} />
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>
            {action === 'denuncia' ? 'Formulario de Denuncia' : 'Formulario de Reporte'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="6">
              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Titulo:</label>
                <CFormInput
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Titulo de la denuncia"
                  value={formData.titulo}
                  onChange={handleInputChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="nombre">Denunciante:</label>
                <CFormInput
                  type="text"
                  id="denunciante"
                  name="denunciante"
                  placeholder="Denunciante"
                  value={formData.denunciante}
                  onChange={handleInputChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="nombre">Cedula:</label>
                <CFormInput
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Cedula de identidad"
                  value={formData.cedula}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Descripción del caso:</label>
                <CFormInput
                  type="textarea"
                  id="motivo"
                  name="motivo"
                  placeholder="Descripción detallada"
                  value={formData.motivo}
                  onChange={handleInputChange}
                />
              </div>
            </CCol>
            <CCol md="6">
              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Fecha:</label>
                <CFormInput
                  type="date"
                  id="fecha"
                  name="fecha"
                  placeholder="Fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Telefono:</label>
                <CFormInput
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Numero de telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Email:</label>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingrese su correo electronico"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="descripcion">Direccion:</label>
                <CFormInput
                  type="direccion"
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese su direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Enviar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

const styles = {
  container: {
    marginTop: '30px',
  },
  virtualAgent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: '10px',
  },
  chatBox: {
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    width: '100%',
    marginTop: '10px',
  },
  longText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333',
    textAlign: 'justify',
  },
  formGroup: {
    marginBottom: '15px',
  },
}

export default ProtectionSystem
