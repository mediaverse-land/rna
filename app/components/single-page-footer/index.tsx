import { Image, View } from 'react-native';
import { SinglePageFooterComponents } from './style';
import { RowAlignCenter } from '../../styles/grid';
import { imageUriResolver } from '../../utils/image-uri-resolver';
import ICON_EYE_PNG from './../../../../assets/icons/icon__eye.png';
import ICON_MUSIC_PNG from './../../../../assets/icons/icon__music.png';
import ICON_PLAY_MUSIC_PNG from './../../../../assets/icons/icon__play-music.png';
import ICON_SHARE_PNG from './../../../../assets/icons/icon__share.png';

const ICON_EYE = imageUriResolver(ICON_EYE_PNG);
const ICON_MUSIC = imageUriResolver(ICON_MUSIC_PNG);
const ICON_PLAY_MUSIC = imageUriResolver(ICON_PLAY_MUSIC_PNG);
const ICON_SHARE = imageUriResolver(ICON_SHARE_PNG);

export function SinglePageFooter() {
  return (
    <SinglePageFooterComponents.FooterWrapper>
      <RowAlignCenter style={{ justifyContent: 'space-between' }}>
        <View>
          <SinglePageFooterComponents.BuyText>Monthly: 20$</SinglePageFooterComponents.BuyText>
          <RowAlignCenter>
            <Image source={{ uri: ICON_EYE }} style={SinglePageFooterComponents.firstImageStyles} />
            <Image
              source={{ uri: ICON_MUSIC }}
              style={SinglePageFooterComponents.restImagesStyles}
            />
            <Image
              source={{ uri: ICON_PLAY_MUSIC }}
              style={SinglePageFooterComponents.restImagesStyles}
            />
            <Image
              source={{ uri: ICON_SHARE }}
              style={SinglePageFooterComponents.restImagesStyles}
            />
          </RowAlignCenter>
        </View>
        <View>
          <SinglePageFooterComponents.CtaButton>
            <SinglePageFooterComponents.CtaButtonText>Buy</SinglePageFooterComponents.CtaButtonText>
          </SinglePageFooterComponents.CtaButton>
        </View>
      </RowAlignCenter>
    </SinglePageFooterComponents.FooterWrapper>
  );
}
