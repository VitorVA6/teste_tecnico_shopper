import React, { useEffect, useState } from 'react'
import {BsFiletypeCsv} from 'react-icons/bs'
import Button from '../components/Button'
import papa from 'papaparse'
import api from '../utils/api'
import {BsExclamationOctagon, BsCheckLg, BsArrowLeftShort} from 'react-icons/bs'
import currency  from '../utils/currency'
import notifies from '../utils/notify'

export default function UpdateProduct() {

    const [produtos, setProdutos] = useState([])
    const [csvData, setCsvData] = useState([])
    const [show, setShow] = useState([])
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        setDisable(!checkValidate())
        
    }, [produtos])

    async function handleFiles(ev){
        const csvFile = ev.target.files[0]
        if(csvFile && csvFile.type === "text/csv"){
            papa.parse(csvFile, {
                header: true,
                complete: (results) => {
                    const data = results?.data
                    setCsvData(data)
                }
            })
        }else{
            notifies.error('Formato de arquivo inválido')
        }
    }

    function handleShow(id){
        setShow(prev => prev.map(el => {
            if(el.id === id){
                return ({...el, status: !el.status})
            }
            return el
        }))
    }

    function checkShow(id){
        const element = show.find(el => el.id === id)
        if(element?.status === true) return true 
        return false
    }

    async function handleValidate(){
        if(csvData.length > 0){
            try{
                const {data} = await api.post('/products/validate', {csvData})
                setShow(data.map(el => ({id: el.product_code, status: false})))
                setProdutos(data)
            }catch(err){
                notifies.error(err.response.data.error)
            }
        }
        else notifies.error('Não existem dados para validar')
    }

    async function handleUpdate(){
        try{
            const {data} = await api.put('/products/update', {csvData})
            setCsvData([])
            setProdutos([])
            notifies.sucess(data.message)
        }catch(err){
            notifies.error(err.response.data.error)
        }
    }
    

    function checkValidate(){
        if(produtos.length === 0) return false
        let valid = true
        for (let i = 0; i < produtos.length; i++) {
            if(produtos[i].errors.length > 0) valid = false
        }
        return valid
    }

  return (
    <div className='w-screen flex pb-12 flex-col lg:px-12 xl:px-32'>
        <notifies.Container />
        <h1 className='font-bold text-[28px] py-12 text-black/80'>Atualizar produto</h1>
        <div className='flex flex-col w-full border rounded-md bg-gray-50 justify-center items-center'>
            <div className='flex w-full bg-white px-8 py-5 font-medium text-[18px] text-400 border-b text-black/80 justify-between'>
                PRODUTOS
                {produtos.length > 0 &&
                <button 
                    className='bg-transparent text-red-400 font-medium flex items-center gap-0.5 text-sm'
                    onClick={() => {
                        setCsvData([])
                        setProdutos([])
                    }}
                >
                    <BsArrowLeftShort className='w-[22px] h-[22px] mt-0.5'/>
                    Voltar
                </button>    
                }
            </div>
            <div className='flex flex-col items-center justify-center min-h-fit h-[360px] gap-10 text-gray-400 w-full overflow-y-auto'>
                {
                    produtos.length === 0 ?
                    <>
                        {
                        csvData.length === 0 ?
                        <h2 className='text-gray-400/80 text-[28px] font-semibold'>Faça upload do arquivo para atualizar os dados.</h2>:
                        <div className='flex flex-col items-center text-gray-400/80'>
                            <h2 className='text-[28px] font-semibold'>Ótimo! agora você já pode validar os produtos.</h2>
                            <h2 className='text-[20px] font-semibold'>Ou pode fazer upload de outro arquivo, caso preferir.</h2>
                        </div>
                        }
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
                    </>:
                    <div className='flex flex-col w-full h-full text-black/80'>
                        <div  className='grid grid-cols-8 w-full items-center py-4 bg-gray-100 px-8 mb-3 font-medium'>
                            <h3 className='col-span-1'>Código</h3>
                            <h3 className='col-span-3'>Nome</h3>
                            <h3 className='col-span-1'>Preço Atual</h3>
                            <h3 className='col-span-1'>Novo preço</h3>
                            <h3 className='col-span-1'>Status</h3>
                            <h3 className='col-span-1'>Erros</h3>
                        </div>
                        {
                            produtos.map((el, index) => (
                            <div key={index} className='flex flex-col'>
                                <div key={index} className='grid grid-cols-8 w-full items-center py-2 px-8 text-sm'>
                                    <h3 className='col-span-1'>{el.product_code}</h3>
                                    <h3 className='col-span-3'>{el.name}</h3>
                                    <h3 className='col-span-1'>{currency(el.current_price)}</h3>
                                    <h3 className='col-span-1'>{currency(el.new_price)}</h3>
                                    
                                    {
                                        el.errors.length === 0 ? 
                                        <BsCheckLg className='w-5 h-5 text-green-400 ml-3'/> :
                                        <BsExclamationOctagon className='w-5 h-5 text-red-400 ml-3'/>
                                    }
                                    {
                                        el.errors.length > 0 ?
                                        <button 
                                            className='col-span-1 bg-transparent text-blue-500 font-medium w-fit'
                                            onClick={() => handleShow(el.product_code)}
                                        >{`${checkShow(el.product_code) ? 'Fechar': 'Detalhes'}`}</button> :
                                        <BsCheckLg className='w-5 h-5 text-green-400'/>
                                    }
                                </div>
                                {
                                    el.errors.length > 0 &&
                                    <div className={`${checkShow(el.product_code) ? 'flex': 'hidden'} flex-col border-l-4 border-red-400 px-4 text-red-400 ml-8 my-3 rounded-r-md bg-red-50 w-fit py-3`}>
                                        <h2 className='font-medium mb-1 text-sm'>Erros de validação</h2>
                                        {
                                            el.errors.map((element, index) => (
                                                <p 
                                                    className='text-[13px]'
                                                    key={index}
                                                ><span className='font-medium'>{`- ${element.title}:`}</span>{` ${element.message}`}</p>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
        <div className='flex gap-3 justify-end w-full mt-4'>
            <Button handleSubmit={handleValidate}>Validar</Button>
            <Button handleSubmit={handleUpdate} disable={disable}>Atualizar</Button>
        </div>
    </div>
  )
}
