import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [productDescription, setProductDescription] = useState<string>(descricao);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const userCar = parsedData.car;

        if (userCar) {
          const userCarYear = parseInt(userCar.year, 10);
          const [startYear, endYear] = ano.split("/").map((year) => parseInt(year.trim(), 10));

          if (userCar.model === modelo && userCarYear >= startYear && userCarYear <= endYear) {
            setCompatibilityMessage("Esta peça é compatível com seu veículo.");
          } else {
            setCompatibilityMessage("Não é possível garantir a compatibilidade desta peça com seu veículo.");
          }
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
        setCompatibilityMessage(null);
      }
    }
  }, [modelo, ano]);

  const fetchAIProductDescription = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // Endpoint da OpenAI
        {
          model: "text-davinci-003",
          prompt: `Crie uma descrição detalhada do produto: ${nome}, da marca ${marca}. Modelo: ${modelo}, Ano: ${ano}.`,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Substitua pela sua chave da OpenAI
          },
        }
      );
      const aiDescription = response.data.choices[0].text.trim();
      setProductDescription(aiDescription);
    } catch (error) {
      console.error("Erro ao obter descrição da IA:", error);
      setProductDescription("Descrição não disponível.");
    }
  };

  const togglePopup = () => {setIsPopupOpen((prev) => !prev)

    if (!isPopupOpen) {
      fetchAIProductDescription();
    }
  };

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
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={togglePopup}
      >
        Mais Informações
      </button>
      {compatibilityMessage && (
        <p
          className={`mt-4 text-sm font-medium ${
            compatibilityMessage.includes("compatível") ? "text-green-600" : "text-red-600"
          }`}
        >
          {compatibilityMessage}
        </p>
      )}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Descrição</h4>
            <p className="text-sm text-gray-600 space-y-2">{productDescription}</p>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Mais detalhes da Peça</h4>
            <ul className="text-sm text-gray-600 space-y-2">
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
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={togglePopup}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
