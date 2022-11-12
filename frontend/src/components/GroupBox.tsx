import React, { useState } from 'react';
import './GroupBox.less';

import { GroupType } from '../types';
import { Member } from './Member';

import { Skeleton, Tag, Popover } from 'antd';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

interface GroupBoxProps {
  group: GroupType;
  searchedKeywords: string[];
}

export const GroupBox: React.FC<GroupBoxProps> = ({
  group,
  searchedKeywords,
}) => {
  const [loading, setLoading] = useState(false); // Searching?

  const membersList = [
    {
      name: 'Faisal Julaidan',
      title: 'Software Engineer',
      email: 'faisal.julaidan@aramco.com',
    },
    {
      name: 'Omar Alharbi',
      title: 'Cyber-security Specialist',
      email: 'omar.alharbi@aramco.com',
    },
  ];
  const members = (
    <>
      <Member member={membersList[0]} />
      <Member member={membersList[1]} />
    </>
  );

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
              <Popover
                placement="left"
                title={'Members'}
                content={members}
                trigger="click"
              >
                <span>8 Members</span>
              </Popover>
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
