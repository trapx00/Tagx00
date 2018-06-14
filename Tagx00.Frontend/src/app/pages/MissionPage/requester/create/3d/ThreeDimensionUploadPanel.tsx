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
        const newList = this.props.fileList.filter(x => x.mtl.name.split(".")[0] !== file.name);
        this.props.onFileListChange(newList);
      },
      beforeUpload: (_, fileList) => {
        const newArray= [...this.props.fileList];

        fileList = fileList.filter(x=> {
          const ext = x.name.split(".")[1];
          return ext === "mtl" || ext === "obj";
        });

        for(let i=0; i<fileList.length - 1; i++) {
           for(let j=i+1; j<fileList.length; j++) {
             const filename1 = fileList[i].name.split(".");
             const filename2 = fileList[j].name.split(".");
             if(filename1[0] === filename2[0]) {
               newArray.push({
                 mtl: filename1[1] === "mtl" ? fileList[i] : fileList[j],
                 obj: filename1[1] === "obj" ? fileList[i] : fileList[j]
               });
               break;
             }
           }
        }

        console.log(newArray);

        this.props.onFileListChange(newArray);
        return false;
      },
      fileList: this.props.fileList.map(x => ({...x.mtl, name: x.mtl.name.split(".")[0]})),
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
