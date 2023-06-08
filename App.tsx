import 'react-native-gesture-handler';
import { AlertContextProvider } from './app/context/alert';
import { TokenContextProvider } from './app/context/token';
import { RootNavigator } from './root-navigator';
export default function App() {
    return (
        <TokenContextProvider>
            <AlertContextProvider>
                <RootNavigator />
            </AlertContextProvider>
        </TokenContextProvider>
    );
}
