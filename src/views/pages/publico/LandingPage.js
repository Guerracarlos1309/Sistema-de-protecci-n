import { useState } from 'react'
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
  CFormTextarea,
  CFormLabel,
  CContainer,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilShieldAlt,
  cilSpeech,
  cilDescription,
  cilWarning,
  cilPhone,
  cilEnvelopeClosed,
  cilLocationPin,
  cilCalendar,
  cilUser,
  cilCreditCard,
} from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'
import { useNavigate } from 'react-router-dom'

// Simulated API helper (replace with your actual API)
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

  const navigate = useNavigate()

  const irAlLogin = () => {
    navigate('/login')
  }

  return (
    <div style={styles.virtualAgent}>
      <div style={styles.avatar}>
        <div style={styles.avatarCircle}>
          <CIcon icon={cilSpeech} size="xl" style={{ color: 'white' }} />
        </div>
        <div style={styles.onlineIndicator}></div>
      </div>

      <div style={styles.chatBox}>
        <p style={styles.chatMessage}>{message}</p>
      </div>

      <div style={styles.actions}>
        <CButton
          color="danger"
          onClick={() => handleResponse('denuncia')}
          style={styles.primaryButton}
          className="shadow-lg"
        >
          <CIcon icon={cilWarning} className="me-2" />
          Crear Denuncia
        </CButton>
        <CButton
          color="warning"
          variant="outline"
          onClick={() => handleResponse('reporte')}
          style={styles.secondaryButton}
          className="shadow-lg"
        >
          <CIcon icon={cilDescription} className="me-2" />
          Crear Reporte
        </CButton>
        <CButton
          color="success"
          variant="outline"
          style={styles.secondaryButton}
          className="shadow-lg"
          onClick={irAlLogin}
        >
          <CIcon icon={cilUser} className="me-2" />
          Ir al Login
        </CButton>
      </div>
    </div>
  )
}

