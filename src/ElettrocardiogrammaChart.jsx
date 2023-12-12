// src/components/ElettrocardiogrammaChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
//const fs = require('fs').promises;
//const path = require('path');
//import fs from 'fs';
//const filePath = '\\192.168.1.101\\Public\\BiochainFiles\\PTLPQL67B15H501K_2023_12_2.txt';
//const filePath = 'C:\\Pasquale_NAS\\Documenti\\Nodejs\\PTLPQL67B15H501K_2023_12_2.txt';

const filePath = '/ecg.txt';

const ElettrocardiogrammaChart = ({ nome, cognome }) => {
  const [ecgData, setEcgData] = useState([]);
  const [sampleRate, setSampleRate] = useState(1);

  useEffect(() => {
    // Carica i dati dell'ECG dal file
    fetch(filePath)
    //legge il file
    //fs.promise.readFile(filePath, 'utf-8')
    .then(response => response.text())
      .then(data => {
        
        if (typeof data !== 'string') {
          throw new Error('Il contenuto del file non è una stringa');
        }

        const lines = data.trim().split('\n');
        const ecgValues = lines.map(line => parseFloat(line));

        // Trova l'indice delle variabili nel file
        const valuesToSampleIndex = lines.findIndex(line => line.startsWith('valuesToSample:'));
        const samplePerSecondIndex = lines.findIndex(line => line.startsWith('SamplePerSecond:'));

        // Estrai i valori dalle variabili
        const valuesToSample = parseInt(lines[valuesToSampleIndex].split(':')[1].trim(), 10);
        const samplePerSecond = parseFloat(lines[samplePerSecondIndex].split(':')[1].trim());

        // Imposta i dati e la frequenza di campionamento
        setEcgData(ecgValues.slice(0, valuesToSample));
        setSampleRate(samplePerSecond);
      })
      .catch(error => console.error('Errore nel caricamento dei dati ECG:', error));
  }, []);

  // Calcola il tempo in base al numero di campioni e alla frequenza di campionamento
  const timeData = ecgData.map((_, index) => index / sampleRate);
  
  // const ecgStyle = {
  //   padding: 0,
  //   borderRadius: 8,
  //   position: 'absolute',
  //   width: '80%',
  //   top: '20%' , // Centra il box verticalmente
  //   left: '30%', // Centra il box orizzontalmente
  //   transform: 'translate(-50%, 0%)', // Centra in entrambe le direzioni
  //   textAlign: 'center',
  //   border: '5px solid pink',
 
  // };
  
  // Configurazione del layout del grafico
  const layout = {
    title: `ECG - ${nome} ${cognome}`,
    xaxis: {
      title: 'Tempo (s)',
    },
    yaxis: {
      title: 'Amplitude',
      fixedrange: true, // Imposta fixedrange su true per bloccare lo zoom sull'asse Y
    },
    autosize: true,
    height: '500',
    width: '1200',
    plot_bgcolor: '#FCE4EC', // Un rosa più chiaro
    paper_bgcolor: '#FCE4EC', // Un rosa più chiaro
};

  // Configurazione delle linee del grafico con colori tipici di un ECG
  const lineStyle = {
    type: 'scatter',
    mode: 'lines',
    x: timeData,
    y: ecgData,
    line: {
      color: 'blue', // colore principale dell'ECG
      width: 1,
    },
  };

 

  return (
    <div className='datiECG' >
    <Plot
      data={[lineStyle]}
      layout={layout}
    />
    </div>
  );
};

export default ElettrocardiogrammaChart;
