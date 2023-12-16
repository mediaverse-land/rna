import { tokenStringResolver } from '../../../utils/token-string-resolver';

type Props = {
  nextPageUrl: string;
  setIsInfinitLoading: (args: boolean) => void;
  tokenCtx: any;
  apiFunc: (one: any, sec: any) => void;
  data: any;
  setData: (args: any) => void;
  _setNextPageUrl: (args: string) => void;
};

export const getNextPageDataHandler = async ({
  nextPageUrl,
  setIsInfinitLoading,
  tokenCtx,
  apiFunc,
  data,
  setData,
  _setNextPageUrl,
}: Props) => {
  const url = nextPageUrl;
  if (!url) {
    return;
  }
  setIsInfinitLoading(true);

  const token = await tokenCtx.getToken();

  const formattedToken = tokenStringResolver(token);

  const { isError, res }: any = await apiFunc(formattedToken, `/${nextPageUrl}`);

  if (isError) {
    setIsInfinitLoading(false);

    return;
  }

  const response = res.data;
  if (response) {
    setData([...data, ...res.data.data]);

    const next_page_url = response.data?.next_page_url?.split('/')[4];
    if (!next_page_url) {
      setIsInfinitLoading(false);
      _setNextPageUrl(null);
      return;
    }
    next_page_url && next_page_url !== nextPageUrl && _setNextPageUrl(`/${next_page_url}`);
  }
  setIsInfinitLoading(false);
};
