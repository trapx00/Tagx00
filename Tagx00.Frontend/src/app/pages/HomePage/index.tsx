import React from "react";
import { STORE_ROUTER } from "../../constants/stores";
import { inject } from "mobx-react";
import { RouterStoreProps } from "../../routes/RouterStore";
import { Link } from "../../components/Common/Link";


export class HomePage extends React.Component<{}, any> {
  render() {
    return <div>
      <p>
        this is the true homepage and as you see, it doesn't share the same layout as other pages;
      </p>
      <p>
        <Link to={"/browse"}>
          click this to /browse
        </Link>
      </p>
    </div>

  }
}
