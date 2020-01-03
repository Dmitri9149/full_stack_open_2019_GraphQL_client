import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables:{name:name , setBornTo:born}
    })

    console.log('add author...')

    setName('')
    setBorn('')
  } 

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {props.authors.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthday</h2>
        <form onSubmit = {submit}>
          <div>
            name
            <input 
              value = {name}
              onChange = {({target})=>setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type = 'number'
              value = {born}
              onChange = {({target})=> setBorn(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>   
      </div>
    </div>
  
  )
}

export default Authors