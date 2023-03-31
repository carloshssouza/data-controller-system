import React from 'react'
import { ConfigurationItemRestrictData, RestrictDataCard, RestrictDataContainer } from './styles'

interface IRestrictDataList {
  personal: string[]
  sensible: string[]
}

interface RestrictDataItemProps {
  restrictDataList: IRestrictDataList | undefined
}

export default function RestrictDataItem({ restrictDataList }: RestrictDataItemProps) {
  return (
    <ConfigurationItemRestrictData>
      <h2>Restrict Data List</h2>
      <RestrictDataContainer>
        <RestrictDataCard>
          <h3>Personal:</h3>
          {
            restrictDataList?.personal.map((item: string) => {
              return <div>{item}</div>
            })
          }
        </RestrictDataCard>
        <RestrictDataCard>
          <h3>Sensible:</h3>
          {
            restrictDataList?.sensible.map((item: string) => {
              return <div>{item}</div>
            })
          }
        </RestrictDataCard>
      </RestrictDataContainer>
    </ConfigurationItemRestrictData>
  )
}
