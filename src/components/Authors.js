import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { Component } from 'react';
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

  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];

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
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Select options={Authors} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  
  )
}

export default Authors