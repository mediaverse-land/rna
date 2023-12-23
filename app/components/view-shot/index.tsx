import { ReactNode, forwardRef } from 'react';
import ViewShot from 'react-native-view-shot';

type Props = {
  format?: "jpg" | "png" | "webm" | "raw";
  result?: "base64" | "tmpfile" | "data-uri" | "zip-base64";
  children: ReactNode
};

export const ViewShoter = forwardRef((props: Props, ref: any) => {
  const format = props?.format || 'jpg';
  const result = props?.result || 'base64';

  return (
    <ViewShot
      style={{ flex: 1 }}
      ref={ref}
      options={{
        format,
        result,
      }}
    >
        {props.children}
    </ViewShot>
  );
});

ViewShoter.displayName = 'ViewShot';
