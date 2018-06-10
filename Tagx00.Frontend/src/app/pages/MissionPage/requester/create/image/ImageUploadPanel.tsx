import React from 'react';
import { UploadFile } from "antd/lib/upload/interface";
import { UploadPanel, UploadPanelProps } from "../UploadPanel";

type Props = Exclude<UploadPanelProps, "valid" | "listType" | "accept">;

function validFile(file: UploadFile) {
  return file.type.startsWith("image/");
}

export function ImageUploadPanel(props: Props) {
  return <UploadPanel {...props} valid={validFile} listType={"picture"} accept={"image/*"}/>;
}
