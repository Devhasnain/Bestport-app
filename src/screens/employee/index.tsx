import { TabBar, UserGreeting } from '@components/index';
import React from 'react';

import DynamicTab from './DynamicTab';
import Assigned from './Assigned';


const tabs = [
  {
    title: 'Assigned',
    component: <Assigned />,
  },
  {
    title: 'In progress',
    component: <DynamicTab status='in_progress' />,
  },
  {
    title: 'Completed',
    component: <DynamicTab status='completed' />,
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
