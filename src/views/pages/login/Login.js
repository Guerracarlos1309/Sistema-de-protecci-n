import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'
import { useState } from 'react'

const api = helpFetch()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Paso 1: Buscar por correo solamente
      const res = await api.get(`/usuarios?email=${email}`)
      console.log('Resultado:', res)

      if (res.length === 0) {
        setError('Correo no registrado')
      } else {
        const user = res[0]
        if (user.password !== password) {
          setError('Contraseña incorrecta')
        } else {
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/dashboard')
        }
      }
    } catch (err) {
      console.error('Error en el login', err)
      setError('Error al conectarse al servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: "url('src/assets/images/fondo/fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="warning" className="px-4" disabled={loading}>
                          {loading ? (
                            <>
                              <span className="me-2">Iniciando...</span>
                              <CSpinner size="sm" />
                            </>
                          ) : (
                            'Login'
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                style={{
                  width: '44%',
                  backgroundColor: '#acbeb0',
                }}
              >
                <CCardBody className="text-center" style={{ color: 'black', marginTop: '10%' }}>
                  <div>
                    <h2>Registrate</h2>
                    <p>
                      Crea tu propio perfil para poder acceder a todos los servicios que te puede
                      ofrecer el sistema de protección de niños, niñas y adolescentes.
                    </p>
                    <Link to="/register">
                      <CButton color="warning" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
