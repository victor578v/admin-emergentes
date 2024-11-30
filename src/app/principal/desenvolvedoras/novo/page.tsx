'use client'

import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"

type Inputs = {
  nome: string;
}

function NovaDesenvolvedora() {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  // Função para incluir uma nova desenvolvedora
  async function incluirDesenvolvedora(data: Inputs) {
    const novaDesenvolvedora = {
      nome: data.nome,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/desenvolvedoras`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
      },
      body: JSON.stringify(novaDesenvolvedora)
    })

    if (response.status === 201) {
      toast.success("Desenvolvedora cadastrada com sucesso")
      reset()
    } else {
      toast.error("Erro ao cadastrar desenvolvedora")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Inclusão de Desenvolvedora
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirDesenvolvedora)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">
            Nome da Desenvolvedora</label>
          <input
            type="text"
            id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("nome")}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar Desenvolvedora
        </button>
      </form>
    </>
  )
}

export default NovaDesenvolvedora
