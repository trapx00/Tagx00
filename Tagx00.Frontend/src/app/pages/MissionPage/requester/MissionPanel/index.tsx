import React, { CSSProperties } from 'react';
import { LocaleMessage } from "../../../../internationalization/components/index";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { RequesterMissionCardList } from "./RequesterMissionCardList";

interface Props {

}

const btnAddMissionStyle: CSSProperties = {
  float: "right"
};



export default class RequesterMissionPanel extends React.Component<Props, {}> {

  render() {
    return <div>
      <h1>
        <span><LocaleMessage id={"missions.requester.mission.title"}/></span>

        <Link to={"/mission/requester/create"}>
          <Button style={btnAddMissionStyle} type="primary">
            <LocaleMessage id={"missions.requester.mission.add"}/>
          </Button>
        </Link>
      </h1>
      <RequesterMissionCardList/>
    </div>;
  }
}

