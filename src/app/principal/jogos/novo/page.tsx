'use client'

import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { PlataformaI } from "@/utils/types/plataformas"
import { CategoriaI } from "@/utils/types/categorias"
import { DesenvolvedoraI } from "@/utils/types/desenvolvedoras"

type Inputs = {
  titulo: string;
  preco: number;
  lancamento: Date;
  descricao?: string;
  imagem?: string;
  destaque?: boolean;
  categoriaId: number;
  desenvolvedoraId: number;
  plataformas: number[];
}

function NovoJogo() {
  const [categorias, setCategorias] = useState<CategoriaI[]>([])
  const [desenvolvedoras, setDesenvolvedoras] = useState<DesenvolvedoraI[]>([])
  const [plataformas, setPlataformas] = useState<PlataformaI[]>([])
  const [plataformasSelecionadas, setPlataformasSelecionadas] = useState<number[]>([]) // Armazena as plataformas selecionadas
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  useEffect(() => {
    async function getCategorias() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categorias`)
      const dados = await response.json()
      setCategorias(dados)
    }

    async function getDesenvolvedoras() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/desenvolvedoras`)
      const dados = await response.json()
      setDesenvolvedoras(dados)
    }

    async function getPlataformas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/plataformas`)
      const dados = await response.json()
      setPlataformas(dados)
    }

    getCategorias()
    getDesenvolvedoras()
    getPlataformas()
    setFocus("titulo")
  }, [])

  const optionsCategoria = categorias.map(categoria => (
    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
  ))

  const optionsDesenvolvedora = desenvolvedoras.map(desenvolvedora => (
    <option key={desenvolvedora.id} value={desenvolvedora.id}>{desenvolvedora.nome}</option>
  ))

  const optionsPlataforma = plataformas.map(plataforma => (
    <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
  ))

  const adicionarPlataforma = (plataformaId: number) => {
    if (!plataformasSelecionadas.includes(plataformaId)) {
      setPlataformasSelecionadas([...plataformasSelecionadas, plataformaId])
    }
  }

  const removerPlataforma = (plataformaId: number) => {
    setPlataformasSelecionadas(plataformasSelecionadas.filter(id => id !== plataformaId))
  }

  async function incluirJogo(data: Inputs) {
    const novoJogo = {
      titulo: data.titulo,
      preco: Number(data.preco),
      lancamento: new Date(data.lancamento).toISOString(),
      descricao: data.descricao || "",  
      imagem: data.imagem || "",       
      destaque: data.destaque || false,  
      categoriaId: Number(data.categoriaId),
      desenvolvedoraId: Number(data.desenvolvedoraId),
      plataformas: plataformasSelecionadas,
      adminId: Number(Cookies.get("admin_logado_id"))
    }

    console.log(novoJogo)

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
      },
      body: JSON.stringify(novoJogo)
    })

    if (response.status === 201) {
      toast.success("Ok! Jogo cadastrado com sucesso")
      reset()
      setPlataformasSelecionadas([]) // Limpar o array de plataformas selecionadas após o envio
    } else {
      toast.error("Erro no cadastro do Jogo...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Inclusão de Jogos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirJogo)}>
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900">
            Título do Jogo</label>
          <input type="text" id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("titulo")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoriaId" className="block mb-2 text-sm font-medium text-gray-900">
            Categoria</label>
          <select id="categoriaId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("categoriaId")}
          >
            {optionsCategoria}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="desenvolvedoraId" className="block mb-2 text-sm font-medium text-gray-900">
            Desenvolvedora</label>
          <select id="desenvolvedoraId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("desenvolvedoraId")}
          >
            {optionsDesenvolvedora}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="plataformas" className="block mb-2 text-sm font-medium text-gray-900">
            Plataformas</label>
          <div className="flex items-center">
            <select id="plataformas"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("plataformas")}
            >
              {optionsPlataforma}
            </select>
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => {
                const plataformaSelect = document.getElementById('plataformas') as HTMLSelectElement
                const plataformaId = Number(plataformaSelect.value)
                if (plataformaId) {
                  adicionarPlataforma(plataformaId)
                }
              }}
            >
              Adicionar
            </button>

          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-900">Plataformas Selecionadas:</h3>
          <ul className="list-disc pl-5">
            {plataformasSelecionadas.map(plataformaId => {
              const plataforma = plataformas.find(p => p.id === plataformaId)
              return plataforma ? (
                <li key={plataformaId} className="flex justify-between items-center">
                  {plataforma.nome}
                  <button
                    type="button"
                    className="ml-2 text-red-600"
                    onClick={() => removerPlataforma(plataformaId)}
                  >
                    Remover
                  </button>
                </li>
              ) : null
            })}
          </ul>
        </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
          <div>
            <label htmlFor="lancamento" className="block mb-2 text-sm font-medium text-gray-900">
              Lançamento</label>
            <input type="date" id="lancamento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("lancamento")}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900">
            Descrição</label>
          <textarea id="descricao"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("descricao")}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="imagem" className="block mb-2 text-sm font-medium text-gray-900">
            Imagem do Jogo (URL)</label>
          <input type="text" id="imagem"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("imagem")}
          />
        </div>

        <div className="mb-3 flex items-center">
          <input id="destaque" type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("destaque")} />
          <label htmlFor="destaque" className="ml-2 text-sm font-medium text-gray-900">
            Destacar Jogo
          </label>
        </div>

        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Cadastrar Jogo
        </button>
      </form>
    </>
  )
}

export default NovoJogo
