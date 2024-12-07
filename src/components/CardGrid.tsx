import React from "react";
import Card from "./Card";

interface CardGridProps {
  data: Array<{
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
    descricao:string;
  }>;
}

const CardGrid: React.FC<CardGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default CardGrid;
