import style from './style.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import { GlobalContext } from '../../Contexts/GlobalContext';
import API from '../../Utilities/API';

export default function RightDrawer({ className }) {
  return <div className={`${className} rightTrack`}></div>;
}
