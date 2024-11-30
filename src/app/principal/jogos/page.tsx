'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import ItemJogo from '@/components/ItemJogo'
import { JogoI } from "@/utils/types/jogos"

function CadJogos() {
  const [jogos, setJogos] = useState<JogoI[]>([])

  useEffect(() => {
    async function getJogos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos`)
      const dados = await response.json()
      setJogos(dados)
    }
    getJogos()
  }, [])

  const listaJogos = jogos.map(jogo => (
    <ItemJogo key={jogo.id} jogo={jogo} jogos={jogos} setJogos={setJogos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Jogos
        </h1>
        <Link href="jogos/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo Jogo
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Desenvolvedora
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Plataformas
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaJogos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadJogos
