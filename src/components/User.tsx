import React, { useState } from 'react';

// Dados de mock para as marcas, modelos e anos
const carMockData = [
  { brand: 'Toyota', models: [{ model: 'Corolla', years: [2020, 2021] }, { model: 'Camry', years: [2020, 2021] }] },
  { brand: 'Honda', models: [{ model: 'Civic', years: [2019, 2020, 2021] }, { model: 'Accord', years: [2020, 2021] }] },
  { brand: 'Ford', models: [{ model: 'Mustang', years: [2019, 2020] }, { model: 'F-150', years: [2021] }] },
];

interface Car {
  brand: string;
  model: string;
  year: number;
}

const User: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | string>('');
  const [models, setModels] = useState<{ model: string; years: number[] }[]>([]);
  const [years, setYears] = useState<number[]>([]);

  // Função para salvar os dados no localStorage
  const saveData = () => {
    const selectedCar: Car = { brand: selectedBrand, model: selectedModel, year: selectedYear as number };
    const userData = { name, password, car: selectedCar };
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Função para carregar os dados do localStorage
  const loadData = () => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name);
      setPassword(parsedData.password);
      setSelectedBrand(parsedData.car.brand);
      setSelectedModel(parsedData.car.model);
      setSelectedYear(parsedData.car.year);
    }
  };

  // Função para atualizar os modelos e anos quando a marca for selecionada
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = carMockData.find((car) => car.brand === brand);
    if (brandData) {
      setModels(brandData.models);
      setYears([]); // Limpa os anos ao trocar a marca
      setSelectedModel('');
      setSelectedYear('');
    }
  };

  // Função para atualizar os anos quando o modelo for selecionado
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const modelData = models.find((m) => m.model === model);
    if (modelData) {
      setYears(modelData.years);
      setSelectedYear(''); // Limpa o ano ao trocar o modelo
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Form</h2>

      {/* Formulário de nome e senha */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Digite seu nome"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Digite sua senha"
        />
      </div>

      {/* Seção de marca, modelo e ano do carro */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Carro</h3>

        {/* Seletor de Marca */}
        <label className="block text-sm font-medium text-gray-700" htmlFor="car-brand">
          Marca
        </label>
        <select
          id="car-brand"
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Selecione uma marca</option>
          {carMockData.map((car) => (
            <option key={car.brand} value={car.brand}>
              {car.brand}
            </option>
          ))}
        </select>

        {/* Seletor de Modelo */}
        {selectedBrand && models.length > 0 && (
          <>
            <label className="block text-sm font-medium text-gray-700" htmlFor="car-model">
              Modelo
            </label>
            <select
              id="car-model"
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Selecione um modelo</option>
              {models.map((model) => (
                <option key={model.model} value={model.model}>
                  {model.model}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Seletor de Ano */}
        {selectedModel && years.length > 0 && (
          <>
            <label className="block text-sm font-medium text-gray-700" htmlFor="car-year">
              Ano
            </label>
            <select
              id="car-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Selecione um ano</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Botões para salvar e carregar */}
      <div className="flex space-x-4">
        <button
          onClick={saveData}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Salvar
        </button>
        <button
          onClick={loadData}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Carregar
        </button>
      </div>

      {/* Display dos dados salvos */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold">Dados Salvos:</h4>
        <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
          {localStorage.getItem('userData')}
        </pre>
      </div>
    </div>
  );
};

export default User;
