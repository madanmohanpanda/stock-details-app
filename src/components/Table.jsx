import React,{useEffect, useState , useRef} from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import Search from './Search';

const Table = () => {

    const [isSearch, setIsSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const [title, setTitle] = useState([]);
    const [refinedData , setRefinedData] = useState([]);

    const textRef = useRef();
    const navigate = useNavigate();

    const BASE_URL = 'https://prototype.sbulltech.com/api/v2/'

    const fetchData = async () =>{
        const res = await axios.get(BASE_URL+'instruments');
        const resCsv = await res.data;

        const titleString = await resCsv.split("\n").slice(0, 1);
        const title = await  titleString[0].split(',');
        setTitle(title);

        const dataString = await resCsv.split("\n");
        const dataStringArr =  await dataString.slice(1,dataString.length-1);

        
        const twoD = dataStringArr?.map((row,i)=>{
            const rowArr = row.split(',');
            return rowArr;
        })

       const jsonData = twoD.map((row)=>{
        const obj={};
        title.forEach((title, idx)=>{
            obj[title] = row[idx];
        })
        return obj;
       })

    //    console.log(jsonData);
    setRefinedData(jsonData);

    }

    // console.log(refinedData);

    useEffect(()=>{
        fetchData();
        
    },[])


    
    const searchHandler = () => {
        if(textRef.current.value.length <1 ){
            return;
        }
        const fuse = new Fuse(refinedData, {
            keys: ['Symbol']
        })
        const res = fuse.search(`${textRef.current.value}`)
        // console.log(res);
        setSearchResult(res);
        setIsSearch(true);
        // console.log(searchResult);
       
    } 

  const changehandler = () =>{
    if(textRef.current.value.length == 0)
    {
        setIsSearch(false);
    }
  }


  return (
    <div className='container' >
        <div className='search-box'>
            <input ref={textRef} onChange={()=>{
                changehandler();
                searchHandler();
            }} type="text" placeholder='Search here' />
            <button onClick={()=>searchHandler()}>Search</button>
        </div>
        
        <table className='table center'>
            <thead>
                <tr>
                   {title.map((t, i)=> <th key={i}>{t} </th>)} 
                </tr>
            </thead>
            <tbody>
                
                {isSearch ? (
                    searchResult.map((row, i)=>{
                        return <tr key={i} onClick={()=>navigate(`/quotes/${row.item.Symbol}`)} >
                             <td> {row.item.Symbol}</td>
                             <td>{row.item.Name}</td>
                             <td>{row.item.Sector}</td>
                             <td>{row.item.Validtill}</td>
                         </tr>
                     })
                ):(refinedData?.map((row, i)=>{
                   return <tr key={i} onClick={()=>navigate(`/quotes/${row.Symbol}`)}>
                        <td> {row?.Symbol}</td>
                        <td>{row?.Name}</td>
                        <td>{row?.Sector}</td>
                        <td>{row?.Validtill}</td>
                    </tr>
                }))}
                
            </tbody>
        </table>

    </div>
  )
}

export default Table