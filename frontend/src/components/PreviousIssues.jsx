import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PreviousIssues = () => {

    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            await axios.get("http://localhost:3500/api/tools/getissues").then(({ data }) => {
                setData(data.issues.filter((item) => item.status != "returned"));
            })
        }
        getData();
    }, [])

    const handleChange = async (id) => {
        await axios.put("http://localhost:3500/api/tools/", { id }).then((resp) => {
            window.location.pathname = window.location.pathname;
        })
    }

    const handleReturned = async () => {
        if (data && data[0]?.status != "returned") {
            await axios.get("http://localhost:3500/api/tools/getissues").then(({ data }) => {
                setData(data.issues.filter((item) => item.status == "returned"));
            })
        } else {
            await axios.get("http://localhost:3500/api/tools/getissues").then(({ data }) => {
                setData(data.issues.filter((item) => item.status != "returned"));
            })
        }
    }

    return (
        <div className='bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc] h-full w-full p-20 overflow-hidden'>
            <span className='flex'>
                <h1 className='w-full text-5xl text-center font-bold m-5'>Previous Issues Data</h1>
                {data && <button onClick={handleReturned} className='self-start p-2 px-3 bg-black text-white text-sm text-nowrap cursor-pointer rounded-lg hover:opacity-85'>{data && data[0]?.status != "returned" ? "Show issued list" : "Show Returned List"}</button>}
            </span>
            {data && data.length > 0 ? <ul className='w-full p-10 gap-5 h-[90%] overflow-x-hidden overflow-y-scroll scrollbar-thin'>
                {data && data.map((item) => {
                    return (<li key={item._id} className='w-full flex gap-32 bg-white m-2 p-5 pt-8 rounded-lg'>
                        <span className='flex flex-col w-full justify-between'>
                            <span>
                                <p>Mechanic Name</p>
                                <h1 className='text-pretty text-lg font-semibold'>{item.mechanicName}</h1>
                            </span>
                            {item.status != "returned" && <button onClick={() => handleChange(item._id)} className='self-start p-2 px-3 bg-indigo-600 text-white cursor-pointer rounded-lg hover:opacity-85'>Return</button>}
                        </span>
                        <span className='flex flex-col w-full'>
                            <p>Phone Number</p>
                            <h1 className='text-pretty text-lg font-semibold'>{item.phone}</h1>
                        </span>
                        <span className='flex flex-col w-full'>
                            <p>Period</p>
                            <h1 className='text-pretty text-lg font-semibold'>{item.period}</h1>
                        </span>
                        <span className='flex flex-col w-full gap-2'>
                            <p>Tool Info</p>
                            <span className='flex'>
                                <img className='h-10 w-10 rounded-full' src={item.toolInfo.image}></img>
                                <h1 className='text-pretty text-lg ml-5'>{item.toolInfo.name}</h1>
                            </span>
                            <p className='text-sm p-1 px-3 bg-gray-200 w-fit self-end rounded-lg'>{item.toolInfo.category}</p>
                        </span>
                    </li>)
                })}
            </ul> : <h1 className='text-3xl font-bold text-gray-500 mt-52 w-full text-center'>Issues list empty</h1>}
        </div>
    )
}

export default PreviousIssues
