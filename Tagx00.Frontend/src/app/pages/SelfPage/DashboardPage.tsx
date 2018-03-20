import React from "react";
import { SelfCenterLayout, UseSelfCenterLayout } from "../../layouts/SelfCenterLayout";

@UseSelfCenterLayout
export class DashboardPage extends React.Component<any, any> {
  render() {
    return "dashboard";
  }
}
