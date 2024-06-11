import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { PuffLoader } from "react-spinners";
import '../css/Search.scss'
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchItem from '../components/SearchItem';
import { fetchAPI } from '../../fetchApi';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1dc483',
      contrastText: '#fff',
    }
  },
});

const Search = () => {

  // DELETE after use

  const array = [
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/bo.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/chuoi.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/bo.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/chuoi.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/bo.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/chuoi.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/bo.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/chuoi.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/bo.png"
      ]
    },
    {
      itemName: "what",
      price: 25000,
      discount: 30000,
      img: [
        "/qua/chuoi.png"
      ]
    },
    
  ]


  const [param] = new useSearchParams();
  const query = param.get("q");



  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() =>{
    fetchAPI(`/search-item/${query}`, 'GET').then(e => console.log(e))
  }, [])


  // START TEST CODE

  // TODO: array is API ITEMS GOT CALLED
  // let array = []
  let finalArray = []

  for (let i = 0; i < array.length; i += 8) {
    finalArray.push(array.slice(i, i + 8));
  }

  console.log(finalArray.length, array.length)


  // END TEST CODE



  // PAGINATION
  const [page, setPage] = useState(1)
  const handlePageChange = (e, i) => {
    setPage(i)
  }




  return (
    // array length === 0
    loading ? (<>
      <PuffLoader color='#1dc483' className='loader' />
    </>) : (<div className='search-container'>
      <div className="pagination">
        <ThemeProvider theme={theme}>
          <Pagination count={Math.ceil(array.length / 8)} color='primary' showFirstButton showLastButton onChange={handlePageChange} />
        </ThemeProvider>
      </div>
      <div className="results">
        {finalArray[page - 1].map((e, i) => (
          <SearchItem key={i} props={e} />
        ))}
      </div>
    </div>)
  )
}

export default Search