import { Navigator } from './bottom-tab-navigator';
import { CustomSafeArea } from '../../components/custom-safe-area';

export function PlusScreen() {
  
  console.log('2', 'PLUS_CONSOLE')
  return (
    <CustomSafeArea>
      <Navigator />
    </CustomSafeArea>
  );
}
