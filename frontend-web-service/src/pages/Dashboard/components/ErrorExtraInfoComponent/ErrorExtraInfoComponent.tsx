import React from 'react'
import { ErrorCard, ErrorData } from './styles'
import { IErrorExtraInfo } from '../../../../interfaces/ErrorLog/interfaces'

interface ErrorExtraInfoComponentProps {
  extraInfo: IErrorExtraInfo
}

export default function ErrorExtraInfoComponent({ extraInfo }: ErrorExtraInfoComponentProps) {
  
  const getAmountErrorPerLevel = () => {
    console.log("extraInfo", extraInfo)
    return (
      <div>
        <div style={{ color: '#F05D5D' }}>High: {extraInfo?.amountPerLevel?.high}</div>
        <div style={{ color: '#FFD81D' }}>Medium: {extraInfo?.amountPerLevel?.medium}</div>
        <div style={{ color: '#7EED79' }}>Low: {extraInfo?.amountPerLevel?.low}</div>
      </div>
    )
  }
  
  return (
    <ErrorData>
      <ErrorCard>
        <div>{extraInfo.total}</div>
        <h4>Total Leak Errors</h4>
      </ErrorCard>
      <ErrorCard>
        {extraInfo.mostLeakedRouteName}
        <h4>Most leaked api</h4>
      </ErrorCard>
      <ErrorCard>
        <div>{extraInfo.mostLeakedDataName}</div>
        <h4>Most leaked data</h4>
      </ErrorCard>
      <ErrorCard>
        {getAmountErrorPerLevel()}
        <h4>Error per level</h4>
      </ErrorCard>
    </ErrorData>
  )
}
