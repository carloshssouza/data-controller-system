import { Button, Card, Form, Input, Radio } from 'antd'
import {  useCallback, useEffect, useState } from 'react'
import { CardFilter, FilterContainer } from './styles'

interface FilterComponentProps {
  handleGetErrorLogs: (filter: any) => Promise<void>
}

interface IDateTimes {
  [key: string]: string
}

export interface IErrorFilter {
  dateTime: string
  routeName: string
  routeId: string
  level: string[]
}

export default function FilterComponent({ handleGetErrorLogs }: FilterComponentProps) {

  const [filter, setFilter] = useState({
    dateTime: '30m',
    routeName: '',
    routeId: '',
    level: ['low', 'medium', 'high']
  })


  const radioItems = [
    {
      key: 1,
      value: '30m',
      label: '30 minutes'
    },
    {
      key: 2,
      value: '2h',
      label: '2 hours'
    },
    {
      key: 3,
      value: '24h',
      label: '24 hours'

    },
    {
      key: 4,
      value: '30d',
      label: '30 days'
    }
  ]

  const radioLevelItems = [
    {
      key: 0,
      value: 'all',
      label: 'All'
    },
    {
      key: 1,
      value: 'low',
      label: 'Low'
    },
    {
      key: 2,
      value: 'medium',
      label: 'Medium'
    },
    {
      key: 3,
      value: 'high',
      label: 'High'
    }
  ]

  const onChangeFilterDateTime = useCallback((e: any) => {
    setFilter((prev) => ({
      ...prev,
      dateTime: getDateTime(e.target.value) as string
    }))
  }, [])

  const onChangeFilterLevel = useCallback((e: any) => {
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      level: getLevel(value) as string[]
    }))
  }, [])

  const onChangeFilter = useCallback((e: any) => {
    const { name, value } = e.target
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])
  
  const getDateTime = (key: number) => {
    const dateChoose = radioItems.find(item => item.key === key)
    return dateChoose?.value
  }

  const getLevel = (key: number) => {
    const levelChoose = radioLevelItems.find(item => item.key === key)
    if(levelChoose?.value === 'all') return ['low', 'medium', 'high']
    return [levelChoose?.value]
  }

  return (
    <FilterContainer>
      <CardFilter
        bordered={false}
      >
        <div>
          <h4>Last: </h4>
          <Radio.Group onChange={onChangeFilterDateTime} defaultValue={1}>
            <Radio value={1}>30 minutes</Radio>
            <Radio value={2}>2 hours</Radio>
            <Radio value={3}>24 hours</Radio>
            <Radio value={4}>30 days</Radio>
          </Radio.Group>
        </div>
        <div>
          <h4>Route info: </h4>
          <Form>
            <Form.Item>
              <Input placeholder="Route Name" name="routeName" defaultValue={filter.routeName} onChange={onChangeFilter}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder="Route Id" name="routeId" defaultValue={filter.routeId} onChange={onChangeFilter}/>
            </Form.Item>
          </Form>
        </div>
        <div>
          <p>Level: </p>
          <Radio.Group onChange={onChangeFilterLevel} defaultValue={0}>
            <Radio value={0}>All</Radio>
            <Radio value={1}>Low</Radio>
            <Radio value={2}>Medium</Radio>
            <Radio value={3}>High</Radio>
          </Radio.Group>
        </div>
        <div className="button">
          <Button type="primary" onClick={() => {
            handleGetErrorLogs(filter)
          }}>Confirm</Button>
        </div>
      </CardFilter>
    </FilterContainer>
  )
}
