import { CommonActions, createNavigationContainerRef, StackActions, } from '@react-navigation/native';

import { RootStackParamList } from '../types';


export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  );
}

export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    StackActions.replace(name, params)
  );
}

export function reset<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function getCurrentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}

