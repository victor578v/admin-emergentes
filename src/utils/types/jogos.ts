import { ReactNode } from "react"
import { CategoriaI } from "./categorias"
import { DesenvolvedoraI } from "./desenvolvedoras"
import { PlataformaI } from "./plataformas"

// Interface para o jogo
export interface JogoI {
  dataLancamento: Date | string // Use Date if it's a JavaScript Date object, or string if it's a date string
  id: number
  titulo: string
  preco: number
  lancamento: Date
  descricao?: string
  imagem?: string
  destaque: boolean
  createdAt: Date
  updatedAt: Date
  categoria: CategoriaI
  categoriaId: number
  desenvolvedora: DesenvolvedoraI
  desenvolvedoraId: number
  plataformas: PlataformaJogoI[]
}

// Interface para a relação entre jogos e plataformas
export interface PlataformaJogoI {
  nome: ReactNode
  id: number
  plataforma: PlataformaI
  plataformaId: number
}

