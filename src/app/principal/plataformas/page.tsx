'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { PlataformaI } from "@/utils/types/plataformas"

function CadPlataformas() {
  const [plataformas, setPlataformas] = useState<PlataformaI[]>([])

  useEffect(() => {
    async function getPlataformas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/plataformas`)
      const dados = await response.json()
      setPlataformas(dados)
    }
    getPlataformas()
  }, [])

  const listaPlataformas = plataformas.map(plataforma => (
    <tr key={plataforma.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {plataforma.id}
      </td>
      <td className="px-6 py-4">
        {plataforma.nome}
      </td>
      <td className="px-6 py-4">
        {/* Você pode adicionar ações como editar ou excluir aqui */}
        <button 
          className="text-red-600 hover:underline dark:text-red-500"
          onClick={() => handleDeletePlataforma(plataforma.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  ))

  async function handleDeletePlataforma(id: number) {
    if (confirm("Tem certeza que deseja excluir esta plataforma?")) {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/plataformas/${id}`, {
        method: "DELETE",
      })
      setPlataformas(prev => prev.filter(plataforma => plataforma.id !== id))
    }
  }

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Cadastro de Plataformas
        </h1>
        <Link href="plataformas/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Nova Plataforma
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPlataformas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadPlataformas
