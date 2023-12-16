import { BackHandler } from 'react-native';
import { APP_STACK, REDIRECTED_FROM_CREATE_ASSET } from '../../../constaints/consts';
import { UseNavigationType } from '../../../types/use-navigation';
import { PROFILE } from '../../explore/types';

export class BackButtonRedirector {
  navigation: UseNavigationType = null;

  setup({ navigation }: { navigation: UseNavigationType }) {
    this.navigation = navigation;
  }

  addListener(ORIGIN: string, _navigation: UseNavigationType) {
    if (ORIGIN && ORIGIN === REDIRECTED_FROM_CREATE_ASSET) {
      BackHandler.addEventListener('hardwareBackPress', () =>
        this._deviceBackButtonClickHandler(_navigation),
      );
    }
  }

  cleanup(_navigation: UseNavigationType) {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this._deviceBackButtonClickHandler(_navigation),
    );
  }

  _deviceBackButtonClickHandler(_navigation: UseNavigationType) {
    _navigation?.navigate(APP_STACK, { screen: PROFILE });
    return true;
  }
}
