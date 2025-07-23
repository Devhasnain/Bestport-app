import { TabBar, UserGreeting } from '@components/index';
import React from 'react';

import InProgress from './InProgress';
import Completed from './Completed';
import Assigned from './Assigned';


const tabs = [
  {
    title: 'Assigned',
    component: <Assigned />,
  },
  {
    title: 'In progress',
    component: <InProgress />,
  },
  {
    title: 'Completed',
    component: <Completed />,
  },
];

const EmployeeHome = () => {
  return (
    <>
      <UserGreeting />
      <TabBar tabs={tabs} />
    </>
  );
};

export default EmployeeHome;
