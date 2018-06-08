import React, { ReactNode } from 'react';
import { UploadFile, UploadListType, UploadProps } from "antd/lib/upload/interface";
import { Icon, Upload, Button } from 'antd';
import { ThreeDimensionModel } from "./3dMissionCreateInfo";


export interface ThreeDimensionUploadPanelProps {
  onFileListChange(fileList: ThreeDimensionModel[]): void;
  fileList: ThreeDimensionModel[];
  maxFileNum: number;
  multiple: boolean;
  buttonChildren: ReactNode;
  valid?(file: UploadFile): boolean;
  accept?: string;
  listType?: UploadListType;
}

export class ThreeDimensionUploadPanel extends React.Component<ThreeDimensionUploadPanelProps, {}> {

  static defaultProps = {
    valid: () => true
  };

  render() {
    const props: UploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        const newList = this.props.fileList.filter(x => x[0] !== file);
        this.props.onFileListChange(newList);
      },
      beforeUpload: (_, fileList) => {
        const validFiles = fileList.filter(this.props.valid);
        const nameList = fileList.map(x=>x.name.split('.')[0]);
        let modelIndex = 0;
        for(let i=0; i<fileList.length - 1; i++) {
           for(let j=i; j<fileList.length; j++) {
             if(nameList[i] == nameList[j]) {
               this.props.fileList[modelIndex][0] = fileList[i];
               this.props.fileList[modelIndex][1] = fileList[j];
               modelIndex++;
               break;
             }

           }

        }

        this.props.onFileListChange(this.props.fileList);
        return false;
      },
      fileList: this.props.fileList.map(x => x.mtl),
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
