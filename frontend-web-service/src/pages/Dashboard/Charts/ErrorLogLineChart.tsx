import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TooltipContainer } from './styles'
import { format } from 'date-fns'

interface ErrorLogLineChartProps {
  errorLog: any[]
}

export default function ErrorLogLineChart({ errorLog }: ErrorLogLineChartProps) {
  console.log(errorLog)
  const convertErrorLogToChartData = () => {
    const errorDataForChart = errorLog.map((item: any) => {
      return {
        timestamp: `${item.createdAt.split('T')[0]} ${item.createdAt.split('T')[1].split('.')[0]}`,
        amount: item.leakedData.length,
        routeName: item.routeName,
        level: item.level
      }
    })

    return errorDataForChart
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
    
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={600}
          height={400}
          data={convertErrorLogToChartData()}

          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={(props) => (
              <g transform={`translate(${props.x},${props.y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  fontSize={12}
                  fontWeight="bold"
                  textAnchor="end"
                  fill="#858585"
                  className="axis-label"
                >
                  {props.payload.value.split(' ')[0]}
                </text>
                <text
                  x={0}
                  y={0}
                  dy={32}
                  fontSize={13}
                  textAnchor="end"
                  fill="#858585"
                  className="axis-label"
                >
                  {props.payload.value.split(' ')[1]}
                </text>
              </g>
            )}
            tickFormatter={(value: string) => {
              return format(new Date(value), 'yyyy-MM-dd HH:mm:ss')
            }}
            interval={0}
            textAnchor='end'
          />
          <YAxis tickFormatter={formatYAxisTick} interval={0} />
          <Tooltip content={CustomTooltip} />

          <Legend height={10} wrapperStyle={{ paddingTop: '0.7rem', fontWeight: 'bold' }}/>
          <Line type="monotone" dataKey="amount" name="Leaked Data" stroke="#33aea2" dot={true} isAnimationActive={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
  )
}
