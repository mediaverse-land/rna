import { Image, I18nManager } from 'react-native';
import { AUTH_EMOJY } from '../../../constaints/images';
import { Box } from '../../../shared/components/box';
import { useEffect } from 'react';

export function HeroShapes() {


    return (
        <>
            <Box width="100%" height={400} alignItems="center">
                <Image
                    source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/3e06/b90c/bd0b3d63621acce48273fd25735ffad4?Expires=1685923200&Signature=OK7-movHJAdviBTUaScqrgmK3BizV5J2NL1aApoXd3s3rIXiV5pWe3~6TfNHIBK~awXtDXfz3G8p0j-q59aHXweUtB24jd72bxdSrK-VN5zuueFbQDFnEVQsjhrV9KAlSh5T2c0iVV8L~SVKtFM60qpELW4QJEOFfNd6OKQ83OmwCGKkKItCY53xJG1T7vBCy3TLzbOsksvTMKHv8-epXyDihGRUFHT3PgAuRXJQjd0X4ug8NbXiRU5BK7LucgwAO8mXITrwDSz~cqqtgew1hTVC-DNA38UWcmk7udtn5F6xG3PTT09NMEypxzimE-Fi7ZIuTZiLDJ1t5T3l03yKug__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                    }}
                    style={{
                        width: 200,
                        height: 230,
                        position: 'absolute',
                        right: '-37%',
                        top: 130,
                        transform: [{ rotate: '10deg' }]
                    }}
                />

                <Box>
                    <Image
                        source={{
                            uri: 'https://s3-alpha-sig.figma.com/img/3e06/b90c/bd0b3d63621acce48273fd25735ffad4?Expires=1685923200&Signature=OK7-movHJAdviBTUaScqrgmK3BizV5J2NL1aApoXd3s3rIXiV5pWe3~6TfNHIBK~awXtDXfz3G8p0j-q59aHXweUtB24jd72bxdSrK-VN5zuueFbQDFnEVQsjhrV9KAlSh5T2c0iVV8L~SVKtFM60qpELW4QJEOFfNd6OKQ83OmwCGKkKItCY53xJG1T7vBCy3TLzbOsksvTMKHv8-epXyDihGRUFHT3PgAuRXJQjd0X4ug8NbXiRU5BK7LucgwAO8mXITrwDSz~cqqtgew1hTVC-DNA38UWcmk7udtn5F6xG3PTT09NMEypxzimE-Fi7ZIuTZiLDJ1t5T3l03yKug__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        }}
                        style={{
                            width: 240,
                            height: 260,
                            position: 'absolute',
                            left: '-90%',
                            top: -10,
                            transform: [{ rotate: '-30deg' }]
                        }}
                    />
                </Box>
                <Box paddingLeft={30}>
                    <AUTH_EMOJY
                        width={230}
                        height={183}
                        style={{
                            marginTop: 112
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}
