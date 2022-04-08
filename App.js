import React from 'react';
import { NativeBaseProvider } from 'native-base';

import RootStack from './navigation/RootStack';

export default function App() {
    return (
    <NativeBaseProvider>
      <RootStack/>
    </NativeBaseProvider>
    );
  }
