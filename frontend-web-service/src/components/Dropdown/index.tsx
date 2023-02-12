import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { DropdownStyledComponent } from './styles';

interface DropdownProps {
  itemsList: string[]
  direction: Direction
  setItem: Dispatch<SetStateAction<string>>
  item: string
}

export default function DropdownComponent(props: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onClickItem = useCallback((item: string) => {
    props.setItem(item)
  }, [])

  return (

  )
}
