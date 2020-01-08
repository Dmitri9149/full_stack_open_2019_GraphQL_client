import React, { useState } from 'react'

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'

const Books = ({show, books}) => {
  const [filtered_books, setFiltered_books] = useState([])
  const [genre, setGenre] = useState('')
  console.log('filtered_books', filtered_books)


  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genres =() => {
    const all_genres_list = books.data.allBooks.reduce(
      (accumulator, current_book, index) => accumulator.concat(current_book.genres), []
    )
    console.log(all_genres_list)
    const all_genres_0 = all_genres_list.map(b=> {
      const container = {}
      container.label = b
      container.value = b
      return container
    })
    const all_genres = [...all_genres_0, {label:'allgenres', value:'allgenres'}]
    return all_genres
  }
  
  const filter_books = (genre) => {
    if (genre === 'allgenres') {
      return books.data.allBooks
    }
      return books.data.allBooks.filter(b => b.genres.some(v=> v === genre) ?b :null)
  }
    
  const handleChange = (selectedOption)=> {
    console.log(selectedOption.value)
    console.log('filter_books!!!', filter_books(selectedOption.value))
    setGenre(selectedOption.value)
    setFiltered_books(filter_books(selectedOption.value))
  }

  const select_heading = (genre) => {
    if (genre === '') {
      return null
    }
    return ('selected genre : ' + genre)
  }



  return (
    <div>
      <h2>books</h2>
      <div style={{width: '300px'}}>
        <div>
          {select_heading(genre)}
        </div>
        <Select 
          options = {genres()}
          onChange = {handleChange}
          defaultValue={{ label: "Select Genre", value: null }}
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
          {filtered_books.map(b =>
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

export default Books