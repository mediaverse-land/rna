import { ReactNode } from 'react';
import { Box } from '../box';
import { LoadingSpinner } from '../loader-spinner';

export const RenderIf = ({
    condition,
    children,
    paddingLeft,
    paddingRight
}: {
    condition: boolean;
    children: ReactNode;
    paddingLeft?: number;
    paddingRight?: number;
}) => {
    return (
        <>
            {condition ? (
                <Box
                    width="100%"
                    height={100}
                    alignItems="center"
                    justifyContent="center"
                    paddingLeft={paddingLeft}
                    paddingRight={paddingRight}
                >
                    <LoadingSpinner color="red" />
                </Box>
            ) : (
                children
            )}
        </>
    );
};
