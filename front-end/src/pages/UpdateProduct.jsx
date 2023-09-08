import React, { useEffect, useState } from 'react'
import {BsFiletypeCsv} from 'react-icons/bs'
import Button from '../components/Button'
import papa from 'papaparse'
import api from '../utils/api'

export default function UpdateProduct() {

    const [produtos, setProdutos] = useState([])
    const [csvData, setCsvData] = useState([])

    async function handleFiles(ev){
        const csvFile = ev.target.files[0]
        if(csvFile && csvFile.type === "text/csv"){
            papa.parse(csvFile, {
                header: true,
                complete: (results) => {
                    const data = results?.data
                    console.log(data)
                    setCsvData(data)
                }
            })
        }else{
            console.log('Arquivo inválido')
        }
    }

    async function handleValidate(){
        if(csvData.length > 0){
            try{
                const {data} = await api.post('/products/validate', {csvData})
                console.log(data)
            }catch(err){
                console.log(err.response.data)
            }
        }
        else console.log('Não existem dados a serem atualizados')
    }

  return (
    <div className='w-screen flex flex-col px-48 gap-10'>
        <h1 className='font-medium text-xl py-8'>Atualizar produto</h1>
        <div className='flex flex-col w-full border rounded-md bg-gray-50 justify-center items-center'>
            <div className='flex w-full bg-white px-8 py-5 font-medium text-[18px] text-400 border-b text-black/80'>PRODUTOS</div>
            <div className='flex flex-col items-center justify-center gap-12 text-gray-400 py-20'>
                <h2 className='text-gray-400 text-[28px] font-semibold'>Faça upload do arquivo para atualizar os dados</h2>
                <label className='cursor-pointer bg-blue-500 py-3 w-48 items-center flex justify-center rounded-md text-white gap-3 font-medium'>
                    <input 
                        className='hidden' 
                        type='file' 
                        multiple={false} 
                        onChange={handleFiles} 
                        accept=".csv"
                    />
                    <BsFiletypeCsv className='w-5 h-5 text-white'/>
                    Upload
                </label>
            </div>
        </div>
        <div className='flex gap-3 justify-end w-full'>
            <Button handleSubmit={handleValidate}>Validar</Button>
            <Button handleSubmit={() => {}}>Atualizar</Button>
        </div>
    </div>
  )
}
