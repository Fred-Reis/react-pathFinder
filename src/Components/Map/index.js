import React, { Component } from 'react';
import './styles.css'

export default class Map extends Component {
  render() {
    return (
      <div style={{ background: 'transparent' }}>
        <div className='americanas' />
        <div className='americanas-border' />

        <div className='loja' />
        <div className='loja-border' />

        <div className='loja-a' />
        <div className='loja-a-border' />

        <div className='loja-b' />
        <div className='loja-b-border' />

        <div className='loja-c' />
        <div className='loja-c-border' />

        <div className='loja-d' />
        <div dlassName='loja-d-border' />
      </div>
    );
  }
}

