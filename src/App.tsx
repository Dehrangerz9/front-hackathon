import { useState } from 'react';
import Header from './components/Header';
import User from './components/User';

function App() {
  const [tab, setTab] = useState(0);

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <div>Conteúdo da Aba 0</div>;
      case 1:
        return <User/>;
      default:
        return <div>Conteúdo Padrão</div>;
    }
  };

  return (
    <>
      <Header setTab={setTab} /> {/* Passando apenas setTab para o Header */}
      <h1>Aba Selecionada: {tab}</h1>
      {renderTabContent()} {/* Renderizando o conteúdo da aba */}
    </>
  );
}

export default App;
