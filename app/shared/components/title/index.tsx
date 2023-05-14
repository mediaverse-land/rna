import { TitleComponent } from './style';

type Props = {
    str: string;
};

export function Title({ str }: Props) {
    return (
        <TitleComponent>{str}</TitleComponent>
    );
}
