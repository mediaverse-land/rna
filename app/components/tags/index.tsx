import { TagsComponents } from './style';

export function Tags() {
    const tags = ['action', 'crime', 'thriller'];

    return (
        <TagsComponents.Container>
            {tags.map((t: string, index: number) => (
                <TagsComponents.TextList key={index}>
                    <TagsComponents.TextListItem>#</TagsComponents.TextListItem>
                    <TagsComponents.TextListItem style={{ marginRight: 8 }}>
                        {t}
                    </TagsComponents.TextListItem>
                </TagsComponents.TextList>
            ))}
        </TagsComponents.Container>
    );
}
