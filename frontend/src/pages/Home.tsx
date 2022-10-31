import React, { FC, useState } from 'react';
import './Home.less';
import { SearchBox, GroupBox } from '../components';
import { group } from '../types';
import axios from 'axios';

export const Home: FC = () => {
  const [groups, setGroups] = useState<group[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const onSearchHandler = (keywords: string[]) => {
    setKeywords(keywords);

    // remove empty strings and convert the array to strings split by comma
    const keywordsString: string = keywords
      .filter((key) => key !== '')
      .join(',');

    // make search API call
    axios
      .get(`/search?keywords=${keywordsString}`, {
        responseType: 'json',
      })
      .then(function (response) {
        console.log('success: ', response);
        // sort groups based on score before setting the state
        setGroups(
          response.data.sort((a: group, b: group) =>
            a.score < b.score ? 1 : -1,
          ),
        );
      })
      .catch(function (error) {
        console.log('error: ', error);
      });
  };

  return (
    <div id="Home">
      <h2>
        Search Groups by <span>Keywords</span>
      </h2>
      <SearchBox onSearchHandler={onSearchHandler} />
      {groups.map((group, i) => {
        return <GroupBox key={i} group={group} searchedKeywords={keywords} />;
      })}
    </div>
  );
};
