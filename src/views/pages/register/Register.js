import { React, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    api.get('/usuarios').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setUsers(data)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (newUser.password !== newUser.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const usersResponse = await fetch('http://localhost:3004/usuarios')
      const users = await usersResponse.json()

      const usernameExists = users.some((user) => user.username === newUser.username)
      const emailExists = users.some((user) => user.email === newUser.email)

      if (usernameExists) {
        setError('El nombre de usuario ya está registrado')
        return
      }

      if (emailExists) {
        setError('El correo ya está registrado')
        return
      }
      const registerResponse = await fetch('http://localhost:3004/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        }),
      })

      if (!registerResponse.ok) {
        throw new error('Error al registrar el usuario')
      }

      setModal(true)
      setNewUser({ username: '', email: '', password: '', confirmPassword: '' })
    } catch (error) {
      setError(error.message)
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  {error && <p className="text-danger">{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      value={newUser.username}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={newUser.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      name="confirmPassword"
                      value={newUser.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>Registro Exitoso</CModalTitle>
        </CModalHeader>
        <CModalBody>¡Tu cuenta ha sido creada exitosamente!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Register
