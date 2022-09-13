import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet,} from 'react-native'
import { OriginContextProvider,DestinationContextProvider, ServiceContextProvider } from './src/contexts/contexts'
import RoootNavigator from './src/navigations/RootNavigator'



const App = () => {
  return (
  <DestinationContextProvider>
    <OriginContextProvider>
      <ServiceContextProvider>
      
        <RoootNavigator />
        </ServiceContextProvider>
    </OriginContextProvider>
   </DestinationContextProvider>

  )
}

export default App

const styles = StyleSheet.create({

container:{
  flex:1
}
})