import React, { useEffect, useState } from 'react'

import styles from './view-column.module.css'

const ViewColumn = ({ setVColumn, items, setKeys, keys }) => {
  console.log(setVColumn)
  const [data, setData] = useState([])
  const [difference, setDifference] = useState([])

  useEffect(() => {
    setData(Object.keys(items[0]))
  }, [items, setData])

  useEffect(() => {
    setDifference(Object.keys(items[0]).filter((x) => !keys.includes(x)))
  }, [keys])

  const handleChanges = (val, cek) => {
    const tes = data.indexOf(val)
    if (!cek) {
      setKeys(keys.filter((key) => key != val))
    } else {
      keys.splice(data.indexOf(val), 0, val)
    }
  }

  return (
    <div id='myModal' className={styles.modal}>
      <div className={styles.modalcontent}>
        <span className={styles.close} onClick={() => setVColumn(false)}>
          &times;
        </span>
        {items ? (
          data.map((value, index) => (
            <div key={index}>
              <input
                type='checkbox'
                id={value}
                value={value}
                name={value}
                defaultChecked={!difference.includes(value)}
                onChange={(e) =>
                  handleChanges(e.target.value, e.target.checked)
                }
              />
              <label htmlFor={value}>{value}</label>
            </div>
          ))
        ) : (
          <div>Harap upload file csv</div>
        )}
      </div>
    </div>
  )
}
export default ViewColumn
