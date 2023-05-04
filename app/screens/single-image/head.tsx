import { Image, Text, View } from 'react-native';
import { SingleImageComponents } from './style';
import { PaddingContainer, RowAlignCenter } from '../../styles/grid';
import { Title } from '../../shared/components/title';

export function SingleImagePageHead() {
    return (
        <>
            <SingleImageComponents.Hero>
                <Image
                    style={{
                        width: '100%',
                        height: 370
                    }}
                    resizeMode='cover'
                    source={{ uri: "https://s3-alpha-sig.figma.com/img/ed1d/499e/bd7dabb8bdb3e4364852cb11fdd0c2d6?Expires=1684108800&Signature=N7Qg7GaIbJJEX5vGOs8ZIPtbLxdcml9JHQY6MkxkejMMrdJcaejfGRsEVcktDMxou-NB0NTPYuIYHSrP5hU-CKcxIJ00Tc8Tv8v9Hrdrqetcvl0xeb49FfNqX32sXaK8iDkCWVr5M9f~1raz4FO7N5rK-3qyj9MtODmCvkKNpp3I9q84~j93CpvBIognxGDGF2JdnkH0uA2vqe8Uk52uUZmB~fhjKExoWBVWT05H9ABOglm2Wfhl3usQ7hWu5RdiSYa7tY3tNXWMp8tVlWMcoTXFUQZ8OYbjIYftD0MAjRRexR-8hlKG2plYbmV7zSzbORuR4LyCxVRCs8TIlRuRCw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }}
                />
            </SingleImageComponents.Hero>
            <PaddingContainer>
                <Title str="How to shoot like messi!" />
                <View>
                    <SingleImageComponents.UserDataWrapper>
                        <RowAlignCenter>
                            <Image
                                source={{ uri: "https://s3-alpha-sig.figma.com/img/83d0/3fda/aeafecb9ecec22665790cbb050be9328?Expires=1684108800&Signature=AGJCpfMXnRfkhYw0qX-hP7NyFwmFhfLByi9jPzi0~koadvM~lzSmeLA2QASUHcY~jHYd5-wIUkh-QJ9CRV7NizbVErAXuN2O49Y2Odk0bycIRTLSZywue19oEEw3nK906u7EsTx-iq~l0d8hlFjePFM86Zcf791ZQi7hfC-WPa-lZ5q5bDvziGBRTFGXmcAaSYk2e-PJwFrwIYBh8BID72fnabCCf8b5JDq5Dp4Xn7aY2j6Pe8K2zjYicExiwBoTYxJ0JVOg0yrBmFV4w~xf813wj6CfKIgTEj0zv2fQOk7IeEP6rlAPbMVvF7XF29xMGfHDjXk6HAw0~EoSQj81Kg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100,
                                    marginRight: 8
                                }}
                            />
                            <Text>Julia Rabert</Text>
                        </RowAlignCenter>
                        <RowAlignCenter>
                            <SingleImageComponents.ReportBtn>
                                Report...
                            </SingleImageComponents.ReportBtn>
                        </RowAlignCenter>
                    </SingleImageComponents.UserDataWrapper>
                </View>
            </PaddingContainer>
        </>
    );
}
