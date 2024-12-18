import { useState, useEffect } from 'react';
import Header from './components/Header';
import User from './components/User';
import CardGrid from './components/CardGrid';

function App() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState<Array<any>>([]); // Estado para armazenar os dados
  const [searchQuery, setSearchQuery] = useState(''); // Estado para a busca

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mock.json'); // Corrigido caminho do arquivo JSON
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchData();
  }, []); // O array vazio faz o efeito rodar apenas uma vez após a montagem do componente

  // Função para realizar o filtro dos dados
  const filterData = (data: Array<any>, query: string) => {
    const lowercasedQuery = query.toLowerCase();
  
    return data.map((item) => {
      // Cria um array com as informações de cada campo que deu match
      const matches = Object.keys(item).reduce<{ key: string; value: string }[]>((acc, key) => {
        const fieldValue = item[key];
        if (typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(lowercasedQuery)) {
          acc.push({ key, value: fieldValue });
        }
        return acc;
      }, [] as { key: string; value: string }[]);
      
  
      // Retorna o objeto original junto com os matches encontrados
      return matches.length ? { ...item, matches } : null;
    }).filter(Boolean); // Remove os itens que não tiveram matches
  };

  const filteredData = filterData(data, searchQuery); // Chamando a função de filtro

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <CardGrid data={filteredData} />; // Passando os dados filtrados para o CardGrid
      case 1:
        return <User />;
      default:
        return <div className='self-center justify-self-center'><></></div>;
    }
  };

  return (
    <>
      <Header setTab={setTab} setSearchQuery={setSearchQuery} />
      {renderTabContent()}
    </>
  );
}

export default App;
