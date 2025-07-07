'use client'

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
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CNavbarToggler,
  CCollapse,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
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
  cilClock,
  cilStar,
  cilHome,
  cilInfo,
  cilCamera,
} from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'
import { useNavigate } from 'react-router-dom'

// Simulated API helper (replace with your actual API)
const api = helpFetch()

// Header Component
const Header = ({ onLoginClick }) => {
  const [visible, setVisible] = useState(false)

  return (
    <CNavbar expand="lg" style={styles.navbar} className="shadow-lg">
      <CContainer>
        <CNavbarBrand style={styles.navbarBrand}>
          <img
            src="/images/logo.jpg"
            alt="Logo del Sistema de Protección"
            style={{ height: '30px', marginRight: '10px' }}
          />
        </CNavbarBrand>

        <CNavbarToggler
          aria-label="Toggle navigation"
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
        />

        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="ms-auto">
            <CNavItem>
              <CNavLink href="#inicio" style={styles.navLink}>
                <CIcon icon={cilHome} className="me-1" />
                Inicio
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#servicios" style={styles.navLink}>
                <CIcon icon={cilInfo} className="me-1" />
                Servicios
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#ubicacion" style={styles.navLink}>
                <CIcon icon={cilLocationPin} className="me-1" />
                Ubicación
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#galeria" style={styles.navLink}>
                <CIcon icon={cilCamera} className="me-1" />
                Galería
              </CNavLink>
            </CNavItem>
            <CNavItem className="ms-2">
              <CButton color="success" onClick={onLoginClick} style={styles.loginButton}>
                <CIcon icon={cilUser} className="me-2" />
                Ir al Login
              </CButton>
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  )
}

// Virtual Agent Component
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
      </div>
    </div>
  )
}

