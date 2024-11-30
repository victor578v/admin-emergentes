'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { DesenvolvedoraI } from "@/utils/types/desenvolvedoras"

function CadDesenvolvedoras() {
  const [desenvolvedoras, setDesenvolvedoras] = useState<DesenvolvedoraI[]>([])

  useEffect(() => {
    async function getDesenvolvedoras() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/desenvolvedoras`)
      const dados = await response.json()
      setDesenvolvedoras(dados)
    }
    getDesenvolvedoras()
  }, [])

  const listaDesenvolvedoras = desenvolvedoras.map(desenvolvedora => (
    <tr key={desenvolvedora.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {desenvolvedora.id}
      </td>
      <td className="px-6 py-4">
        {desenvolvedora.nome}
      </td>
      <td className="px-6 py-4">
        <button 
          className="text-red-600 hover:text-red-800 font-bold"
          onClick={() => handleDelete(desenvolvedora.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  ))

  async function handleDelete(id: number) {
    if (confirm("Confirma a exclusão da desenvolvedora?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/desenvolvedoras/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setDesenvolvedoras(desenvolvedoras.filter(desenvolvedora => desenvolvedora.id !== id))
      }
    }
  }

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Cadastro de Desenvolvedoras
        </h1>
        <Link href="desenvolvedoras/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Nova Desenvolvedora
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
            {listaDesenvolvedoras}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadDesenvolvedoras

