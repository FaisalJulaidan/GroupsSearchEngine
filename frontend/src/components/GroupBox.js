import React, { useState } from 'react';
import './GroupBox.less';

import { Tag } from 'antd';
import { Skeleton } from 'antd';

import {
  PhoneTwoTone,
  MailTwoTone,
} from '@ant-design/icons';

export const GroupBox = () => {

  const [loading, setLoading] = useState(false); // Searching?

  return (
    <div id='GroupBox'>
      {loading ? <Skeleton active /> :
        <>
          <div className='top'>
            <div className='title'>
              <h2><b>Mobility Support Group</b></h2>
              <span>8 Members</span>
            </div>

            <div className='leader'>
              <p><b>Leader:</b> Jed Mcleb</p>
            </div>
          </div>

          <div className='content'>
            <p><b>Group Description</b></p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen </p>
          </div>

          <div className='bottom'>
            <div className='keywords'>
              <p><b>Keywords</b></p>
              <div>
                <Tag color='#2438c3'>Skype</Tag>
                <Tag color='#2538c391'>Mobility</Tag>
                <Tag color='#2538c391'>AirWatch</Tag>
                <Tag color='#2538c391'>DaaS</Tag>
              </div>
            </div>
            <div className='shortcut-icons'>
              <PhoneTwoTone twoToneColor='#2438c3' />
              <MailTwoTone twoToneColor='#2438c3' />
            </div>
          </div>
        </>
      }
    </div>
  );
};