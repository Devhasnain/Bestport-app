import * as React from 'react';


export const navigationRef: any = React.createRef();
export const navigate = (routeName: string, params?: any) => {
  navigationRef.current?.navigate(routeName, params);
};

export const changeStack = (stackName: any) => {
  resetRoot(stackName);
};

const resetRoot = (routeName: any) => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{ name: routeName }],
  });
};
