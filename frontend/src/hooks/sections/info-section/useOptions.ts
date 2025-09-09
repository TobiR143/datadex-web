import { useState } from "react"

type Options = {
  voice: number,
  voiceRange: number
}

export const useOptions = () => {
    const [options, setOptions] = useState<Options>({
        voice: 100,
        voiceRange: 200,
    })

    const handleChangeOptions = (options: Options) => {
      setOptions({...options})
    }

    return {
        options,
        setOptions,
        handleChangeOptions
    }
}