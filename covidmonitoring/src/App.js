import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [index, setIndex] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://indonesia-covid-19.mathdro.id/api/provinsi/");
      result
        .json()
        .then(result => setData(result));
    }

    fetchData();
  });

  const onListClick = fid => {
    setExpand(!expand);
    setIndex(fid);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{top: 0, bottom: "20px", position: "sticky", width: "100%", backgroundColor: "#f0000f"}}>Covid-19 Update</div>
        {data.data &&
        data.data.map(data => (
          <div
            key={data.fid}
            className="list"
            onClick={() => onListClick(data.fid)}
          >
            <div style={{color: "#fff"}}>
              {data.provinsi}
              {expand === true && index === data.fid ?
                <div className="details">
                  <div style={{
                    backgroundColor: "#cfbe9f",
                    padding: "10px",
                    color: "#805d17",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }}>
                    {data.kasusPosi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <div style={{fontSize: "20px"}}>Positif</div>
                  </div>
                  <div style={{
                    backgroundColor: "#c1e6c1",
                    marginTop: "10px",
                    padding: "10px",
                    color: "#128210",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }}>
                    {data.kasusSemb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <div style={{fontSize: "20px"}}>Sembuh</div>
                  </div>
                  <div style={{
                    backgroundColor: "#d4a7a7",
                    marginTop: "10px",
                    padding: "10px",
                    color: "#f00",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }}>
                    {data.kasusMeni.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <div style={{fontSize: "20px"}}>Meninggal</div>
                  </div>
                </div>
              : ""}
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
