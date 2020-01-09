import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks'


const FavoriteBooks = ({show, result, user}) => {

const user = useQuery(SET_USER)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  console.log('Username, favoriteGenre,  beginning of FavoriteBooks', user.data.me.favoriteGenre, user.data.me.username)


  const filtered_books = (genre) => {
      return books.filter(b => b.genres.some(v=> v === genre) ?b :null)
  }
    
  const select_heading = (genre) => {
    if (genre === '') {
      return null
    }
    return ('Recommended genre : ' + genre)
  }



  return (
    <div>
      <h2>books</h2>

      <div>
        {select_heading(user.data.me.favoriteGenre)}
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
          {filtered_books(user.data.me.favoriteGenre).map(b =>
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

export default FavoriteBooks