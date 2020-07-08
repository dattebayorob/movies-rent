import React from 'react';
import { useApp } from "../hooks"
import Spinner from 'react-bootstrap/Spinner';
import './loading.css';

export const Loading = () => {
  const { isLoading } = useApp();

  if ( !isLoading ) return null;

  return (
    <div className='loading'>
        <Spinner animation="border" variant="primary" />
    </div>
  )

}