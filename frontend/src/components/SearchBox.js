import React from 'react';
import './SearchBox.less';

import { Input } from 'antd';
const { Search } = Input;



export const SearchBox = () => {

  const onSearch = value => console.log(value);
  const onChange = e => console.log(e.target.value);

  return (
    <div id='SearchBox'>
      <Search
      placeholder="input keywords"
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={onChange}
    />
    </div>
  );
};