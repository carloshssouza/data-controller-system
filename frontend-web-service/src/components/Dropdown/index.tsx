import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import { Direction } from 'reactstrap/types/lib/Dropdown';
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
    <DropdownStyledComponent >
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={props.direction}>
        <DropdownToggle caret>{props.item ? props.item : 'Request type'}</DropdownToggle>
        <DropdownMenu>
          {props.itemsList.map((item: string) => {
            return (
              //change the select item color
              <DropdownItem
              className="border"
                onClick={() => onClickItem(item)}
              >{item}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>
    </DropdownStyledComponent>
  )
}
