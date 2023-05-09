import { Button, Card, Form, Input, Radio } from 'antd'
import { ReactEventHandler, useState } from 'react'
import { CardFilter, FilterContainer } from './styles'

interface FilterComponentProps {
  handleGetErrorLogs: (filter: any) => Promise<void>
  filter: IErrorFilter,
  setFilter: React.Dispatch<React.SetStateAction<IErrorFilter>>
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

export default function FilterComponent({ handleGetErrorLogs, filter, setFilter }: FilterComponentProps) {

  const onChangeFilter = (e: any) => {
    console.log(e.target.name)
  }
  
  const getDateTime = (dateTime: string) => {
    const date = {
      '30 minutes': '30m',
      '2 hours': '2h',
      '24 hours': '24h',
      '30 days': '30d'
    } as IDateTimes

    return date[dateTime]
  }

  return (
    <FilterContainer>
      <CardFilter
        bordered={false}
      >
        <div>
          <h4>Last: </h4>
          <Radio.Group onChange={onChangeFilter} defaultValue={1}>
            <Radio value={1}>30 minutes</Radio>
            <Radio value={3}>2 hours</Radio>
            <Radio value={4}>24 hours</Radio>
            <Radio value={5}>30 days</Radio>
          </Radio.Group>
        </div>
        <div>
          <h4>Route info: </h4>
          <Form>
            <Form.Item>
              <Input placeholder="Route Name" name="routeName" onChange={onChangeFilter}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder="Route Id" name="routeId" onChange={onChangeFilter}/>
            </Form.Item>
          </Form>
        </div>
        <div>
          <p>Level: </p>
          <Radio.Group onChange={onChangeFilter}>
            <Radio value={0}>All</Radio>
            <Radio value={1}>Low</Radio>
            <Radio value={2}>Medium</Radio>
            <Radio value={3}>High</Radio>
          </Radio.Group>
        </div>
        <div className="button">
          <Button type="primary" onClick={() => handleGetErrorLogs(filter)}>Confirm</Button>
        </div>
      </CardFilter>
    </FilterContainer>
  )
}
