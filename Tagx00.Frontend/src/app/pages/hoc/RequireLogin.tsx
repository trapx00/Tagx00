import React from 'react';
import { observer } from "mobx-react";
import { UserRole } from "../../models/user/User";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";

export function requireLogin(...roles: UserRole[]) {
  return function(WrappedComponent): any {
    class Component extends React.Component {

      @Inject userStore: UserStore;

      render() {
        if (!this.userStore.loggedIn) {
          return "Not login";
        }
        if (roles.length >0 && roles.indexOf(this.userStore.user.role) == -1) {
          return "Not accessible role. Expected: " + roles
        }
        return <WrappedComponent {...this.props}
                                 token={this.userStore.token}
                                 currentRole={this.userStore.user.role}
        />;
      }

    }

    return observer(Component);
  }
}