// Location Section Component
const LocationSection = () => {
  return (
    <section id="ubicacion" style={styles.locationSection}>
      <CContainer>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Nuestra Ubicación</h2>
          <p style={styles.sectionDescription}>
            Estamos aquí para ayudarte. Visítanos en nuestras oficinas o contáctanos por cualquiera
            de nuestros medios.
          </p>
        </div>

        <CRow className="g-4">
          {/* Contact Information */}
          <CCol lg="6">
            <CCard style={styles.locationCard} className="shadow-lg h-100">
              <CCardHeader style={styles.locationCardHeader}>
                <h4 style={styles.cardTitle}>
                  <CIcon icon={cilPhone} className="me-2" />
                  Información de Contacto
                </h4>
              </CCardHeader>
              <CCardBody>
                <CListGroup flush>
                  <CListGroupItem style={styles.contactItem}>
                    <div style={styles.contactIcon}>
                      <CIcon icon={cilLocationPin} size="lg" />
                    </div>
                    <div>
                      <h5 style={styles.contactTitle}>Dirección</h5>
                      <p style={styles.contactText}>Av. Eleuterio Chacon</p>
                      <p style={styles.contactText}>Lugar: Alcaldia del municipio Andres Bello</p>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem style={styles.contactItem}>
                    <div style={styles.contactIcon}>
                      <CIcon icon={cilPhone} size="lg" />
                    </div>
                    <div>
                      <h5 style={styles.contactTitle}>Teléfonos</h5>
                      <p style={styles.contactText}>Principal: +58 (424) 784-2726</p>
                      <p style={styles.contactText}>Secundario: +58 (212) 987-6513</p>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem style={styles.contactItem}>
                    <div style={styles.contactIcon}>
                      <CIcon icon={cilEnvelopeClosed} size="lg" />
                    </div>
                    <div>
                      <h5 style={styles.contactTitle}>Correo Electrónico</h5>
                      <p style={styles.contactText}>Sistema@proteccion.gov.ve</p>
                      <p style={styles.contactText}>SPAB@proteccion.gov.ve</p>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem style={styles.contactItem}>
                    <div style={styles.contactIcon}>
                      <CIcon icon={cilClock} size="lg" />
                    </div>
                    <div>
                      <h5 style={styles.contactTitle}>Horarios de Atención</h5>
                      <p style={styles.contactText}>Lunes a Viernes: 8:00 AM - 2:00 PM</p>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCardBody>
            </CCard>
          </CCol>

          {/* Map Placeholder */}
          <CCol lg="6">
            <CCard style={styles.mapCard} className="shadow-lg h-100">
              <CCardHeader style={styles.mapCardHeader}>
                <h4 style={styles.cardTitle}>
                  <CIcon icon={cilLocationPin} className="me-2" />
                  Ubicación en el Mapa
                </h4>
              </CCardHeader>
              <CCardBody style={{ padding: 0 }}>
                <div style={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1342.789414268411!2d-72.18156610963312!3d7.85613109626305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sve!4v1751908502409!5m2!1ses!2sve"
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: '0 0 8px 8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación del Sistema de Protección"
                  ></iframe>
                  <div style={styles.mapOverlay}>
                    <CButton
                      color="primary"
                      size="sm"
                      href="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1342.789414268411!2d-72.18156610963312!3d7.85613109626305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sve!4v1751908502409!5m2!1ses!2sve"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CIcon icon={cilLocationPin} className="me-1" />
                      Ver en Google Maps
                    </CButton>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </section>
  )
}

// Gallery Section Component
const GallerySection = () => {
  const images = [
    {
      id: 1,
      title: 'Centro de Atención',
      description: 'Nuestras modernas instalaciones para brindar el mejor servicio',
      category: 'Instalaciones',
      color: 'primary',
      image: '/images/defensoria.jpg',
    },
    {
      id: 2,
      title: 'Equipo de Trabajo',
      description: 'Profesionales comprometidos con la protección infantil',
      category: 'Personal',
      color: 'success',
      image: '/images/carrusel.jpg',
    },
    {
      id: 3,
      title: 'Sala de Reuniones',
      description: 'Espacios cómodos para atención personalizada y confidencial',
      category: 'Instalaciones',
      color: 'info',
      image: '/images/Reporte.jpg',
    },
    {
      id: 4,
      title: 'Actividades Educativas',
      description: 'Programas de prevención y educación comunitaria',
      category: 'Actividades',
      color: 'warning',
      image: '/images/seccion1.jpg',
    },
    {
      id: 5,
      title: 'Área Infantil',
      description: 'Espacio seguro y acogedor especialmente diseñado para niños',
      category: 'Espacios',
      color: 'danger',
      image: '/images/imagen2.png',
    },
    {
      id: 6,
      title: 'Capacitaciones',
      description: 'Formación continua del personal especializado',
      category: 'Programas',
      color: 'secondary',
      image: '/images/carrusel3.jpeg',
    },
  ]

  return (
    <section id="galeria" style={styles.gallerySection}>
      <CContainer>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Galería de Imágenes</h2>
          <p style={styles.sectionDescription}>
            Conoce nuestras instalaciones, equipo de trabajo y los programas que desarrollamos para
            proteger a los niños, niñas y adolescentes.
          </p>
        </div>

        <CRow className="g-4">
          {images.map((image) => (
            <CCol key={image.id} md="6" lg="4">
              <CCard style={styles.galleryCard} className="shadow-lg h-100">
                <div style={styles.galleryImagePlaceholder}>
                  <img src={image.image} alt={image.title} style={styles.galleryImage} />
                  <CBadge color={image.color} style={styles.galleryBadge}>
                    {' '}
                    {image.category}
                  </CBadge>
                </div>
                <CCardBody>
                  <CCardTitle style={styles.galleryTitle}>{image.title}</CCardTitle>
                  <CCardText style={styles.galleryText}>{image.description}</CCardText>
                  <CButton
                    color={image.color}
                    variant="outline"
                    size="sm"
                    style={styles.galleryButton}
                  >
                    Ver Detalles
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </section>
  )
}

// Main Protection System Component
const ProtectionSystem = () => {
  const [action, setAction] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
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

  const navigate = useNavigate()

  const handleAgentAction = (actionType) => {
    setAction(actionType)
    setModalVisible(true)
  }

  const handleSubmit = async () => {
    try {
      const response = await api.post('/denuncias', { body: newDenuncia })
      if (!response.error) {
        setModalVisible(false)
        setSuccessModalVisible(true) // Mostrar modal de éxito
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

  const irAlLogin = () => {
    navigate('/login')
  }

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <Header onLoginClick={irAlLogin} />

      {/* Hero Section */}
      <section id="inicio" style={styles.heroSection}>
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
              <CBadge color="success" style={styles.badge}>
                <CIcon icon={cilShieldAlt} className="me-1" />
                Protección 24/7
              </CBadge>
              <CBadge color="warning" style={styles.badge}>
                <CIcon icon={cilSpeech} className="me-1" />
                Asistencia Virtual
              </CBadge>
              <CBadge color="info" style={styles.badge}>
                <CIcon icon={cilDescription} className="me-1" />
                Reportes Seguros
              </CBadge>
            </div>
          </div>
        </CContainer>
      </section>

      {/* Main Content */}
      <section id="servicios" style={styles.mainSection}>
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

      {/* Location Section */}
      <LocationSection />

      {/* Gallery Section */}
      <GallerySection />

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
      {/* Success Modal */}
      <CModal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)} size="md">
        <CModalHeader closeButton>
          <CModalTitle style={styles.successModalTitle}>
            <CIcon icon={cilShieldAlt} className="me-2 text-success" />
            ¡Denuncia Enviada!
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={styles.successModalBody}>
          <div style={styles.successContent}>
            <div style={styles.successIcon}>
              <CIcon icon={cilShieldAlt} size="4xl" style={{ color: '#28a745' }} />
            </div>
            <h4 style={styles.successTitle}>Su denuncia ha sido enviada con éxito</h4>
            <p style={styles.successMessage}>
              Hemos recibido su denuncia y la hemos registrado en nuestro sistema. Nuestro equipo
              especializado revisará la información proporcionada y
              <strong> lo llamaremos lo antes posible</strong> para darle seguimiento al caso.
            </p>
            <div style={styles.successInfo}>
              <CBadge color="success" style={styles.successBadge}>
                <CIcon icon={cilClock} className="me-1" />
                Respuesta en 24-48 horas
              </CBadge>
            </div>
          </div>
        </CModalBody>
        <CModalFooter style={styles.successModalFooter}>
          <CButton
            color="success"
            onClick={() => setSuccessModalVisible(false)}
            style={styles.successButton}
          >
            <CIcon icon={cilShieldAlt} className="me-2" />
            Entendido
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

// Styles
const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg,rgb(34, 148, 194) 0%,rgb(13, 53, 82) 100%)',
  },

  // Header Styles
  navbar: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navbarBrand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2563eb',
  },
  navLink: {
    color: '#374151',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  loginButton: {
    borderRadius: '25px',
    fontWeight: 'bold',
    padding: '8px 20px',
  },

  // Hero Section
  heroSection: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%,rgb(12, 72, 96) 100%)',
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
    color: 'white',
  },

  // Main Section
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
    background: 'linear-gradient(135deg,rgb(27, 107, 226) 0%,rgb(20, 74, 105) 100%)',
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

  // Agent Card
  agentCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: '20px',
  },
  agentHeader: {
    background: 'linear-gradient(135deg,rgb(205, 200, 40) 0%,rgb(104, 222, 102) 100%)',
    color: 'white',
    border: 'none',
  },
  agentTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },

  // Virtual Agent
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
    background: 'linear-gradient(135deg,rgb(43, 139, 184) 0%,rgb(75, 120, 162) 100%)',
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

  // Location Section
  locationSection: {
    padding: '60px 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  sectionDescription: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  locationCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  locationCardHeader: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    color: 'white',
    border: 'none',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '20px',
    border: 'none',
    borderBottom: '1px solid #e9ecef',
  },
  contactIcon: {
    color: '#3b82f6',
    minWidth: '40px',
  },
  contactTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  contactText: {
    color: '#666',
    margin: '2px 0',
  },
  emergencyText: {
    color: '#dc3545',
    fontWeight: 'bold',
    margin: '2px 0',
  },
  mapCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  mapCardHeader: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
  },
  mapContainer: {
    position: 'relative',
    height: '350px',
    overflow: 'hidden',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    zIndex: 10,
  },

  // Gallery Section
  gallerySection: {
    padding: '60px 0',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  },
  galleryCard: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  galleryImagePlaceholder: {
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px 8px 0 0',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  galleryIcon: {
    color: '#7c3aed',
  },
  galleryBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '0.8rem',
  },
  galleryTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  galleryText: {
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  galleryButton: {
    borderRadius: '20px',
    fontSize: '0.8rem',
  },
  galleryFooter: {
    textAlign: 'center',
    marginTop: '40px',
  },
  viewMoreButton: {
    borderRadius: '25px',
    padding: '12px 30px',
    fontWeight: 'bold',
  },

  // Modal
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

  // Success Modal Styles
  successModalTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  successModalBody: {
    padding: '30px',
    textAlign: 'center',
  },
  successContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  successIcon: {
    padding: '20px',
    background: 'rgba(40, 167, 69, 0.1)',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  successTitle: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  successMessage: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: '1.6',
    maxWidth: '400px',
    margin: '0 auto',
  },
  successInfo: {
    marginTop: '20px',
  },
  successBadge: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  successModalFooter: {
    justifyContent: 'center',
    padding: '20px',
  },
  successButton: {
    borderRadius: '25px',
    padding: '12px 30px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
}

export default ProtectionSystem
