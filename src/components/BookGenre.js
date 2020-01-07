import React, { useState } from 'react'

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookGenre = ({show, books}) => {

  const [genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  console.log(books.data.allBooks)
  const all_genres = books.data.allBooks.reduce(
    (accumulator, current_book, index) => (accumulator.concat(current_book.genres), [])
  )
   


  const handleChange = (selectedOption)=> {
    console.log(selectedOption.value)
    setGenre(selectedOption.value)
  }

  return (
    <div>
      <h2>Select the genre</h2>
      <div style={{width: '300px'}}>
            <Select 
              options={all_genres}
              onChange = {handleChange}
            />
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookGenre