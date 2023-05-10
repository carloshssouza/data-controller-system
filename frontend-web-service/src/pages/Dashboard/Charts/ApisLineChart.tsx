import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { generateColor } from '../../../utils/generateColor';

interface ApisLineChartProps {
  errorLog: any[]
}


export default function ApisLineChart({ errorLog }: ApisLineChartProps) {
  const [dataChart, setDataChart] = useState<any>({});

  const handleDataChart = () => {
    const errorDataForChart = errorLog.map((item: any) => {
      return {
        date: item.createdAt.split('T')[0],
        [item.routeName]: item.leakedData.length
      }
    })

    const names = [] as any[]

    for (const item of errorDataForChart) {
      names.push(Object.keys(item)[1])
    }

    const uniqueNames = [...new Set(names)]

    for (const item of errorDataForChart) {
      for (const name of uniqueNames) {
        if (Object.keys(item)[1] !== name) {
          item[name] = 0
        }
      }
    }

    const sortedKeys = Object.keys(errorDataForChart[0])

    const sortedData = errorDataForChart.map(obj => {
      const sortedEntries = Object.entries(obj).sort(([key1], [key2]) => {
        return sortedKeys.indexOf(key1) - sortedKeys.indexOf(key2)
      })
      return Object.fromEntries(sortedEntries)
    })
    return {
      lines: uniqueNames,
      data: sortedData
    }
  }

  useEffect(() => {
    if(errorLog.length) {
      setDataChart(handleDataChart())
    }
  }, [errorLog])

  return (
    <ResponsiveContainer width="100%" height={400}>
       <LineChart width={1000} height={400} data={dataChart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" tick={{fontSize: 1}}/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>
  )
}
