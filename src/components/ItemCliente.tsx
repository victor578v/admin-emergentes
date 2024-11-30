'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import Cookies from "js-cookie"
import { ClienteI } from "@/utils/types/clientes"

interface ItemClienteProps {
  cliente: ClienteI,
  clientes: ClienteI[],
  setClientes: Dispatch<SetStateAction<ClienteI[]>>
}

function ItemCliente({ cliente, clientes, setClientes }: ItemClienteProps) {
  async function excluirCliente() {
    if (confirm(`Confirma a exclusão do cliente ${cliente.nome}?`)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("admin_logado_token")}`,
          },
        });

        if (response.ok) {
          setClientes(clientes.filter(c => c.id !== cliente.id));
          alert("Cliente excluído com sucesso!");
        } else {
          alert("Erro ao excluir o cliente.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao excluir o cliente.");
      }
    }
  }

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {cliente.nome}
      </td>
      <td className="px-6 py-4">
        {cliente.email}
      </td>
      <td className="px-6 py-4">
        {cliente.totalJogos || 0} 
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline 
          className="text-3xl text-red-600 inline-block cursor-pointer" 
          title="Excluir" 
          onClick={excluirCliente} 
        />
      </td>
    </tr>
  )
}

export default ItemCliente
