import querystring from 'querystring';
import { RouteComponentProps } from "react-router";

export function parseQuerystring<T = any>(props: RouteComponentProps<T>): querystring.ParsedUrlQuery {
  return querystring.parse(props.location.search.substring(1));
}
