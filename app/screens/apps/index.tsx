import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../../layout/search-bar";
import { Navigator } from "./topbar-navigator";

export function AppsStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar />
            <Navigator />
        </SafeAreaView>
    )
}