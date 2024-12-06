import React from "react";

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
}) => {
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
    </div>
  );
};

export default Card;
