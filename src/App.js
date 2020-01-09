import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import FavoriteBooks from './components/FavoriteBooks'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

import 'bootstrap/dist/css/bootstrap.min.css';


const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    published
    genres
    author {
      name
    }
    
  }
}
`
const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
      }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name:String!, $setBornTo:Int!) {
    editAuthor(
      name:$name,
      setBornTo:$setBornTo
    ) {
      name
      born
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const ME = gql`
{
  me {
    username,
    favoriteGenre
  }
}
`

const App = () => {

  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS, {pollInterval: 500})
  const user = useQuery(ME, {pollInterval: 500})


  const client = useApolloClient()


  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>


  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, {query:ALL_AUTHORS}]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, {query:ALL_AUTHORS}]
  })  

 
  console.log('result', authors)
  console.log('addBook', addBook)

  const whoIsUser = ()=> {
    if (!(user.data.me===null)) {
      return user.data.me.username
    }
    return 'no user'
  } 



  if (!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        {whoIsUser()}
      </div>
  
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>   
        <button onClick={() => setPage('recommended')}>recommended</button>  
        <button onClick={logout}>logout</button>
      </div>
      <div>
        {errorNotification()}        
      </div>

      <Authors authors = {authors} editAuthor = {editAuthor}
        show={page === 'authors'}
      />

      <Books books = {books}
        show={page === 'books'}
      />

      <NewBook addBook = {addBook}
        show={page === 'add'}
      />

      <FavoriteBooks result  = {books}
        user = {user}
        show={page === 'recommended'}
      />
    </div>
  )
}

export default App