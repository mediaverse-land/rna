/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { Flex } from '../../../styles/grid';
import { TouchableOpacity } from 'react-native';
import { useRtl } from '../../../hooks/use-rtl';
import { UseNavigationType } from '../../../types/use-navigation';
import { StorageService } from '../../../services/storage.service';
import { HAS_USER_SEEN_SETTINGS_TOUR } from '../../../constaints/consts';
import { Coachmark, CoachmarkComposer } from 'react-native-coachmark';

export type ListColumnItem = {
  id: number;
  title: string;
  value?: string | null;
  bage?: number | string | null;
  icon: any;
  routePath?: string;
  direction?: 'row-reverse';
  iconStyle?: any;
  isDisabled?: boolean;
};

type Props = {
  data: ListColumnItem[];
  onpress?: () => void;
  hasTour?: boolean;
};

const ACCOUNT_TOUR =
  'In the account, you can edit your name, username, password and everything you entered during registration or log out of your !account';
const INBOX_TOUR = 'The latest news and announcements of the platform can be seen in your inbox';

const _storageService = new StorageService();
const CoachmarkWrapper: any = Coachmark;

export function ListColumn({ data, onpress, hasTour = false }: Props) {
  const { isRtl } = useRtl();
  const navigation = useNavigation<UseNavigationType>();

  const [allowIntraction, setAllowIntraction] = useState(hasTour ? false : true);

  const navigationHandler = (routePath: string) => {
    if (!allowIntraction) {
      return;
    }
    navigation.navigate(routePath);
  };

  const isFocused = useIsFocused();

  const hasUserSeenTour = async () => {
    const res = await _storageService.get(HAS_USER_SEEN_SETTINGS_TOUR);
    if (res) {
      setAllowIntraction(true);
    }
    return res ? true : false;
  };

  const _userSeenTourHandler = async () => {
    await _storageService.set(HAS_USER_SEEN_SETTINGS_TOUR, HAS_USER_SEEN_SETTINGS_TOUR);
  };

  const accountRef = useRef();
  const inboxRef = useRef();

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (accountRef?.current && inboxRef?.current) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([accountRef, inboxRef]);
        composer.show().then(async () => {
          await _userSeenTourHandler();
          setAllowIntraction(true);
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [accountRef, inboxRef, isFocused]);

  const retriveRefs: Record<number, any> = {
    0: accountRef,
    1: inboxRef,
  };

  return (
    <Box
      width="100%"
      borderRadius={16}
      backgroundColor="#1d1d3a"
      paddingLeft={18}
      paddingRight={18}
      paddingBottom={23}
      paddingTop={23}
    >
      {hasTour
        ? data.map((list: ListColumnItem, index: number) => {
            const ref = retriveRefs[index] || null;
            return (
              <CoachmarkWrapper
                key={list.id}
                ref={ref}
                allowBackgroundInteractions={false}
                message={index === 0 ? ACCOUNT_TOUR : index === 1 ? INBOX_TOUR : null}
              >
                <Item
                  list={list}
                  navigationHandler={navigationHandler}
                  data={data}
                  onpress={onpress}
                  isRtl={isRtl}
                />
              </CoachmarkWrapper>
            );
          })
        : data.map((list: ListColumnItem) => (
            <Item
              key={list.id}
              list={list}
              navigationHandler={navigationHandler}
              data={data}
              onpress={onpress}
              isRtl={isRtl}
            />
          ))}
    </Box>
  );
}

const Item = ({ list, navigationHandler, data, onpress, isRtl }: any) => {
  return (
    <Box width="100%" marginBottom={list.id !== data.at(-1).id ? 32 : 0}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          list.routePath && navigationHandler(list.routePath);
          onpress && onpress();
        }}
      >
        <Flex width="100%" direction="row" align="center" justify="space-between">
          <Flex width="60%" direction="row" align="center">
            {!list.direction || list.direction !== 'row-reverse' ? (
              <list.icon
                style={[
                  list.iconStyle,
                  {
                    marginRight: 21.6,
                    opacity: list?.isDisabled && 0.6,
                  },
                ]}
              />
            ) : null}
            <Text
              color={list?.isDisabled ? '#5A5A5A' : theme.color.light.WHITE}
              fontSize={14}
              lineHeight={20}
            >
              {list.title}
            </Text>
          </Flex>

          {list?.direction === 'row-reverse' ? (
            <list.icon
              style={[
                list.iconStyle,
                {
                  transform: [
                    {
                      rotate: isRtl ? '180deg' : '0deg',
                    },
                  ],
                },
              ]}
            />
          ) : (
            <>
              {list.value ? (
                <Text
                  color={theme.color.light.LIGHT_TEXT}
                  fontSize={theme.numericFontSize.sm}
                  lineHeight={theme.numericLineHeight.md}
                >
                  {list.value}
                </Text>
              ) : null}
              {list.bage ? (
                <Box
                  width={18}
                  height={18}
                  backgroundColor={theme.color.light.WHITE}
                  borderRadius={100}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    color={theme.color.light.INPUT_PLACEHOLDER}
                    fontSize={theme.numericFontSize.sm}
                    lineHeight={theme.numericLineHeight.md}
                    fontWeight={400}
                  >
                    {list.bage}
                  </Text>
                </Box>
              ) : null}
            </>
          )}
        </Flex>
      </TouchableOpacity>
    </Box>
  );
};
