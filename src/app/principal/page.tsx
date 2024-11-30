'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface JogosPlataformaI {
  plataforma: string;
  quantidadeJogos: number;
}

interface PlataformaI {
  plataforma: string;
  quantidadeJogos: number;
}

interface JogosDesenvolvedoraPlataformaI {
  desenvolvedora: string;
  plataformas: PlataformaI[];
}

interface JogosDesenvolvedoraI {
  desenvolvedora: string;
  quantidadeJogos: number;
}

interface GeralDadosI {
  clientes: number;
  jogos: number;
  vendas: number;
}

type DataRow = [string, number, string];
type DataRow2 = [string, string, number];

export default function Principal() {
  const [jogosPlataforma, setJogosPlataforma] = useState<JogosPlataformaI[]>([]);
  const [jogosDesenvolvedora, setJogosDesenvolvedora] = useState<JogosDesenvolvedoraI[]>([]);
  const [jogosDesenvolvedoraPlataforma, setJogosDesenvolvedoraPlataforma] = useState<JogosDesenvolvedoraPlataformaI[]>([]);
  const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI);

  useEffect(() => {
    // Requisição para pegar a quantidade de jogos por plataforma
    async function getDadosGraficoJogosPlataforma() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/quantidade-jogos-plataforma`);
      const dados = await response.json();
      setJogosPlataforma(dados);
    }
    getDadosGraficoJogosPlataforma();

    async function getJogosDesenvolvedoraPlataforma() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/quantidade-jogos-desenvolvedora-plataforma`);
      const dados = await response.json();
      setJogosDesenvolvedoraPlataforma(dados);
    }
    getJogosDesenvolvedoraPlataforma();

    async function getDadosGraficoJogosDesenvolvedora() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/quantidade-jogos-desenvolvedora`);
      const dados = await response.json();
      setJogosDesenvolvedora(dados);
    }
    getDadosGraficoJogosDesenvolvedora();

    // Requisição para pegar dados gerais
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();
  }, []);

  // Definir os dados para o gráfico de jogos por plataforma
  const dataPlataforma: (["Plataforma", "Nº Jogos", { role: string }] | DataRow)[] = [
    ["Plataforma", "Nº Jogos", { role: "style" }], // Cabeçalho do gráfico
  ];

  // Definir os dados para o gráfico de jogos por desenvolvedora
  const dataDesenvolvedora: (["Desenvolvedora", "Nº Jogos", { role: string }] | DataRow)[] = [
    ["Desenvolvedora", "Nº Jogos", { role: "style" }], // Cabeçalho do gráfico
  ];

  const dataDesenvolvedoraPlataforma: (["Desenvolvedora", "Plataforma", "Nº Jogos"] | DataRow2)[] = [
    ["Desenvolvedora", "Plataforma", "Nº Jogos"], // Cabeçalho do gráfico
  ];

  // Cores para as barras do gráfico
  const cores = [
    "red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered",
  ];

  // Preencher os dados do gráfico de plataformas com a quantidade de jogos
  jogosPlataforma.forEach((jogo, index) => {
    dataPlataforma.push([jogo.plataforma, jogo.quantidadeJogos, cores[index % 10]]);
  });

  // Preencher os dados do gráfico de desenvolvedoras por plataforma com a quantidade de jogos
  jogosDesenvolvedoraPlataforma.forEach((item) => {
    if (item.plataformas.length === 0) {
      dataDesenvolvedoraPlataforma.push([item.desenvolvedora, "No Platform", 0]);
    } else {
      item.plataformas.forEach((plataforma) => {
        // Type checking to ensure correctness
        const desenvolvedora = typeof item.desenvolvedora === "string" ? item.desenvolvedora : "Unknown";
        const plataformaName = typeof plataforma.plataforma === "string" ? plataforma.plataforma : "Unknown";
        const quantidadeJogos = typeof plataforma.quantidadeJogos === "number" ? plataforma.quantidadeJogos : 0;
    
        // Push the validated data
        dataDesenvolvedoraPlataforma.push([desenvolvedora, plataformaName, quantidadeJogos]);
      });
    }
  });
  
  console.log(dataDesenvolvedoraPlataforma);


  // Preencher os dados do gráfico de desenvolvedoras com a quantidade de jogos
  jogosDesenvolvedora.forEach((jogo, index) => {
    dataDesenvolvedora.push([jogo.desenvolvedora, jogo.quantidadeJogos, cores[index % 10]]);
  });

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.jogos}</span>
          <p className="font-bold mt-2 text-center">Nº Jogos</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.vendas}</span>
          <p className="font-bold mt-2 text-center">Nº Vendas</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Jogos por Plataforma</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={dataPlataforma} />

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Jogos por Desenvolvedora</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={dataDesenvolvedora} />

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Jogos por Desenvolvedora nas Plataformas</h2>
      <Chart chartType="Bar" width="95%" height="380px" data={dataDesenvolvedoraPlataforma} />
    </div>
  );
}

