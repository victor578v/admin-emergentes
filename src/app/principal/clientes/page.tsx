'use client'

import { useEffect, useState } from "react"
import ItemCliente from '@/components/ItemCliente'
import { ClienteI } from "@/utils/types/clientes"

function CadClientes() {
  const [clientes, setClientes] = useState<ClienteI[]>([])

  useEffect(() => {
    async function getClientes() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`)
        const dados = await response.json()
        setClientes(dados)
      } catch (error) {
        console.error("Erro ao carregar clientes:", error)
      }
    }
    getClientes()
  }, [])

  const listaClientes = clientes.map(cliente => (
    <ItemCliente key={cliente.id} cliente={cliente} clientes={clientes} setClientes={setClientes} />
  ))

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
          Cadastro de Clientes
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Total de Jogos
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaClientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadClientes

