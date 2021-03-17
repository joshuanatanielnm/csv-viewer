import { Grid, ScrollSync } from 'react-virtualized'
import React, { useState } from 'react'

import CSVReader from 'react-csv-reader'
import HalfTableComponent from '../components/half-table'
import ViewColumn from '../components/view-column'

const Screen2 = () => {
  const [firstDataTable, setFirstDataTable] = useState()
  const [secondDataTable, setSecondDataTable] = useState()
  const [firstKeyTable, setFirstKeyTable] = useState([])
  const [secondKeyTable, setSecondKeyTable] = useState([])
  const [{ firstvColumn, secondvColumn }, setVColumn] = useState({
    firstvColumn: false,
    secondvColumn: false,
  })
  // const [firstvColumn, setFirstvColumn] = useState(false)
  // const [secondvColumn, setSecondvColumn] = useState(false)

  const handleFirstTable = (data) => {
    setFirstDataTable(data)
    setFirstKeyTable(Object.keys(data[0]))
  }

  const handleSecondTable = (data) => {
    setSecondDataTable(data)
    setSecondKeyTable(Object.keys(data[0]))
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  return (
    <ScrollSync>
      {({
        clientHeight,
        clientWidth,
        onScroll,
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth,
      }) => (
        <div>
          <CSVReader
            cssClass='react-csv-input'
            label='Upload first CSV Files'
            onFileLoaded={handleFirstTable}
            parserOptions={papaparseOptions}
          />
          {firstDataTable && (
            <button
              onClick={() =>
                setVColumn((currentState) => ({
                  ...currentState,
                  firstvColumn: true,
                }))
              }
            >
              View column table 1
            </button>
          )}
          <span style={{ margin: 10 }} />
          <CSVReader
            cssClass='react-csv-input'
            label='Upload second CSV Files'
            onFileLoaded={handleSecondTable}
            parserOptions={papaparseOptions}
          />
          {secondDataTable && (
            <button
              onClick={() =>
                setVColumn((currentState) => ({
                  ...currentState,
                  secondvColumn: true,
                }))
              }
            >
              View column table 2
            </button>
          )}

          <div style={{ display: 'flex' }}>
            {firstDataTable && (
              <HalfTableComponent
                items={firstDataTable}
                keys={firstKeyTable}
                onScroll={onScroll}
                scrollTop={scrollTop}
                scrollHeight={scrollHeight}
              />
            )}
            <span style={{ marginLeft: '50%' }} />
            {secondDataTable && (
              <HalfTableComponent
                items={secondDataTable}
                scrollHeight={scrollHeight}
                keys={secondKeyTable}
                onScroll={onScroll}
                scrollTop={scrollTop}
              />
            )}
          </div>

          {firstvColumn && (
            <ViewColumn
              setVColumn={setVColumn}
              items={firstDataTable}
              setKeys={setFirstKeyTable}
              keys={firstKeyTable}
            />
          )}
          {secondvColumn && (
            <ViewColumn
              setVColumn={setVColumn}
              items={secondDataTable}
              setKeys={setSecondKeyTable}
              keys={secondKeyTable}
            />
          )}
        </div>
      )}
    </ScrollSync>
  )
}

export default Screen2
