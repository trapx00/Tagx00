import { UserRole } from "../../models/user/User";
import { Redirect } from "react-router";
import React from "react";

const redirectMap = {
  [UserRole.ROLE_REQUESTER]: "requester",
  [UserRole.ROLE_WORKER]: "worker"
};

export function MissionPageRoleRedirect(props: {role: UserRole}) {
  const target = redirectMap[props.role];
  return <Redirect to={`/mission/${target}`}/>;
}
