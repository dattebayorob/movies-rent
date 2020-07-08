import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';


type Props<T = { [key:string]: any }> = {
  items: T[],
  selectedItems: T[],
  itemKey:keyof T,
  itemLabel: keyof T,
  onChange: (selectedItems: T[]) => void,
  name: string
}

export const CheckList = <T,>({items, selectedItems, itemKey, itemLabel, onChange: propsOnchange }: Props<T>) => {
  const isSelected = ( item: T ) => (
    selectedItems.some( selectedItem => selectedItem[itemKey] === item[itemKey] )
  );

  const isItemEquals = (name:string) => (item: T) => String(item[itemKey]) === name;
  const isItemNotEquals = (name:string) => (item: T) => !isItemEquals(name)(item);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    if (!target.checked) {
      propsOnchange(selectedItems.filter(isItemNotEquals(target.name)));
      return;
    }

    const item = items.find(isItemEquals(target.name));
    if ( item ) {
      propsOnchange([ ...selectedItems, item ])
    } 
  }

  return (
    <Row>
      { items.map( item => (
          <div
            className='p-2 w-20'
            key={`${item[itemKey]}-${item[itemLabel]}`}>
            <Form.Check 
              type={'checkbox'}
              name={`${item[itemKey]}`}
              checked={isSelected( item )}
              onChange={onChange}
              id={`${item[itemLabel]}`}
              label={item[itemLabel]} />
          </div>
        ))
      }
    </Row>
  )
}