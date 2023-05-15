import { FilterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import FilterComponent from '../FilterComponent/FilterComponent'

interface FilterButtonComponentProps {
  handleGetErrorLogsFilter: (filter: any) => Promise<void>
}

export default function FilterButtonComponent({ handleGetErrorLogsFilter }: FilterButtonComponentProps ) {
  const [cardFilter, setCardFilter] = React.useState<boolean>(false)

  const showCardFilter = () => {
    setCardFilter(prev => !prev)
  }

  return (
    <>
       <Button type="primary" style={{ fontWeight: 'bold', marginLeft: '1rem' }} onClick={showCardFilter}>
        Filters
        <FilterOutlined />
      </Button>
      {
        cardFilter && (
          <FilterComponent handleGetErrorLogs={handleGetErrorLogsFilter} />
        )
      }
    </>
  )
}
