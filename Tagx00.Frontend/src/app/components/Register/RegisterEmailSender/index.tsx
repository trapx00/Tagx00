import * as React from "react";
import {Localize} from "../../../internationalization/components";
import {Icon} from "antd";

export class RegisterEmailSender extends React.Component<any, any> {
    render() {
        return (
            <Localize>{
                (props) => {
                    return (
                        <div style={{textAlign: 'center'}}>
                            <Icon type="mail" style={{fontSize: 200, color: '#08c'}}/>
                            
                        </div>);
                }
            }
            </Localize>)
    }
}