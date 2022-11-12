import React, { useState } from 'react';
import './Member.less';
import { MemberType } from '../types';

import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

interface MemberProps {
  member: MemberType;
}

export const Member: React.FC<MemberProps> = ({ member }) => {
  return (
    <>
      <div id={'Member'}>
        <Avatar className={'pic'} icon={<UserOutlined />} />
        <div className={'info'}>
          <b>{member.name}</b>
          <span>{member.title}</span>
          <div className="contact-icons">
            <PhoneTwoTone twoToneColor="#2438c3" />
            <MailTwoTone twoToneColor="#2438c3" />
          </div>
        </div>
      </div>
      <Divider style={{ margin: '10px' }} />
    </>
  );
};
