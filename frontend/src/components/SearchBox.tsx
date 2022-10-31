import React, { FC, useState, useEffect } from 'react';
import './SearchBox.less';

import { Input } from 'antd';
import { Tag } from 'antd';
const { Search } = Input;

interface SearchBoxProps {
  onSearchHandler: (keywords: string[]) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearchHandler }) => {
  const [searchValue, setSearchValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    setKeywords(searchValue.split(' '));
  }, [searchValue]);

  return (
    <div id="SearchBox">
      <Search
        value={searchValue}
        placeholder="Example: Mobility iPhone Skype..."
        enterButton="Search"
        size="large"
        onSearch={(value: string) => onSearchHandler(keywords)}
        onChange={(e) => setSearchValue(e.target.value)}
        // onKeyDown={onSpace}
      />
      <div className="keywords">
        {keywords?.map((word, i) => {
          if (word != '')
            return (
              <Tag key={i} color="#2438c3">
                {word}
              </Tag>
            );
        })}
      </div>
    </div>
  );
};
