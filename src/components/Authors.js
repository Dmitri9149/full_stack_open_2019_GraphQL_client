import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';





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

  const Authors = props.authors.data.allAuthors.map(a => {
    const container = {}
    container.label = a.name
    container.value = a.name
    return container
  })

  const handleChange = (selectedOption)=> {
    console.log(selectedOption.value)
    setName(selectedOption.value)
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
        <div style={{width: '300px'}}>
            <Select 
              options={Authors}
              onChange = {handleChange}
            />
          </div>
        <form onSubmit = {submit}>
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