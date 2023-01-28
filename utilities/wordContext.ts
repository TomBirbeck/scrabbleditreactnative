import { createContext } from "react";

const WordContext = createContext<[string[],React.Dispatch<React.SetStateAction<string[]>>]>([[], ()=>{}])

export default WordContext