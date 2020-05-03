export namespace Dato {
  type Unit = {
    id: string
    name: string
    short: string
  }

  export type Ingredient = {
    id: string
    name: string
    info: string | null
    slug: string
    unit: Unit
  }
}
