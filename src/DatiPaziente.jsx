// src/components/DatiPaziente.jsx
import React from 'react';

const DatiPaziente = ({ nome, cognome, codiceFiscale, dataDiNascita }) => {


  return (
    <div className='datiPaziente' >
      <h2>Dati Paziente</h2>
      <p><strong>Nome:</strong> {nome} <strong>Cognome:</strong> {cognome}</p>
      <p><strong>Codice Fiscale:</strong> {codiceFiscale} <strong>Data di Nascita:</strong> {dataDiNascita}</p>
    </div>
  );
};

export default DatiPaziente;
