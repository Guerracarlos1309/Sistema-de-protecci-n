import React, { use, useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilPencil, cilXCircle } from '@coreui/icons'
import { helpFetch } from '../../../api/helpFetch.js'

const api = helpFetch()

const funcionario = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSave, setVisibleSave] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedFuncionario, setSelectedFuncionario] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    departamento: '',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [funcionarios, setFuncionarios] = useState([])

  const [newFuncionario, setNewFuncionario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    cargo: '',
    telefono: '',
    email: '',
    departamento: 'Defensoría',
  })

  const handleButtonClick = () => {
    api.post('funcionarios', { body: newFuncionario }).then((response) => {
      if (!response.error) {
        setVisible(false)
        setVisibleSave(true)
        loadFuncionarios()
        setNewFuncionario({
          nombre: '',
          apellido: '',
          cedula: '',
          cargo: '',
          telefono: '',
          email: '',
          departamento: 'Defensoría',
        })
      }
    })
  }

  const handleDeleteClick = (id) => {
    setSelectedFuncionario(id)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    api.delet('funcionarios', selectedFuncionario).then((response) => {
      if (!response.error) {
        loadFuncionarios()
        setDeleteModal(false)
        setSelectedFuncionario(null)
      }
    })
  }

  const handleEditClick = (funcionario) => {
    setSelectedFuncionario(funcionario.id)
    setFormData(funcionario)
    setEditModal(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const confirmEdit = () => {
    api.put('funcionarios', { body: formData }, selectedFuncionario).then((response) => {
      if (!response.error) {
        loadFuncionarios()
        setEditModal(false)
        setSelectedFuncionario(null)
      }
    })
  }

  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.cedula.toString().includes(searchQuery),
  )

  useEffect(() => {
    loadFuncionarios()
  }, [])

  const loadFuncionarios = () => {
    api.get('funcionarios').then((data) => {
      if (!data.error) {
        setFuncionarios(data)
      }
    })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewFuncionario({
      ...newFuncionario,
      [id]: value,
    })
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2
          className="mb-4 text-center position-relative pb-3"
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#4a4a4a',
            borderBottom: '3px solid',
            borderImage: 'linear-gradient(to right, transparent, #4a4a4a, transparent) 1',
          }}
        >
          Gestión de los funcionarios del Sistema de protección
        </h2>
      </div>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Agregar Nuevo Funcionario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre del funcionario"
              className="mb-3"
              value={newFuncionario.nombre}
              onChange={handleInputChange}
            />
            <CFormInput
              type="text"
              id="apellido"
              label="Apellido"
              placeholder="Ingrese el apellido del funcionario"
              className="mb-3"
              value={newFuncionario.apellido}
              onChange={handleInputChange}
            />
            <CFormInput
              type="text"
              id="cedula"
              label="Cedula"
              placeholder="Ingrese el documento de identidad"
              className="mb-3"
              value={newFuncionario.cedula}
              onChange={handleInputChange}
            />
            <CFormSelect
              label="Cargo"
              id="cargo"
              aria-label="DefaultSelect"
              className="mb-3"
              value={newFuncionario.cargo || ''}
              onChange={handleInputChange}
            >
              <option value="">Selecciona el cargo:</option>
              <option value="Defensoria Municipal">Defensora Municipal</option>
              <option value="Defensoria Educativa">Defensora Educativa</option>
              <option value="Consejera de proteccion">Consejera de protección</option>
              <option value="Administradora">Administradora</option>
            </CFormSelect>
            <CFormInput
              type="text"
              id="telefono"
              label="Numero telefonico"
              placeholder="Ingrese el numero telefonico"
              className="mb-3"
              value={newFuncionario.telefono}
              onChange={handleInputChange}
            />
            <CFormInput
              type="email"
              id="email"
              label="Correo electronico"
              placeholder="Ingrese el correo electronico"
              className="mb-3"
              value={newFuncionario.email}
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleButtonClick}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visibleSave} onClose={() => setVisibleSave(false)}>
        <CModalHeader onClose={() => setVisibleSave(false)}>ÉXITO</CModalHeader>
        <CModalBody>El funcionario ha sido creado con éxito</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleSave(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>¿Estás seguro de que deseas eliminar este funcionario?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CModalHeader>
          <CModalTitle>Editar Funcionario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre"
              value={formData.nombre}
              onChange={handleEditChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              name="apellido"
              label="Apellido"
              placeholder="Ingrese el apellido"
              value={formData.apellido}
              onChange={handleEditChange}
              className="mb-3"
            />
            <CFormInput
              type="email"
              name="email"
              label="Email"
              placeholder="Ingrese el Email"
              value={formData.email}
              onChange={handleEditChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              name="cargo"
              label="Cargo"
              placeholder="Ingrese el cargo"
              value={formData.cargo}
              onChange={handleEditChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              name="departamento"
              label="Departamento"
              placeholder="Ingrese el departamento"
              value={formData.departamento}
              onChange={handleEditChange}
              className="mb-3"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModal(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={confirmEdit}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
          <strong>
            <h4 className="mb-0">
              Gestión de los funcionarios del Sistema de protección de los niños, niñas y
              Adolescentes
            </h4>
          </strong>
        </CCardHeader>
        <CCardBody>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <CButton color="primary" onClick={() => setVisible(true)}>
              <CIcon icon={cilUserPlus} className="me-2" />
              Nuevo Funcionario
            </CButton>
            <CFormInput
              type="text"
              placeholder="Buscar por Cedula de identidad"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-50"
            />
          </div>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Documento de Identidad</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre y Apellido</CTableHeaderCell>
                <CTableHeaderCell scope="col">Cargo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Departamento</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredFuncionarios.length > 0 ? (
                filteredFuncionarios.map((funcionario) => (
                  <CTableRow key={funcionario.id}>
                    <CTableHeaderCell scope="row">{funcionario.id}</CTableHeaderCell>
                    <CTableDataCell>{funcionario.cedula}</CTableDataCell>
                    <CTableDataCell>{funcionario.nombre}</CTableDataCell>
                    <CTableDataCell>{funcionario.cargo}</CTableDataCell>

                    <CTableDataCell>{funcionario.departamento}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex align-items-center gap-2">
                        <CButton
                          color="warning"
                          className="me-1"
                          onClick={() => handleEditClick(funcionario)}
                        >
                          <CIcon icon={cilPencil} className="me-1" />
                          Editar
                        </CButton>

                        <CButton
                          color="danger"
                          className="me-1"
                          onClick={() => handleDeleteClick(funcionario.id)}
                        >
                          <CIcon icon={cilXCircle} className="me-1"></CIcon>
                          Eliminar
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" className="text-center">
                    No se encontraron funcionarios.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default funcionario
