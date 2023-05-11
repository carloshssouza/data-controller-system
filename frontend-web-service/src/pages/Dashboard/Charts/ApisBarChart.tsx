import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { generateColor } from '../../../utils/generateColor'

interface ApisBarChartProps {
  errorLog: any[]
  handleQuantityApiErrors: (id: string) => number
  chartWidth: number
}

export default function ApisBarChart({ errorLog, handleQuantityApiErrors, chartWidth }: ApisBarChartProps) {
  const [dataChart, setDataChart] = useState<any>([])
  const renderComparison = () => {
    const apiNames = errorLog.map((error) => {
      return {
        name: error.routeName,
        id: error.routeId
      }
    })

    const apiNamesWithoutDuplicates = apiNames.filter((obj, index, self) =>
      index === self.findIndex((o) => o.id === obj.id)
    );

    const dataForGraphBar = apiNamesWithoutDuplicates.map((api) => {
      return {
        name: api.name,
        [api.name]: handleQuantityApiErrors(api.id)
      }
    })
    setDataChart(dataForGraphBar)
  }

  const Tick = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#fff">
        {payload.value}
      </text>
    );
  };

  useEffect(() => {
    if (errorLog.length) {
      renderComparison()
    }
  }, [errorLog])

  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 1.0}>
      <BarChart width={400} height={400} data={dataChart} barSize={50}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"
          tick={<Tick />}
          interval={0}
        />
        <YAxis interval={0} />
        <Tooltip cursor={false} />
        <Legend />
        {
          dataChart.length > 0 && dataChart.map((api: any) => (
            <Bar key={api.name} dataKey={api.name} fill={generateColor()} />
          ))
        }
      </BarChart>
    </ResponsiveContainer>
  )
}
