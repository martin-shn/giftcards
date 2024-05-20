import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Header';
import Cards from './Cards';
import Expenses from './Expenses';

function App() {
  const [page, setPage] = useState('Cards');
  const [lang, setLang] = useState('en');
  const [giftcardsDB, setGiftcardsDB] = useState(JSON.parse(localStorage.getItem('giftcardsDB') || '[]'));
  const [currCmp, setCurrCmp] = useState(<></>);


  useEffect(() => {
    switch (page) {
      case 'Cards':
        setCurrCmp(<Cards giftcardsDB={giftcardsDB} setGiftcardsDB={setGiftcardsDB} lang={lang} />)
        break;

      case 'Expenses':
        setCurrCmp(<Expenses />)
        break;

      default:
        break;
    }
  }, [page, lang, giftcardsDB]);


  return (
    <div className="App">
      <header className="App-header">
        <Header setPage={setPage} lang={lang} setLang={setLang} setGiftcardsDB={setGiftcardsDB} />
      </header>
      {currCmp}
    </div>
  );
}

export default App;
