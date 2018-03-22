import React from "react";
import { Link } from "react-router-dom";

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
