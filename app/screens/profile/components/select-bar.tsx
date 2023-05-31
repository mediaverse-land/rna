import { FC } from 'react';
import { Box } from '../../../shared/components/box';
import {
    ICON_CHECK_SQUARE_WHITE,
    ICON_DOWNLOAD_WHITE,
    ICON_MENU_WHITE,
    ICON_X_WHITE
} from '../../../constaints/icons';
import { TouchableOpacity } from 'react-native';

type Props = {
    isVisible: boolean;
    closerHandler: () => void;
};

export const SelectBar: FC<Props> = ({ isVisible, closerHandler }) => {
    const selectBarCloserHandler = () => {
        closerHandler();
    };

    return (
        <>
            {isVisible ? (
                <Box
                    width="100%"
                    height={48}
                    position="absolute"
                    bottom={139}
                    justifyContent="center"
                    paddingLeft={24}
                    paddingRight={24}
                    zIndex={1000000}
                >
                    <Box
                        width="100%"
                        height="100%"
                        borderRadius={16}
                        backgroundColor="#0e0e12a0"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingRight={24}
                        paddingLeft={24}
                    >
                        <TouchableOpacity onPress={selectBarCloserHandler}>
                            <Box direction="row" alignItems="center">
                                <ICON_X_WHITE />
                            </Box>
                        </TouchableOpacity>
                        <Box direction="row" alignItems="center">
                            <ICON_DOWNLOAD_WHITE />
                            <ICON_CHECK_SQUARE_WHITE
                                style={{
                                    marginLeft: 24
                                }}
                            />
                            <ICON_MENU_WHITE
                                style={{
                                    marginLeft: 24
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            ) : null}
        </>
    );
};
