'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { CategoriaI } from "@/utils/types/categorias"

function CadCategorias() {
  const [categorias, setCategorias] = useState<CategoriaI[]>([])

  useEffect(() => {
    async function getCategorias() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categorias`)
      const dados = await response.json()
      setCategorias(dados)
    }
    getCategorias()
  }, [])

  const listaCategorias = categorias.map(categoria => (
    <tr key={categoria.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {categoria.id}
      </td>
      <td className="px-6 py-4">
        {categoria.nome}
      </td>
      <td className="px-6 py-4">
        <button 
          className="text-red-600 hover:text-red-800 font-bold"
          onClick={() => handleDelete(categoria.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  ))

  async function handleDelete(id: number) {
    if (confirm("Confirma a exclusão da categoria?")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categorias/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setCategorias(categorias.filter(categoria => categoria.id !== id))
      }
    }
  }

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Cadastro de Categorias
        </h1>
        <Link href="categorias/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Nova Categoria
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
            {listaCategorias}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadCategorias

