import React, { Children } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Kema from './Pages/Kema.jsx';
import Berita from './Pages/Berita.jsx';
import About from './Pages/About.jsx';
import LayoutAdmin from './components/LayoutAdmin.jsx';
import LayoutAkademik from './components/LayoutAkademik.jsx';
import AdminDashboard from './Dasboard/AdminDashboard.jsx';
import AkademikDashboard from './Kema/AkademikDashboard.jsx';
import BahanAjar from './Dasboard/BahanAjar.jsx';
import UserDosen from './Dasboard/UserDosen.jsx';
import Dosen from './Dasboard/Dosen.jsx';
import Penelitina from './Dasboard/Penelitian.jsx';
import Pengabdian from './Dasboard/Pengabdian.jsx';
import Pengajaran from './Dasboard/Pengajaran.jsx';
import TambahUser from './Dasboard/TambahUser.jsx';
import Msib from './Dasboard/Msib.jsx';
import KerjaPraktik from './Dasboard/KerjaPraktik.jsx';
import TugasAkhir from './Dasboard/TugasAkhir.jsx';
import Kkn from './Dasboard/Kkn.jsx';
import MagangMandiri from './Dasboard/MagangMandiri.jsx';
import Prestasi from './Dasboard/Prestasi.jsx';
import TambahBahanAjar from './Dasboard/TambahBahanAjar.jsx';
import TambahDosen from './Dasboard/TambahDosen.jsx';
import TambahPengajaran from './Dasboard/TambahPengajaran.jsx';
import TambahPengabdian from './Dasboard/TambahPengabdian.jsx';
import TambahPenelitian from './Dasboard/TambahPenelitian.jsx';
import TambahAbsensi from './Dasboard/TambahAbsensi.jsx';
import Absensi from './Dasboard/Absensi.jsx';
import EditDosen from './Dasboard/EditDosen.jsx';
import MataKuliah from './Dasboard/MataKuliah.jsx';
import EditMataKuliah from './Dasboard/EditMataKuliah.jsx';
import TambahMataKuliah from './Dasboard/TambahMataKuliah.jsx';
import EditBahanAjar from './Dasboard/EditBahanAjar.jsx';
import './Dist/Sidebar.css'
import Rps from './Dasboard/Rps.jsx';
import TambahRps from './Dasboard/TambahRps.jsx';
import EditRps from './Dasboard/EditRps.jsx';
import TambahPrestasi from './Dasboard/TambahPrestasi.jsx';
import Alumni from './Dasboard/Alumni.jsx';
import Pmm from './Dasboard/Pmm.jsx';
import Kewirausahaan from './Dasboard/Kewirausahaan.jsx';
import KontrakKuliah from './Dasboard/KontrakKuliah.jsx';
import TambahKontrakKuliah from './Dasboard/TambahKontrakKuliah.jsx';
import EditKontrakKuliah from './Dasboard/EditKontrakKuliah.jsx';
import EditPenelitian from './Dasboard/EditPenelitian.jsx';
import Penelitian from './Dasboard/Penelitian.jsx';
import EditPengabdian from './Dasboard/EditPengabdian.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TambahMsib from './Kema/TambahMsib.jsx';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        />
        <Route index element={<Home />} />
        <Route path='/Home' Component={Home} />
        <Route path='/Login' Component={Login} />
        <Route path='/Berita' Component={Berita} />
        <Route path='/Kema' Component={Kema} />
        <Route path='/About' Component={About} />
        <Route path='/admin' Component={LayoutAdmin}>
          <Route path='dashboard' Component={AdminDashboard} />
          <Route path='dashboard/KontrakKuliah' Component={KontrakKuliah} />
          <Route path='dashboard/BahanAjar' Component={BahanAjar} />
          <Route path='dashboard/UserDosen' Component={UserDosen} />
          <Route path='dashboard/Msib' Component={Msib} />
          <Route path='dashboard/Kkn' Component={Kkn} />
          <Route path='dashboard/Prestasi' Component={Prestasi} />
          <Route path='dashboard/KerjaPraktik' Component={KerjaPraktik} />
          <Route path='dashboard/TugasAkhir' Component={TugasAkhir} />
          <Route path='dashboard/MagangMandiri' Component={MagangMandiri} />
          <Route path='dashboard/Absensi' Component={Absensi} />
          <Route path='dashboard/MataKuliah' Component={MataKuliah} />
          <Route path='dashboard/Pengabdian' Component={Pengabdian} />
          <Route path='dashboard/Penelitian' Component={Penelitian} />
          <Route path='dashboard/Rps' Component={Rps} />
          <Route path='dashboard/Alumni' Component={Alumni} />
          <Route path='dashboard/Pmm' Component={Pmm} />
          <Route path='dashboard/Dosen' Component={Dosen} />
          <Route path='dashboard/Penelitian' Component={Penelitina} />
          <Route path='dashboard/Pengabdian' Component={Pengabdian} />
          <Route path='dashboard/Pengajaran' Component={Pengajaran} />
          <Route path='dashboard/Kewirausahaan' Component={Kewirausahaan} />
          <Route path='dashboard/Dosen/EditDosen/:id' Component={EditDosen} />
          <Route path='dashboard/Pengabdian/EditPengabdian/:id' Component={EditPengabdian} />
          <Route path='dashboard/Penelitian/EditPenelitian/:id' Component={EditPenelitian} />
          <Route path='dashboard/KontrakKuliah/EditKontrakKuliah/:id' Component={EditKontrakKuliah} />
          <Route path='dashboard/Rps/EditRps/:id' Component={EditRps} />
          <Route path='dashboard/MataKuliah/EditMataKuliah/:id' Component={EditMataKuliah} />
          <Route path='dashboard/Bahanajar/EditBahanAjar/:id' Component={EditBahanAjar} />
          <Route path='dashboard/KontrakKuliah/TambahKontrakKuliah' Component={TambahKontrakKuliah} />
          <Route path='dashboard/Rps/TambahRps' Component={TambahRps} />
          <Route path='dashboard/UserDosen/TambahUser' Component={TambahUser} />
          <Route path='dashboard/Absensi/TambahAbsensi' Component={TambahAbsensi} />
          <Route path='dashboard/BahanAjar/TambahBahanAjar' Component={TambahBahanAjar} />
          <Route path='dashboard/Dosen/TambahDosen' Component={TambahDosen} />
          <Route path='dashboard/MataKuliah/TambahMataKuliah' Component={TambahMataKuliah} />
          <Route path='dashboard/Penelitian/TambahPenelitian' Component={TambahPenelitian} />
          <Route path='dashboard/Pengabdian/TambahPengabdian' Component={TambahPengabdian} />
          <Route path='dashboard/Pengajaran/TambahPengajaran' Component={TambahPengajaran} />

        </Route>
        <Route path='/akademik' Component={LayoutAkademik}>
          <Route path='dashboard' Component={AkademikDashboard} />
          <Route path='dashboard/Msib/TambahMsib' Component={TambahMsib} />
          <Route path='dashboard/MagangMandiri/TambahMagangMandiri' Component={TambahPrestasi} />
          <Route path='dashboard/Prestasi/TambahPrestasi' Component={TambahPrestasi} />
          <Route path='dashboard/KerjaPraktik/TambahKerjaPraktik' Component={TambahPrestasi} />
          <Route path='dashboard/TugasAkhir/TambahTugasAkhir' Component={TambahPrestasi} />
          <Route path='dashboard/Pmm/TambahPmm' Component={TambahPrestasi} />
          <Route path='dashboard/Alumni/TambahAlumni' Component={TambahPrestasi} />

        </Route>
      </Routes>
    </div>

  )
}

export default App;