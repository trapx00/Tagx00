import React, { CSSProperties } from 'react';
import { LocaleMessage } from "../../../internationalization/components";
import { Button } from 'antd';
import { Inject } from "react.di";
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router";
import { AsyncComponent } from "../../../router/AsyncComponent";

interface Props {

}

const btnAddMissionStyle: CSSProperties = {
  float: "right"
};

export class RequesterMissionPanel extends React.Component<Props, {}> {
  render() {
    return <div>
      <h1>
        <span><LocaleMessage id={"missions.requester.mission.title"}/></span>
        <Link to={"/mission/create/image"}>
          <Button style={btnAddMissionStyle} type="primary">
            <LocaleMessage id={"missions.requester.mission.add"}/>
          </Button>
        </Link>
      </h1>
    </div>;
  }
}

