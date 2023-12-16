import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../explore/pages/all/style';
import { SearchBox } from './search-box';
import { Navigator } from './navigator';
import { SearchWindow } from './search-window';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const { ContainerStyles } = ImagesPageComponents;

export type SearchParam = {
  type: 1 | 2 | 3 | 4;
  plan?: string;
  name?: string;
  tag?: string;
};

export function SearchPage() {
  const [showSearchWindow, setShowSearchWindow] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParam>({
    type: null,
    plan: null,
    name: null,
    tag: null,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (searchParams?.tag || searchParams?.name || searchParams?.plan) {
      setShowSearchWindow(false);
    }
  }, [searchParams]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {isFocused ? <StatusBar backgroundColor={'#0c0c21'} barStyle="light-content" /> : null}
        <LinearGradient
          style={[ContainerStyles]}
          colors={['#030340', '#030340']}
          start={{ x: 0.7, y: 0 }}
        >
          <>
            {showSearchWindow ? (
              <SearchWindow setSearch={setSearchParams} />
            ) : (
              <SearchBox defaultSearchParams={searchParams} setSearch={setSearchParams} />
            )}
            <Navigator searchParams={searchParams} />
          </>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}
