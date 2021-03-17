import React, { useEffect, useState } from 'react'

import CSVReader from 'react-csv-reader'
import Head from 'next/head'
import TableComponent from '../components/table'
import TextField from '../components/text-field'
import ViewColumn from '../components/view-column'

export default function Home() {
  const [items, setItems] = useState()
  const [keys, setKeys] = useState([])
  const [query, setQuery] = useState('')
  const [searchData, setSearchData] = useState()
  const [vColumn, setVColumn] = useState(false)

  console.log(keys)

  useEffect(() => {
    setSearchData(search(items))
  }, [query])

  const handleForce = (data) => {
    setItems(data)
    setSearchData(data)
    setKeys(Object.keys(data[0]))
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  const search = (data) => {
    if (!data) return data
    return data.filter((row) =>
      Object.keys(data[0]).some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    )
  }

  return (
    <>
      <div>
        <TextField
          placeholder='Type here to filter results'
          value={query}
          onChange={(val) => setQuery(val)}
        />
      </div>
      {items && <button onClick={() => setVColumn(!vColumn)}>View</button>}
      <CSVReader
        cssClass='react-csv-input'
        label='Upload CSV Files'
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      {searchData && <TableComponent items={searchData} keys={keys} />}
      {vColumn && (
        <ViewColumn
          setVColumn={setVColumn}
          items={items}
          setKeys={setKeys}
          keys={keys}
        />
      )}
    </>
  )
}
