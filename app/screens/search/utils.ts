export const getUrl = ({ searchObjectType, page, plan, tag, name }: any) => {
  let url: string;

  if (typeof searchObjectType === "string") {
    url = "/search?";
  }
  if (typeof searchObjectType === "number") {
    url = `/search?type=${searchObjectType}`;
  }

  url = url + `&page=${page}`;
  if (plan) url = url + `&plan=${plan}`;
  if (tag) url = url + `&tag=${tag}`;
  if (name) url = url + `&q=${name}`;

  return url;
};
