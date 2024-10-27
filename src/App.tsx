import { Provider } from "react-redux";
import RootNavigator from "./navigation/RootNavigator";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <Toaster position="top-center" />
      </PersistGate>
    </Provider>
  )
}

export default App
