import React from "react";

interface TagDescriptionEditorProps {
  tag: string;
  description: string;
  allowEditing: boolean;
  onTagChange: (tag: string)=>void;
  onDescriptionChange: (description: string) => void;
  onFinish: () => void;
  onModify: ()=>void;
}


export class TagDescriptionEditor extends React.Component<TagDescriptionEditorProps, {}> {



  onTagTextChange = ({target}) => {
    this.props.onTagChange(target.value);
  };

  onDescriptionChange = ({target}) => {
    this.props.onDescriptionChange(target.value);
  };

  onFinish = () => {
    this.props.onFinish();
  };

  onModify = () => {
    this.props.onModify();
  };

  render() {
    if (this.props.allowEditing) {
      return <p>
        <span>Tag</span>
        <input value={this.props.tag} onChange={this.onTagTextChange}/>
        &emsp;
        <span>description</span>
        <input value={this.props.description} onChange={this.onDescriptionChange}/>
        &emsp;
        <button onClick={this.onFinish}>
          OK
        </button>
      </p>;
    } else {
      return <p>
        <span>Tag</span>
        <b>{this.props.tag}</b>
        &emsp;
        <span>description</span>
        <b>{this.props.description}</b>
        &emsp;
        <button onClick={this.onModify}>
          Modify
        </button>
      </p>;
    }
  }
}