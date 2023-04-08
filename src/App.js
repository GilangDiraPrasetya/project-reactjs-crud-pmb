import React, { useState } from 'react';
import RowPmb from './components/RowPmb';
import RowTambahPmb from './components/RowTambahPmb';

// Data Awal Tabel PMB
const arrPmbs = [
  {
    id: '10001',
    nama: 'Donny Sabri Ashari',
    posisi: 'UI/UX Designer',
    alamat: 'Kota Probolinggo',
  },
  {
    id: '20001',
    nama: 'Ari Mulyanto',
    posisi: 'Back End Developer',
    alamat: 'Kota Probolinggo',
  },
  {
    id: '30001',
    nama: 'Gilang Dira Prasetya',
    posisi: 'Front End Developer',
    alamat: 'Kota Probolinggo',
  },
];

const App = () => {
  const [pmbs, setPmbs] = useState(arrPmbs);

  // handler untuk menambah data pmb
  // akan ditrigger dari komponen RowTambahPmb
  const handleTambahPmb = (data) => {
    const newPmbs = [...pmbs, data];
    setPmbs(newPmbs);
  };

  // handler untuk mengedit data pmb
  // akan ditrigger dari komponen RowPmb
  const handleEditPmb = (data) => {
    // cari index dari mahasiswa yang akan diedit berdasarkan id
    const result = pmbs.findIndex((pmb) => pmb.id === data.id);

    // copy pmbs karena fungsi splice akan mengubah array asal (nutate)
    const newPmbs = pmbs;
    newPmbs.splice(result, 1, data);
    setPmbs([...newPmbs]);
  };

  // handler untuk menghapus data pmb di komponen RowPmb
  const handleHapusPmb = (e) => {
    // cari index pmb yang akan dihapus berdasarkan id
    const result = pmbs.findIndex((pmb) => pmb.id === e.target.id);

    // copy pmbs karena fungsi splice akan mengubah array asal (nutate)
    const newPmbs = pmbs;
    newPmbs.splice(result, 1);
    setPmbs([...newPmbs]);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Tabel Program Magang Bersertifikat</h1>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama</th>
                <th>Posisi</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {pmbs.map((pmb) => (
                <RowPmb key={pmb.id} pmb={pmb} onEditPmb={handleEditPmb} onHapusPmb={handleHapusPmb} />
              ))}
              <RowTambahPmb pmbs={pmbs} onTambahPmb={handleTambahPmb} onHapusPmb={handleHapusPmb} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
