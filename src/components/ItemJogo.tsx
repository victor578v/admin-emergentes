'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaStar, FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { JogoI } from "@/utils/types/jogos"

interface listaJogoProps {
  jogo: JogoI,
  jogos: JogoI[],
  setJogos: Dispatch<SetStateAction<JogoI[]>>
}

function ItemJogo({ jogo, jogos, setJogos }: listaJogoProps) {

  async function excluirJogo() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/${jogo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const jogos2 = jogos.filter(x => x.id != jogo.id)
        setJogos(jogos2)
        alert("Jogo excluído com sucesso")
      } else {
        alert("Erro... Jogo não foi excluído")
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/destacar/${jogo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const jogos2 = jogos.map(x => {
        if (x.id == jogo.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setJogos(jogos2)
    }
  }

  return (
    <tr key={jogo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={jogo.imagem} alt="Capa do Jogo" style={{ width: 200 }} />
      </th>
      <td className="px-6 py-4">
        {jogo.titulo}
      </td>
      <td className="px-6 py-4">
        {jogo.desenvolvedora.nome}
      </td>
      <td className="px-6 py-4">
        {jogo.categoria.nome}
      </td>
      <td className="px-6 py-4">
        {jogo.plataformas.map(plataforma => (
          <span key={plataforma.id} className="mr-2">{plataforma.nome}</span>
        ))}
      </td>
      <td className="px-6 py-4">
        {Number(jogo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirJogo} />&nbsp;
        {jogo.destaque ? (
          <FaStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
            onClick={alterarDestaque} />
        ) : (
          <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
            onClick={alterarDestaque} />
        )}
      </td>
    </tr>
  )
}

export default ItemJogo

