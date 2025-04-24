import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import { helpFetch } from '../../api/helpFetch.js'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
const api = helpFetch()

const Dashboard = () => {
  const [casos, setCasos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [expedientes, setExpedientes] = useState([])

  useEffect(() => {
    loadCasos(), loadFuncionarios(), loadExpedientes()
  })

  const loadFuncionarios = () => {
    api.get('/funcionarios').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setFuncionarios(data)
      }
    })
  }
  const loadExpedientes = () => {
    api.get('/expedientes').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setExpedientes(data)
      }
    })
  }
  const loadCasos = () => {
    api.get('/casos').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setCasos(data)
      }
    })
  }

  const totalCasos = casos.length
  const casosResueltos = casos.filter((c) => c.estado === 'Resuelto').length
  const casosPendientes = casos.filter((c) => c.estado === 'Pendiente').length

  const tiposDeCaso = casos.reduce((acc, curr) => {
    acc[curr.tipoCaso] = (acc[curr.tipoCaso] || 0) + 1
    return acc
  }, {})

  const expedientesPorEstado = expedientes.reduce((acc, curr) => {
    acc[curr.estado] = (acc[curr.estado] || 0) + 1
    return acc
  }, {})

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  return (
    <div>
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
          Panel de control
        </h2>
      </div>
      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              Resumen de Casos
            </CCardHeader>
            <CCardBody>
              <p>Total: {totalCasos}</p>
              <p>Resueltos: {casosResueltos}</p>
              <p>Pendientes: {casosPendientes}</p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              Funcionarios Registrados
            </CCardHeader>
            <CCardBody>
              <h3>{funcionarios.length}</h3>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              Tipos de Caso
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: Object.keys(tiposDeCaso),
                  datasets: [
                    {
                      data: Object.values(tiposDeCaso),
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              Estado de Expedientes
            </CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: Object.keys(expedientesPorEstado),
                  datasets: [
                    {
                      label: 'Cantidad',
                      backgroundColor: '#42A5F5',
                      data: Object.values(expedientesPorEstado),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              Lista de usuarios
            </CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>

                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>

                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
