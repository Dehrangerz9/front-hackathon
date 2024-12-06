import { useState, useEffect } from 'react';
import Header from './components/Header';
import User from './components/User';
import CardGrid from './components/CardGrid';

function App() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState<Array<any>>([]); // Estado para armazenar os dados

  // Função para carregar os dados do mock.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('src/mock.json'); // Certifique-se de que o arquivo mock.json esteja na raiz ou caminho correto
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchData();
  }, []); // O array vazio faz o efeito rodar apenas uma vez após a montagem do componente

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <CardGrid data={data} />; // Passando os dados para o CardGrid
      case 1:
        return <User />;
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
