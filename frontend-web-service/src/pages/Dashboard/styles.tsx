import { Card } from 'antd';
import { HTMLAttributes } from 'react';
import { LineChart } from 'recharts';
import styled, { ThemeProps } from 'styled-components';

interface DataApiProps extends HTMLAttributes<HTMLDivElement>, ThemeProps<any> {
  methodColor?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
}


const ApiContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #27293D;
  color: white;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  div {
    display: flex;
    align-items: center;
    Input {
      margin-right: 1rem;
    }    
  }
`

const CardItem = styled(Card)`
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  margin-right: 1rem;
  width: 300;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const CardValue = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
`



const LabelApi = styled.div`
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0 0 0.5rem 0;
`

const DataApi = styled.div<DataApiProps>`
  background: ${({ methodColor }) => {
    if(!methodColor) {
      return 'rgba(173, 173, 173, 0.3)'
    } else if (methodColor === 'POST') {
      return '#3D9A50';
    } else if (methodColor === 'DELETE') {
      return '#E5484D';
    } else if (methodColor === 'PUT' || methodColor === 'PATCH') {
      return '#F76808';
    } else {
      return '#05A2C2';
    }
  }};
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0 0 0.5rem 0;
`

const ApiSearchContainer = styled.div`
    display: flex;
    align-items: center;
    Input {
      margin-right: 1rem;
    }      
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #27293D;
  color: white;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
`

const ErrorData = styled.div`
  display: flex;
  justify-content: space-between;
`

const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  min-width: 150px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-left: 1rem;
  div {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    margin: 0.5em 0 1em 0;
  }
  h4 {
    color: #7CD4C0;
    margin: 0 0 0.5rem 0;
  }
`

const ErrorLogCard = styled.div`
  display: flex;
  font-family: sans-serif;
  border-radius: 10px;
  background: white;
  max-height: 150px;
  overflow: auto;
  color: black;
  margin: 1rem 0 0 0;
  flex-direction: column;
  div {
    background: #ffffff;
    border: 1px outset #000000;
    padding: 0.5rem;
  }

`

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const CommonErrorContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 10px;
  margin: 0 0 1.5rem 0;
`

export {
  ApiContainer,
  ApiSearchContainer,
  CardItem,
  LabelApi,
  DataApi,
  CardValue,
  ErrorContainer,
  ErrorCard,
  ErrorData,
  GraphContainer,
  ErrorLogCard,
  CommonErrorContainer
}