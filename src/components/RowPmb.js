import React, { useState } from 'react';

const RowPmb = (props) => {
  // simpan props mahasiswa kedalam state agar mudah diakses
  const [formInput, setFormInput] = useState({
    id: props.pmb.id,
    nama: props.pmb.nama,
    posisi: props.pmb.posisi,
    alamat: props.pmb.alamat,
  });

  // state untuk menampung pesan error
  const [errors, setErrors] = useState({
    nama: '',
    posisi: '',
    alamat: '',
  });

  // satte untuk pendanda "Edit Mode"
  const [editStatus, setEditStatus] = useState(false);

  // state untuk menampung nilai form sebelum "Edit mode"
  const [dataReset, setDataReset] = useState({});

  //function untuk membuat 2 ways binding antara form dengan state
  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // tombol Edit di klik
  const handleEditClick = () => {
    // simpan data untuk proses reset
    setDataReset({ ...formInput });

    // Masuk lke "edit mode"
    setEditStatus(true);
  };

  // tombol batal di klik
  const handleFormReset = (e) => {
    e.preventDefault();

    // kemnalikan isi form ke posisi sebelum tombol edit di klik
    setFormInput({ ...dataReset });

    // hapus pesan error (jika ada)
    setErrors({});

    // keluar dari edit mode
    setEditStatus(false);
  };

  // form di submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let pesanErrors = {};

    // validasi nama
    if (formInput.nama.trim() === '') {
      pesanErrors.nama = 'Nama Tidak Boleh Kosong';
    } else {
      pesanErrors.nama = '';
    }

    // validasi posisi
    if (formInput.posisi.trim() === '') {
      pesanErrors.posisi = 'Posisi Tidak Boleh Kosong';
    } else {
      pesanErrors.posisi = '';
    }

    // validasi nama
    if (formInput.alamat.trim() === '') {
      pesanErrors.alamat = 'Alamat Tidak Boleh Kosong';
    } else {
      pesanErrors.alamat = '';
    }

    // update error state
    setErrors(pesanErrors);

    // cek apakah seluruh form valid atau masih ada error
    let formValid = true;
    for (let propName in pesanErrors) {
      if (pesanErrors[propName].length > 0) {
        formValid = false;
      }
    }

    // proses data jika form valid
    if (formValid) {
      setEditStatus(false);
      setEditStatus(false);
    }
  };

  return (
    <React.Fragment>
      {/* Tamilan form jika tombol Edit di klik, atau tampilkan row normal */}

      {editStatus ? (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
              <div className="row row-cols-5 g-3">
                <div className="col">
                  <input type="text" className="form-control" disabled defaultValue={formInput.id} name="id"></input>
                </div>
                <div className="col">
                  <input type="text" className="form-control" name="nama" autoComplete="off" onChange={handleInputChange} value={formInput.nama}></input>
                  {errors.nama && <small>{errors.nama}</small>}
                </div>
                <div className="col">
                  <input type="text" className="form-control" name="posisi" autoComplete="off" onChange={handleInputChange} value={formInput.posisi}></input>
                  {errors.posisi && <small>{errors.posisi}</small>}
                </div>
                <div className="col">
                  <input type="text" className="form-control" name="alamat" autoComplete="off" onChange={handleInputChange} value={formInput.alamat}></input>
                  {errors.alamat && <small>{errors.alamat}</small>}
                </div>
                <div className="col">
                  <button className="btn btn-success me-2" type="submit">
                    Simpan
                  </button>
                  <button className="btn btn-warning me-2" type="reset">
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{formInput.id}</td>
          <td>{formInput.nama}</td>
          <td>{formInput.posisi}</td>
          <td>{formInput.alamat}</td>
          <td>
            <button className="btn btn-secondary me-2" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn-danger me-2" id={formInput.id} onClick={props.onHapusPmb}>
              Hapus
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default RowPmb;
