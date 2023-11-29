import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Quotes = () => {
    const {symbol} = useParams();
    const navigate = useNavigate();

    const [rowData, setRowData] = useState([]);
    const [minTime, setMinTime] = useState(30000);
    // console.log(symbol);
    const BASE_URL = 'https://prototype.sbulltech.com/api/v2/quotes/';

    const fetchData = async () =>{
        const res = await axios.get(`${BASE_URL}${symbol}`);
        // console.log(res);
        // console.log(symbol);
       
        const result = await res?.data?.payload[symbol];
        // console.log(result);

        
        
        result.sort((a,b)=>{
            let aDate = new Date(a.valid_till);
            let bDate = new Date(b.valid_till);

            return aDate - bDate;
        })
        setRowData(result);


        // console.log(result);
       
       
    }

  
    useEffect(()=>{
        fetchData();
        
    },[])

  /*   const calculateTime = () =>{
        let min = Number.MAX_VALUE;
        rowData.forEach((row)=>{

            let valid = new Date(row.valid_till);
            let currentTime = new Date(row.time);

            let dif = valid - currentTime;
            let diff = Math.ceil(Math.abs(dif))/100;
            let mili = Math.ceil(diff);
            
            if(min > mili)
            {
                min = mili;
                console.log('mili change');
            } 
            
        })

        setMinTime(min);

      
    //    console.log(minTime);
    } */

    /* useEffect(()=>{
        setInterval(()=>{
            calculateTime();
            console.log('re render');
        },minTime) 
    },[]); */
    
  return (
    <div className='container'>
        <h1>Details of {symbol}</h1>
        <table className='table center'>
            <thead>
                <tr >
                    <th>Price</th>
                    <th>Time</th>
                    <th>Valid_till</th>
                </tr>
            </thead>
            <tbody>
                {rowData.map((row, i)=>{
                    return <tr key={i}>
                            <td> {row.price} </td>
                            <td> {row.time} </td>
                            <td> {row.valid_till} </td>
                    </tr>
                })}
            </tbody>
        </table>
        <button onClick={()=>navigate('/')}>Go back</button>
    </div>
  )
}

export default Quotes