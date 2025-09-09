import { createContext, useContext } from "react";
import  type { PokemonByIdResponse } from "src/types/types.ts";

export const PokemonContext = createContext<{pokemon: PokemonByIdResponse} | {}>({})

type PokemonProviderProps = {
    children: React.ReactNode;
    pokemon: PokemonByIdResponse
}

export const usePokemon = () => useContext(PokemonContext)

export const PokemonProvider = ({ children, pokemon }: PokemonProviderProps ) => {
  return (
    <PokemonContext.Provider value={{ pokemon }}>
      {children}
    </PokemonContext.Provider>
  )
}