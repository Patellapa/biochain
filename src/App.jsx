
import ElettrocardiogrammaChart from './ElettrocardiogrammaChart';
import DatiPaziente from './DatiPaziente';
import './App.css'

const App = () => {
  // Dati del paziente
  const datiPaziente = {
    nome: 'Pasquale',
    cognome: 'Patella',
    codiceFiscale: 'PTLPQL64558H501K',
    dataDiNascita: '01/01/1990',
  };

  return (
    <>
    <div className='logo'>
      <h1>Elettrocardiogramma</h1>
         <DatiPaziente {...datiPaziente} />
         <ElettrocardiogrammaChart nome={datiPaziente.nome} cognome={datiPaziente.cognome} />
    </div>
    </>
  );
};



export default App
