import React, { useEffect, useState } from 'react'
import AddTool from './AddTool'
import axios from "axios"
import { Delete } from '@mui/icons-material'
import IssueTool from './IssueToolForm';

axios.defaults.headers.common["Content-Type"] = "application/json";

const ToolComp = ({ title, category, image, id, setSelectTool, setIssueOpen }) => {

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:3500/api/tools", {
      data: {
        id
      }
    }).then(() => {
      console.log("Tool deleted successfully")
    })
  }

  const handleGet = async (id) => {
    await axios.post("http://localhost:3500/api/tools/single", { id }).then(({ data }) => {
      setSelectTool(data.tool);
      setIssueOpen(true);
    })
  }


  return <div className='w-1/4 flex bg-gray-200 justify-between rounded-lg hover:shadow-2xl transition-all'>
    <div className='w-full'>
      <img className='h-28 w-50 m-2 rounded-xl' src={image} alt={title} ></img>
    </div>
    <div className='w-full flex flex-col m-8'>
      <h2 className='font-bold'>{title}</h2>
      <p>{category}</p>
    </div>
    <div className='flex mr-5 align-baseline'>
      <button className='self-end m-4' onClick={() => handleDelete(id)}><Delete /></button>
      <button onClick={() => handleGet(id)} className='hover:shadow-md select-none self-end m-2 whitespace-nowrap bg-indigo-400 rounded-lg h-10 w-20 text-white hover:opacity-90'>Issue tool</button>
    </div>
  </div>
}

const ToolsList = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [issueOpen, setIssueOpen] = useState(false)
  const [selectedTool, setSelectTool] = useState({});

  useEffect(() => {
    const getTools = async () => {
      await axios.get("http://localhost:3500/api/tools/all").then(({ data }) => {
        setData(data.tools);
      })
    }
    getTools();
  })

  return (
    <>
      <div className='w-full h-full overflow-y-scroll scrollbar-thin bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc]'>
        <div className='text-xl font-bold fixed w-full bg-white flex'>
          <span className='w-[54%] flex justify-end align-middle'><p className='self-center'>Available Tools</p></span>
          <span className='w-[40%] flex justify-end px-20'>
            <button className='bg-black p-2 rounded-xl text-white m-5 text-sm select-none'><p onClick={() => window.location.pathname = "/issues"} className='self-center'>Previous Issued Data</p></button>
            <button className='bg-black p-2 rounded-xl text-white m-5 text-sm select-none'><p className='self-center' onClick={() => setOpen(true)}>Add Tool</p></button>
          </span>
        </div>
        {data.length > 0 ? <ul className='flex flex-wrap 
      justify-center gap-10 mt-28'>
          {
            data && data.map(({ name, category, image, _id }) => {
              return <ToolComp key={_id} title={name} category={category} image={image} id={_id} setSelectTool={setSelectTool} setIssueOpen={setIssueOpen} />
            })
          }
        </ul> : <h1 className='text-3xl font-bold text-gray-500 mt-52 w-full text-center'>Tools list empty</h1>}
      </div>
      <AddTool open={open} setOpen={setOpen} />
      <IssueTool open={issueOpen} setOpen={setIssueOpen} toolInfo={selectedTool} />
    </>
  )
}

export default ToolsList
