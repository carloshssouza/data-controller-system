import { Card } from 'antd';
import { HTMLAttributes } from 'react';
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
  background: #27293D;
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
  font-size: 18px;
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
  /* background: red; */
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

export {
  ApiContainer,
  ApiSearchContainer,
  CardItem,
  LabelApi,
  DataApi,
  CardValue
}