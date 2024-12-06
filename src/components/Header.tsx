import React from "react";

interface HeaderProps {
  setTab: (tabIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({ setTab }) => {
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
      <div>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-96"
        />
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
