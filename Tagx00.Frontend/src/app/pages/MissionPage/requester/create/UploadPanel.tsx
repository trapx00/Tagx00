import React, { ReactNode } from 'react';
import { Button, Icon, Upload } from 'antd';
import { UploadFile, UploadListType, UploadProps } from "antd/lib/upload/interface";

export interface UploadPanelProps {
  onFileListChange(fileList: UploadFile[]): void;
  fileList: UploadFile[];
  maxFileNum: number;
  multiple: boolean;
  buttonChildren: ReactNode;
  valid?(file: UploadFile): boolean;
  accept?: string;
  listType?: UploadListType;
}

export class UploadPanel extends React.Component<UploadPanelProps, {}> {


  static defaultProps = {
    valid: () => true
  };

  render() {
    const props: UploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        const newList = this.props.fileList.filter(x => x !== file);
        this.props.onFileListChange(newList);
      },
      beforeUpload: (_, fileList) => {

        const validFiles = fileList.filter(this.props.valid);
        this.props.onFileListChange([...this.props.fileList, ...validFiles]);
        return false;
      },
      fileList: this.props.fileList,
      multiple: this.props.multiple,
      accept: this.props.accept,
      listType: this.props.listType,
    };

    return <div>
      <Upload {...props}>
        {this.props.fileList.length >= this.props.maxFileNum
          ? null : <Button>
            <Icon type="upload" /> {this.props.buttonChildren}
          </Button>}

      </Upload>
    </div>
  }
}
