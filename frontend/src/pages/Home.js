import React from 'react';
import './Home.less'
import { SearchBox, GroupBox } from '../components';

export const Home = () => {

  return (
    <div id='Home'>
      <h2>Search Groups by <span>Keywords</span></h2>
      <SearchBox />
      <GroupBox />
    </div>
  );
};