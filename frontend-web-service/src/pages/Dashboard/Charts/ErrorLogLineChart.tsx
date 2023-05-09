import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TooltipContainer } from './styles'

interface ErrorLogLineChartProps {
  errorLog: any[]
}

export default function ErrorLogLineChart({ errorLog }: ErrorLogLineChartProps) {

  const convertErrorLogToChartData = () => {
    const errorLogSorted = sortErrorLogByTimestamp(errorLog)
    const errorDataForChart = errorLogSorted.map((item: any) => {
      return {
        timestamp: `${item.createdAt.split('T')[0]} ${item.createdAt.split('T')[1].split('.')[0]}`,
        amount: item.leakedData.length,
        routeName: item.routeName,
        level: item.level
      }
    })

    return errorDataForChart
  }

  const sortErrorLogByTimestamp = (errorLogDataArray: any[]) => {
    const errorLogSorted = errorLogDataArray.sort((a: any, b: any) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

    return errorLogSorted
  }

  const formatYAxisTick = (value: number) => {
    return Math.floor(value).toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipContainer
          className="custom-tooltip"
          level={payload[0].payload.level}
        >
          <p>{`API Route: ${payload[0].payload.routeName}`}</p>
          <p>{`Leaked Data Count: ${payload[0].value}`}</p>
          <p>{`Level: ${payload[0].payload.level}`}</p>
          <p>{`Timestamp: ${label}`}</p>
        </TooltipContainer>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={400} data={convertErrorLogToChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
          dataKey="timestamp"
          label={<div style={{ marginTop: '100px' }}>Timestamp</div>}
        />
      <YAxis tickFormatter={formatYAxisTick}  interval={1}/>
      <Tooltip content={CustomTooltip}/>

      <Legend />
      <Line type="monotone" dataKey="amount" name="Leaked Data" stroke="#33aea2" dot={true} isAnimationActive={false} activeDot={{ r: 8 }} />
    </LineChart>
    </ResponsiveContainer>
  )
}
