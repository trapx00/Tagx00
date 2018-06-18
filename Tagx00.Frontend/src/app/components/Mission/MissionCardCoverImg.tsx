import React from 'react';
import { DEFAULT_COVER_URL } from "./util";

interface Props {
  url: string;
}

export function MissionCardCoverImg(props: Props) {
  return <img src={props.url || DEFAULT_COVER_URL} alt={"cover"}
              width={250}
              height={250}/>;
}
