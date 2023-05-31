import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Input } from '../../../../shared/components/form';
import { Text } from '../../../../shared/components/text';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../shared/types/use-navigation';

const fillDataForm = [
    {
        id: 1,
        placeholder: 'Insert username...',
        labelText: 'Username'
    },
    {
        id: 2,
        placeholder: 'Insert full name...',
        labelText: 'Full name'
    },
    {
        id: 3,
        placeholder: 'Insert email...',
        labelText: 'Email'
    },
    {
        id: 4,
        placeholder: 'Insert password...',
        labelText: 'Password'
    },
    {
        id: 5,
        placeholder: 'Repet password...',
        labelText: 'Repet Password'
    },
    {
        id: 6,
        placeholder: 'Insert city...',
        labelText: 'City'
    },
    {
        id: 7,
        placeholder: 'Insert adress...',
        labelText: 'Adress'
    }
];

export function FillData() {
    const navigation = useNavigation<UseNavigationType>();

    const navigateToExploreHandler = () => {
        navigation.navigate('AppStack');
    };

    return (
        <Box flex={1} width="100%" alignItems="center">
            <Box position="relative" width="100%" alignItems="center">
                <Text
                    color="#fff"
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={32}
                >
                    We send the code to +339012910407
                </Text>
                <Box>
                    {fillDataForm.map((f) => (
                        <Box width="100%" marginBottom={16} key={f.id}>
                            <Input
                                placeholder={f.placeholder}
                                labelText={f.labelText}
                            />
                        </Box>
                    ))}
                </Box>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fullWidth}
                    onPress={navigateToExploreHandler}
                >
                    <Box
                        width="100%"
                        height={48}
                        backgroundColor="#597AFF"
                        borderRadius={32}
                        alignItems="center"
                        justifyContent="center"
                        marginTop={24}
                    >
                        <Text
                            color="#fff"
                            fontWeight={600}
                            lineHeight={16}
                            fontSize={14}
                        >
                            Save
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
})