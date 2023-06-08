import { Input } from '../../../../shared/components/form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../../shared/components/screen-gradient';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../shared/components/box';
import { windowSize } from '../../../../utils/window-size';
import { ScrollView } from 'react-native';
import { SettingsScreenTitle } from '../../components/title';
import { Button } from '../../../../shared/components/button';

const { width } = windowSize();

const formStructure = [
    {
        id: 1,
        placeholder: 'Insert username',
        labelText: 'Username',
        name: 'username'
    },
    {
        id: 2,
        placeholder: 'Insert full name',
        labelText: 'Full name',
        name: 'fullname'
    },
    {
        id: 3,
        placeholder: 'Insert email',
        labelText: 'Email',
        name: 'email'
    },
    {
        id: 4,
        placeholder: 'Insert password',
        labelText: 'Password',
        name: 'password'
    },
    {
        id: 5,
        placeholder: 'Repeat password',
        labelText: 'Repeat password',
        name: 'repeat_password'
    },
    {
        id: 6,
        placeholder: 'Insert city',
        labelText: 'City',
        name: 'city'
    },
    {
        id: 7,
        placeholder: 'Insert address',
        labelText: 'Address',
        name: 'address'
    }
];

export function GeneralInformationPage() {
    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <ScreenGradient>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    {/* header */}
                    <PaddingContainer>
                        <SettingsScreenTitle title="General Information" />
                        {/* form */}
                        <Box flex={1} width="100%" paddingTop={72}>
                            {formStructure.map((form) => (
                                <Box key={form.id} marginBottom={16}>
                                    <Input
                                        placeholder={form.placeholder}
                                        labelText={form.labelText}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box width={'100%'} height={100}></Box>
                    </PaddingContainer>
                </ScrollView>
                <Box marginBottom={20}>
                    <Button
                        varient='primary'
                        width={Math.floor(width) - 48}
                        text='Save'
                        size='sm'
                    />
                </Box>
            </ScreenGradient>
        </SafeAreaView>
    );
}
