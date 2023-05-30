import { ICON_ADD } from '../../../constaints/icons';
import { Text } from '../../../shared/components/text';
import { WalletComponents } from '../style';

type Props = {
    text: string;
    onpress?: () => void;
};

const { Button } = WalletComponents;

export function AddButton({ text, onpress }: Props) {
    return (
        <Button activeOpacity={1} onPress={onpress}>
            <Text
                color="#4E4E61"
                lineHeight={20}
                fontSize={14}
                fontWeight={600}
                marginRight={10}
            >
                {text}
            </Text>
            <ICON_ADD width={16} height={16} />
        </Button>
    );
}
