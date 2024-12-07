import React, { useEffect, useState } from "react";

interface CardProps {
  marca: string;
  nome: string;
  modelo: string;
  ano: string; 
  codigoCofap: string;
  codigoOriginal: string;
  codigoAxios: string;
  codigoSampel: string;
  codigoMobensani: string;
  codigoBorflex: string;
  codigoYibrasil: string;
  embalagem: number;
  descricao: string;
}

const Card: React.FC<CardProps> = ({
  marca,
  nome,
  modelo,
  ano,
  codigoCofap,
  codigoOriginal,
  codigoAxios,
  codigoSampel,
  codigoMobensani,
  codigoBorflex,
  codigoYibrasil,
  embalagem,
  descricao,
}) => {
  const [compatibilityMessage, setCompatibilityMessage] = useState<string | null>(null);

  useEffect(() => {
    // Verifica o localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const userCar = parsedData.car;

        if (userCar) {
          const userCarYear = parseInt(userCar.year, 10);

          // Extrai o intervalo de anos do campo `ano`
          const yearRange = ano.split("/").map((year) => parseInt(year.trim(), 10));
          const startYear = yearRange[0];
          const endYear = yearRange[1];

          // Verifica se o ano do carro está no intervalo
          if (userCar.model === modelo && userCarYear >= startYear && userCarYear <= endYear) {
            setCompatibilityMessage("Esta peça é compatível com seu veículo.");
          } else {
            setCompatibilityMessage(
              "Não é possível garantir a compatibilidade desta peça com seu veículo."
            );
          }
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
        setCompatibilityMessage(null);
      }
    }
  }, [modelo, ano]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{nome}</h3>
      <p className="text-sm text-gray-600">
        <strong>Marca:</strong> {marca}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Modelo:</strong> {modelo}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Ano:</strong> {ano}
      </p>
      <ul className="mt-2 text-sm text-gray-600">
        <li>
          <strong>Código Cofap:</strong> {codigoCofap}
        </li>
        <li>
          <strong>Código Original:</strong> {codigoOriginal}
        </li>
        <li>
          <strong>Código Axios:</strong> {codigoAxios}
        </li>
        <li>
          <strong>Código Sampel:</strong> {codigoSampel}
        </li>
        <li>
          <strong>Código Mobensani:</strong> {codigoMobensani}
        </li>
        <li>
          <strong>Código Borflex:</strong> {codigoBorflex}
        </li>
        <li>
          <strong>Código YiBrasil:</strong> {codigoYibrasil}
        </li>
        <li>
          <strong>Embalagem:</strong> {embalagem}
        </li>
      </ul>
      {compatibilityMessage && (
        <p
          className={`mt-4 text-sm font-medium ${
            compatibilityMessage.includes("compatível")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {compatibilityMessage}
        </p>
      )}
    </div>
  );
};

export default Card;
