import 'react-virtualized/styles.css'

import {
  AutoSizer,
  Column,
  Grid,
  ScrollSync,
  WindowScroller,
} from 'react-virtualized'
import React, { useEffect, useState } from 'react'

import scrollbarSize from 'dom-helpers/scrollbarSize'
import styles from './table.module.css'

const TableComponent = ({ items, keys }) => {
  const _renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div key={key} style={style}>
        <div
          className={'table-cell'}
          style={{
            textAlign: 'center',
            border: '2px solid black',
            height: '100%',
          }}
        >
          {items[rowIndex][keys[columnIndex]]}
        </div>
      </div>
    )
  }

  const _renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div key={key} style={style}>
        <div
          className={'table-cell'}
          style={{
            textAlign: 'center',
            border: '2px solid black',
            height: '100%',
            fontWeight: 'bold',
            color: 'yellow',
            backgroundColor: 'black',
          }}
        >
          {[keys[columnIndex]]}
        </div>
      </div>
    )
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
        <AutoSizer disableHeight>
          {({ width }) => (
            <div style={{ display: 'block' }}>
              <div>
                <div>
                  <Grid
                    className={styles.HeaderGrid}
                    cellRenderer={_renderHeaderCell}
                    columnCount={keys.length}
                    columnWidth={keys.length * 10}
                    height={30}
                    rowCount={1}
                    rowHeight={30}
                    overscanColumnCount={0}
                    scrollLeft={scrollLeft}
                    width={width}
                  />
                </div>
                <div>
                  <Grid
                    cellRenderer={_renderBodyCell}
                    columnCount={keys.length}
                    columnWidth={keys.length * 10}
                    overscanColumnCount={0}
                    overscanRowCount={5}
                    onScroll={onScroll}
                    height={600}
                    rowCount={items.length}
                    rowHeight={30}
                    width={width}
                  />
                </div>
              </div>
            </div>
          )}
        </AutoSizer>
      )}
    </ScrollSync>
  )
}
export default TableComponent
