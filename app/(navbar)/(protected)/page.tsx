'use client'

import { createContext, Dispatch, useState } from 'react'
import UploadView from '@components/home/UploadView'
import ResultView from '@components/home/ResultView'

export type UpscaleContextType = {
  inputimage: string | undefined,
  setInputimage: Dispatch<string | undefined>,
  upscaledimage: string | undefined,
  setUpscaledimage: Dispatch<string | undefined>,
  view: views,
  setView: Dispatch<views>,
  curmodel: available_model,
  setCurmodel: Dispatch<available_model>
}

export enum views {
  UPLOAD = 'UPLOAD',
  RESULT = 'RESULT'
}

export enum available_model {
  SRGAN = 'SRGAN',
  SRCNN = 'SRCNN'
}

export const UpscaleContext = createContext<UpscaleContextType | null>(null)

export default function Upscale() {
  
  const [inputimage, setInputimage] = useState<string | undefined>()
  const [upscaledimage, setUpscaledimage] = useState<string | undefined>()
  const [view, setView] = useState<views>(views.UPLOAD)
  const [curmodel, setCurmodel] = useState<available_model>(available_model.SRGAN)

  return (
    <UpscaleContext.Provider value={{inputimage, setInputimage, upscaledimage, setUpscaledimage, view, setView, curmodel, setCurmodel}}>
      <div className='flex flex-col w-full items-center space-y-4'>
        {view == views.UPLOAD && <UploadView/>}
        {view == views.RESULT && <ResultView/>}
      </div>
    </UpscaleContext.Provider>
  )
}
