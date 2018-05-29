import React from 'react';
import { LocaleMessage } from "../../../internationalization/components";

interface Props {
  avatarUrl: string;
}

const ID_PREFIX = "selfCenter.avatar.";

export function AvatarContainer(props: Props) {
  return <div>
    <img alt="avatar" height={200} width={200} src={props.avatarUrl}/>
    <p>
    <LocaleMessage id={ID_PREFIX+"gravatar"}/>
    </p>
    <p>
    <a target="_blank" href={"https://en.gravatar.com/support/what-is-gravatar/"}>
      <LocaleMessage id={ID_PREFIX+"whatIsGravatar"}/>
    </a>
    </p>
  </div>
}
