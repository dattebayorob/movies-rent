import React from 'react';
import { Label } from '../../model';
import Form from 'react-bootstrap/Form';

interface Props {
  value: Label,
  items: Label[],
  onChange: ( people: Label) => void
}

export const PeopleSelect = ({items, value, ...props }: Props) => {
  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const item = items.find( item => item.id === Number(target.value));
    if ( item ) {
      props.onChange(item);
    }
  }
  return (
    <Form.Control as="select" value={`${value.id}`} onChange={onChange}>
      <option>Selecione...</option>
      { items.map( 
        item => <option key={`${item.id}-${item.name}`}value={`${item.id}`}>{item.name}</option>
      )}
    </Form.Control>
  )
}