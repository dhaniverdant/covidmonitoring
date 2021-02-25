import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Switch from "react-switch"
import axios from 'axios'
import './App.css';

function App() {
  // const [data, setData] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [positif, setPositif] = useState("");
  const [sembuh, setSembuh] = useState("");
  const [meninggal, setMeninggal] = useState("");
  const [dirawat, setDirawat] = useState("");
  const [checked, setChecked] = useState(false);
  const [mode, setMode] = useState("normal");

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
    setDirawat(e.value - e.value2 - e.value3);
  }

  const handleSwitchChange = (checked) => {
    setChecked(checked);
    const switchMode = mode === "normal" ? setMode("dark") : setMode("normal");
    return switchMode;
  }
  const isNormal = mode === "normal";
  const timeNow = new Date().getHours();
  const checkTime = timeNow > 16 ? "Terakhir di-update hari ini pada pukul 16.00 WIB" : "Terakhir di-update kemarin pada pukul 16.00 WIB";

  return (
    <div className={ mode }>
      <div className="header-title">Data Covid-19 Indonesia</div>
      <div className="content-wrapper">
        <div className="select">
          <Select options={selectOptions} onChange={handleChange} placeholder="Pilih Provinsi" />
          <div style={{ display: "flex", alignItems: "center", flexDirection: "row", marginTop: "20px", width: '145px', justifyContent: 'space-between' }}>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <span className={isNormal ? "" : "top-text-dark"}>{isNormal ? "Light Mode" : "Dark Mode" }</span>
          </div>
          {provinsi === ""
          ? (<div className="select-content-wrapper">
              <div className={ isNormal ? "null-text-wrapper" : "null-text-wrapper-dark" }>Pilih Provinsi Untuk Menampilkan Data</div>
            </div>)
          : (<div className="select-content-wrapper">
              <div className="data-wrapper">
                <div className={isNormal ? "" : "top-text-dark" }>Menampilkan Data Untuk Provinsi</div>
                <div className={ isNormal ? "province-name" : "province-name-dark" }>{provinsi}</div>
                <div className="positive-box">
                  <div className="data-number">{positif.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Total Positif</div>
                </div>
                <div className="sembuh-box">
                  <div className="data-number">{sembuh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Total Sembuh</div>
                </div>
                <div className="meninggal-box">
                  <div className="data-number">{meninggal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Total Meninggal</div>
                </div>
                <div className="dirawat-box">
                  <div className="data-number">{dirawat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  <div>Dirawat/Karantina</div>
                </div>
                <div className={isNormal ? "last-update" : "last-update-dark"}>{ checkTime }</div>
              </div>
            </div>)}
        </div>
      </div>
      <div className="footer">Made with<i class="fa fa-heart" style={{ color: "#be1931", margin: "0 5px" }}></i>by <a className="footer-link" href="https://www.linkedin.com/in/rahmad-ramdhani-a08102131/">Rahmad Ramdhani</a></div>
    </div>
  );
}

export default App;
