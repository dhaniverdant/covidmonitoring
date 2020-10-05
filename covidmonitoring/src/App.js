import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios'
import './App.css';

function App() {
  // const [data, setData] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [positif, setPositif] = useState("");
  const [sembuh, setSembuh] = useState("");
  const [meninggal, setMeninggal] = useState("");

  useEffect(() => {
    // async function fetchData() {
    //   const result = await fetch("https://indonesia-covid-19.mathdro.id/api/provinsi/");
    //   result
    //     .json()
    //     .then(result => setData(result));
    // }
    async function getOptions(){
      const result = await axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi/')
      const data = result.data
  
      const options = data.data && data.data.filter(function(d) {
        if (d.provinsi === "Indonesia") {
          return false;
        }
        return true;
      }).map(d => ({
        "value" : d.kasusPosi,
        "value2" : d.kasusSemb,
        "value3" : d.kasusMeni,
        "label" : d.provinsi
      }))
  
      setSelectOptions(options);
    }

    getOptions();
  });

  const handleChange = (e) => {
    setProvinsi(e.label);
    setPositif(e.value);
    setSembuh(e.value2);
    setMeninggal(e.value3);
  }

  return (
    <div>
      <div className="header-title">Data Covid-19 Indonesia</div>
      <div className="content-wrapper">
        <div className="select">
          <Select options={selectOptions} onChange={handleChange} placeholder="Pilih Provinsi" />
          {provinsi === ""
          ? (<div className="select-content-wrapper">
              <div className="null-text-wrapper">Pilih Provinsi Untuk Menampilkan Data</div>
            </div>)
          : (<div className="select-content-wrapper">
              <div className="data-wrapper">
                <div>Menampilkan Data Untuk Provinsi</div>
                <div className="province-name">{provinsi}</div>
                <div className="positive-box">
                  <div className="data-number">{positif.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Positif</div>
                </div>
                <div className="sembuh-box">
                  <div className="data-number">{sembuh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Sembuh</div>
                </div>
                <div className="meninggal-box">
                  <div className="data-number">{meninggal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Meninggal</div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      <div className="footer">Copyright {'\u00A9'} 2020 <a style={{marginLeft: "3px", textDecoration:"none"}} href="https://www.linkedin.com/in/rahmad-ramdhani-a08102131/">Rahmad Ramdhani</a></div>
    </div>
  );
}

export default App;
