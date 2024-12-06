import { useState, useEffect } from 'react';
import Header from './components/Header';
import User from './components/User';
import CardGrid from './components/CardGrid';

function App() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState<Array<any>>([]); // Estado para armazenar os dados
  const [searchQuery, setSearchQuery] = useState(''); // Estado para a busca

  // Função para carregar os dados do mock.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('mock.json'); // Certifique-se de que o arquivo mock.json esteja na raiz ou caminho correto
        console.log(response)
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchData();
  }, []); // O array vazio faz o efeito rodar apenas uma vez após a montagem do componente

  // Filtrando os dados conforme a pesquisa
  const filteredData = data.filter((item) =>
    item.codigoCofap.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoOriginal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoAxios.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoSampel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoMobensani.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoBorflex.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigoYibrasil.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <CardGrid data={filteredData} />; // Passando os dados filtrados para o CardGrid
      case 1:
        return <User />;
      default:
        return <div>Conteúdo Padrão</div>;
    }
  };

  return (
    <>
      <Header setTab={setTab} setSearchQuery={setSearchQuery} /> {/* Passando a função setSearchQuery para o Header */}
      <h1>Aba Selecionada: {tab}</h1>
      {renderTabContent()} {/* Renderizando o conteúdo da aba */}
    </>
  );
}

export default App;
