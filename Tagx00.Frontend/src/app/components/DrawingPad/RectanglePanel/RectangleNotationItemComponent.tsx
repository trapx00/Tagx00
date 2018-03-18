import React from "react";
import { RectangleNotation } from "./RectangleNotation";
import { runInAction } from "mobx";
import { TagDescriptionEditor } from "../utils/TagDescriptionEditor";
import { observer } from "mobx-react";

interface Props {
  part: RectangleNotation;
  onSelect: ()=>void;
}

@observer
export class RectangleNotationItemComponent extends React.Component<Props, any> {
  render() {
    const x = this.props.part;
    return <div>
      <p>
        <span>{x.rectangle.id}</span>
        &emsp;
        <button onClick={this.props.onSelect}>
            {x.selected ? "Deselect" : "Select"}
        </button>
      </p>
      <TagDescriptionEditor tag={x.tag}
                            description={x.description}
                            allowEditing={x.modifying}
                            onTagChange={(tag) => runInAction(() => x.tag=tag)}
                            onDescriptionChange={(des) => runInAction(() => x.description = des)}
                            onFinish={() => x.completeModify()}
                            onModify={() => x.modify()}
      />

    </div>
  }
}
