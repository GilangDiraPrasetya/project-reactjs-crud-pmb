import React, { useState } from 'react';

const RowTambahPmb = (props) => {
  // state untuk data inputan form
  const [formInput, setFormInput] = useState({
    id: '',
    nama: '',
    posisi: '',
    alamat: '',
  });
  // state untuk menampung pesan error
  const [errors, setErrors] = useState({
    id: '',
    nama: '',
    posisi: '',
    alamat: '',
  });

  //   function untuk memeriksa apakah ada id yang sama atau tidak
  const cekDuplikasiId = () => {
    return props.pmbs.find((pmb) => pmb.id === formInput.id);
  };

  // method untuk membuat 2 ways binding antara form dengan state
  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let pesanErrors = {};

    // validasi id
    if (formInput.id.trim() === '') {
      pesanErrors.id = 'Id tidak boleh kosong';
    } else if (!/^[0-9]{5}$/.test(formInput.id)) {
      pesanErrors.id = 'Id harus 5 karakter angka';
    } else if (cekDuplikasiId()) {
      pesanErrors.id = 'Id sudah dipakai';
    } else {
      pesanErrors.id = '';
    }

    // validasi nama
    if (formInput.nama.trim() === '') {
      pesanErrors.nama = 'Nama tidak boleh kosong';
    } else {
      pesanErrors.nama = '';
    }

    // validasi posisi
    if (formInput.posisi.trim() === '') {
      pesanErrors.posisi = 'Posisi tidak boleh kosong';
    } else {
      pesanErrors.posisi = '';
    }

    // validasi alamat
    if (formInput.alamat.trim() === '') {
      pesanErrors.alamat = 'Alamat tidak boleh kosong';
    } else {
      pesanErrors.alamat = '';
    }

    // update error state
    setErrors(pesanErrors);

    // cek apakah seluruh form valid atau masih ada error
    let formValid = true;
    for (let inputName in pesanErrors) {
      if (pesanErrors[inputName].length > 0) {
        formValid = false;
      }
    }

    // proses data jika form valid
    if (formValid) {
      props.onTambahPmb(formInput);

      // kosongkan inputan form
      setFormInput({
        id: '',
        nama: '',
        posisi: '',
        alamat: '',
      });
    }
  };

  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row row-cols-5 g-3">
            <div className="col">
              <input type="text" className="form-control" name="id" placeholder="00000" autoComplete="off" onChange={handleInputChange} value={formInput.id}></input>
              {errors.id && <small>{errors.id}</small>}
            </div>
            <div className="col">
              <input type="text" className="form-control" name="nama" placeholder="Gilang Dira" autoComplete="off" onChange={handleInputChange} value={formInput.nama}></input>
              {errors.nama && <small>{errors.nama}</small>}
            </div>
            <div className="col">
              <input type="text" className="form-control" name="posisi" placeholder="Front End Developer" autoComplete="off" onChange={handleInputChange} value={formInput.posisi}></input>
              {errors.posisi && <small>{errors.posisi}</small>}
            </div>
            <div className="col">
              <input type="text" className="form-control" name="alamat" placeholder="Kota Probolinggo" autoComplete="off" onChange={handleInputChange} value={formInput.alamat}></input>
              {errors.alamat && <small>{errors.alamat}</small>}
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default RowTambahPmb;
