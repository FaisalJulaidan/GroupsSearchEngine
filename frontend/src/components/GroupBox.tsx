import React, { useState } from 'react';
import './GroupBox.less';
import { group } from '../types';

import { Skeleton, Tag } from 'antd';

import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

interface GroupBoxProps {
  group: group;
  searchedKeywords: string[];
}

export const GroupBox: React.FC<GroupBoxProps> = ({
  group,
  searchedKeywords,
}) => {
  const [loading, setLoading] = useState(false); // Searching?

  return (
    <div id="GroupBox" className="fade">
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="top">
            <div className="title">
              <h2>
                <b>{group.name}</b>
              </h2>
              <span>8 Members</span>
            </div>

            <div className="leader">
              <p>
                <b>Leader:</b> Jed Mcleb
              </p>
            </div>
          </div>

          <div className="content">
            <p>
              <b>Group Description</b>
            </p>
            <p>{group.description}</p>
          </div>

          <div className="bottom">
            <div className="keywords">
              <p>
                <b>Keywords</b>
              </p>
              <div>
                {group.keywords.split(',')?.map((word, i) => {
                  return (
                    <Tag
                      key={i}
                      color={
                        searchedKeywords.find((sk) =>
                          sk.toLowerCase().includes(word.trim().toLowerCase()),
                        )
                          ? '#2438c3'
                          : '#2538c391'
                      }
                    >
                      {word.trim()}
                    </Tag>
                  );
                })}
              </div>
            </div>
            <div className="shortcut-icons">
              <PhoneTwoTone twoToneColor="#2438c3" />
              <MailTwoTone twoToneColor="#2438c3" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
