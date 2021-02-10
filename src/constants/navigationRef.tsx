import { createRef } from 'react';

const navigationRef:any = createRef();

export function navigate(name:string) {
  navigationRef.current?.navigate(name);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export default navigationRef;