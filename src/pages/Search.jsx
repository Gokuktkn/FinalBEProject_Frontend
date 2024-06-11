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
  const [data, setData] = useState()

  useEffect(() => {
    setLoading(true)
    fetchAPI(`/item/search-item/${query}`, 'GET').then(e => {
      if (e.status === 200) {
        let finalArray = []

        for (let i = 0; i < e.data.items.length; i += 8) {
          finalArray.push(e.data.items.slice(i, i + 8));
        }

        setData(finalArray)
      }
      else if (e.status === 404) {
        setData(false)
      }
      else {
        console.log(e)
      }
      setLoading(false)
    })
  }, [query])
  console.log(data)



  // PAGINATION
  const [page, setPage] = useState(1)
  const handlePageChange = (e, i) => {
    setPage(i)
  }




  return (
    // array length === 0
    loading ? (<>
      <PuffLoader color='#1dc483' className='loader' />
    </>) : !data ? (<div>
      Không có kết quả
    </div>) : (<div className='search-container'>
      <div className="pagination">
        <ThemeProvider theme={theme}>
          <Pagination count={Math.ceil(data.length / 8)} color='primary' showFirstButton showLastButton onChange={handlePageChange} />
        </ThemeProvider>
      </div>
      <div className="results">
        {data[page - 1].map((e, i) => (
          <SearchItem key={i} props={e} />
        ))}
      </div>
    </div>)
  )
}

export default Search