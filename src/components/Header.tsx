import React, { useState } from "react";

interface HeaderProps {
  setTab: (tabIndex: number) => void;
  setSearchQuery: (query: string) => void; // Função para atualizar o estado da pesquisa
}

const Header: React.FC<HeaderProps> = ({ setTab, setSearchQuery }) => {
  const [query, setQuery] = useState(''); // Estado local para armazenar o valor digitado na barra de pesquisa

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Atualiza o estado local conforme o usuário digita
  };

  const handleSearchClick = () => {
    setSearchQuery(query); // Atualiza o estado global com o valor de pesquisa
  };

  return (
    <header className="bg-blue-600 p-4 px-64 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-white text-xl font-bold"
        onClick={() => setTab(0)} // Corrigido para passar uma função
      >
        Minha Aplicação
      </div>

      {/* Barra de Pesquisa */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-96"
          value={query} // Vinculando o estado local à entrada
          onChange={handleSearchChange} // Atualiza a pesquisa conforme o valor digitado
        />
        <button
          onClick={handleSearchClick} // Aciona a busca quando clicado
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Pesquisar
        </button>
      </div>

      {/* Ícone de Login */}
      <div>
        <button className="text-white text-lg" onClick={() => setTab(1)}>
          <i className="fas fa-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