const ProtectionSystem = () => {
  const [action, setAction] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [newDenuncia, setNewDenuncia] = useState({
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

  const handleSubmit = async () => {
    try {
      const response = await api.post('/denuncias', { body: newDenuncia })
      if (!response.error) {
        setModalVisible(false)
        setNewDenuncia({
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
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewDenuncia({
      ...newDenuncia,
      [id]: value,
    })
  }

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <CContainer style={styles.heroContent}>
          <div style={styles.heroCenter}>
            <div style={styles.heroIcon}>
              <CIcon icon={cilShieldAlt} size="4xl" style={{ color: 'white' }} />
            </div>
            <h1 style={styles.heroTitle}>
              Sistema de Protección de
              <br />
              <span style={styles.heroSubtitle}>Niños, Niñas y Adolescentes</span>
            </h1>
            <p style={styles.heroDescription}>
              Garantizamos los derechos de los menores mediante la atención, prevención y sanción de
              abusos o situaciones de riesgo
            </p>
            <div style={styles.heroBadges}>
              <CBadge color="light" style={styles.badge}>
                <CIcon icon={cilShieldAlt} className="me-1" />
                Protección 24/7
              </CBadge>
              <CBadge color="light" style={styles.badge}>
                <CIcon icon={cilSpeech} className="me-1" />
                Asistencia Virtual
              </CBadge>
              <CBadge color="light" style={styles.badge}>
                <CIcon icon={cilDescription} className="me-1" />
                Reportes Seguros
              </CBadge>
            </div>
          </div>
        </CContainer>
      </section>

      {/* Main Content */}
      <section style={styles.mainSection}>
        <CContainer>
          <CRow className="g-4">
            {/* Information Card */}
            <CCol lg="8">
              <CCard style={styles.mainCard} className="shadow-lg">
                <CCardHeader style={styles.cardHeader}>
                  <h4 style={styles.cardTitle}>
                    <CIcon icon={cilShieldAlt} className="me-2" />
                    Nuestro Compromiso
                  </h4>
                </CCardHeader>
                <CCardBody style={styles.cardBody}>
                  <div style={styles.textContent}>
                    <p style={styles.paragraph}>
                      El sistema de protección de niños, niñas y adolescentes busca garantizar los
                      derechos de los menores mediante la atención, prevención y sanción de abusos o
                      situaciones de riesgo.
                    </p>
                    <p style={styles.paragraph}>
                      Nuestro objetivo es crear un entorno seguro y saludable para todos los niños,
                      niñas y adolescentes, promoviendo su bienestar físico, emocional y
                      psicológico.
                    </p>
                    <p style={styles.paragraph}>
                      Todos debemos unir esfuerzos para prevenir la violencia y proteger a los más
                      vulnerables de nuestra sociedad.
                    </p>
                  </div>

                  <CRow className="mt-4 g-3">
                    <CCol md="4">
                      <div style={styles.featureCard}>
                        <CIcon icon={cilShieldAlt} size="lg" style={styles.featureIcon} />
                        <h5 style={styles.featureTitle}>Prevención</h5>
                        <p style={styles.featureText}>Programas educativos y de concientización</p>
                      </div>
                    </CCol>
                    <CCol md="4">
                      <div style={styles.featureCard}>
                        <CIcon icon={cilWarning} size="lg" style={styles.featureIcon} />
                        <h5 style={styles.featureTitle}>Atención</h5>
                        <p style={styles.featureText}>
                          Respuesta inmediata a situaciones de riesgo
                        </p>
                      </div>
                    </CCol>
                    <CCol md="4">
                      <div style={styles.featureCard}>
                        <CIcon icon={cilDescription} size="lg" style={styles.featureIcon} />
                        <h5 style={styles.featureTitle}>Seguimiento</h5>
                        <p style={styles.featureText}>Monitoreo continuo de casos reportados</p>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>

            {/* Virtual Agent Card */}
            <CCol lg="4">
              <CCard style={styles.agentCard} className="shadow-lg">
                <CCardHeader style={styles.agentHeader}>
                  <h5 style={styles.agentTitle}>
                    <CIcon icon={cilSpeech} className="me-2" />
                    Agente Virtual
                  </h5>
                </CCardHeader>
                <CCardBody style={{ padding: 0 }}>
                  <VirtualAgent onAction={handleAgentAction} />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Form Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle style={styles.modalTitle}>
            {action === 'denuncia' ? (
              <>
                <CIcon icon={cilWarning} className="me-2 text-danger" />
                Formulario de Denuncia
              </>
            ) : (
              <>
                <CIcon icon={cilDescription} className="me-2 text-warning" />
                Formulario de Reporte
              </>
            )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="6">
              <div style={styles.formGroup}>
                <CFormLabel htmlFor="titulo" style={styles.formLabel}>
                  <CIcon icon={cilDescription} className="me-1" />
                  Título:
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="titulo"
                  placeholder="Título de la denuncia"
                  value={newDenuncia.titulo}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="denunciante" style={styles.formLabel}>
                  <CIcon icon={cilUser} className="me-1" />
                  Denunciante:
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="denunciante"
                  placeholder="Nombre del denunciante"
                  value={newDenuncia.denunciante}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="cedula" style={styles.formLabel}>
                  <CIcon icon={cilCreditCard} className="me-1" />
                  Cédula:
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="cedula"
                  placeholder="Cédula de identidad"
                  value={newDenuncia.cedula}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="motivo" style={styles.formLabel}>
                  <CIcon icon={cilWarning} className="me-1" />
                  Descripción del caso:
                </CFormLabel>
                <CFormTextarea
                  id="motivo"
                  placeholder="Descripción detallada del caso"
                  value={newDenuncia.motivo}
                  onChange={handleInputChange}
                  rows="4"
                  style={styles.formInput}
                />
              </div>
            </CCol>

            <CCol md="6">
              <div style={styles.formGroup}>
                <CFormLabel htmlFor="fecha" style={styles.formLabel}>
                  <CIcon icon={cilCalendar} className="me-1" />
                  Fecha:
                </CFormLabel>
                <CFormInput
                  type="date"
                  id="fecha"
                  value={newDenuncia.fecha}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="telefono" style={styles.formLabel}>
                  <CIcon icon={cilPhone} className="me-1" />
                  Teléfono:
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="telefono"
                  placeholder="Número de teléfono"
                  value={newDenuncia.telefono}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="email" style={styles.formLabel}>
                  <CIcon icon={cilEnvelopeClosed} className="me-1" />
                  Email:
                </CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Correo electrónico"
                  value={newDenuncia.email}
                  onChange={handleInputChange}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <CFormLabel htmlFor="direccion" style={styles.formLabel}>
                  <CIcon icon={cilLocationPin} className="me-1" />
                  Dirección:
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="direccion"
                  placeholder="Dirección completa"
                  value={newDenuncia.direccion}
                  onChange={handleInputChange}
                  style={styles.formInput}
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
            Enviar {action === 'denuncia' ? 'Denuncia' : 'Reporte'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  heroSection: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 0',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
  },
  heroCenter: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroIcon: {
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    display: 'inline-block',
    backdropFilter: 'blur(10px)',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    color: '#ffd700',
  },
  heroDescription: {
    fontSize: '1.3rem',
    marginBottom: '30px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
  },
  heroBadges: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  badge: {
    padding: '8px 16px',
    fontSize: '0.9rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  mainSection: {
    padding: '60px 0',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  mainCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '30px',
  },
  textContent: {
    marginBottom: '30px',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'justify',
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    height: '100%',
  },
  featureIcon: {
    color: '#667eea',
    marginBottom: '15px',
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  featureText: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
  },
  agentCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: '20px',
  },
  agentHeader: {
    background: 'linear-gradient(135deg, #10ac84 0%, #667eea 100%)',
    color: 'white',
    border: 'none',
  },
  agentTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  virtualAgent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    gap: '20px',
  },
  avatar: {
    position: 'relative',
  },
  avatarCircle: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    width: '20px',
    height: '20px',
    background: '#10ac84',
    borderRadius: '50%',
    border: '3px solid white',
  },
  chatBox: {
    background: '#f8f9fa',
    borderRadius: '15px',
    padding: '20px',
    maxWidth: '300px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef',
  },
  chatMessage: {
    color: '#333',
    lineHeight: '1.6',
    margin: 0,
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '250px',
  },
  primaryButton: {
    borderRadius: '25px',
    padding: '12px 20px',
    fontWeight: 'bold',
    border: 'none',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    borderRadius: '25px',
    padding: '12px 20px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  formInput: {
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    padding: '12px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
}

export default ProtectionSystem
