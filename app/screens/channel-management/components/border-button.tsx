import { Box } from '../../../components/box';
import { Button } from '../../../components/button';
import { ICON_ADD } from '../../../constaints/icons';

export const BorderButton = ({ handler, title }: { handler: () => void; title: string }) => {
  return (
    <Box marginTop={40}>
      <Button
        varient="flat"
        text={title}
        additionalStyles={{
          height: 56,
        }}
        onpressHandler={handler}
        icon={
          <ICON_ADD
            style={{
              position: 'relative',
              top: -3,
            }}
            color="666680"
            width={16}
            height={16}
          />
        }
        size="lg"
      />
    </Box>
  );
};
