import React from 'react';
import { UploadFile } from "antd/lib/upload/interface";
import { UploadPanel, UploadPanelProps } from "../UploadPanel";

type Props = Exclude<UploadPanelProps, "valid" | "listType" | "accept">;

function validFile(file: UploadFile) {
  return file.type.startsWith("video/");
}

export function VideoUploadPanel(props: Props) {
  return <UploadPanel {...props} valid={validFile} listType={"text"} accept={"video/mp4,video/x-m4v,video/*"}/>;
}
