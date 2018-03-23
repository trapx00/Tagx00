import CheckableTag from "antd/lib/tag/CheckableTag";
import * as React from "react";


export function removeElementAt<T>(array: Array<T>, index: number) {
  array.splice(index, 1);
}

export function replaceElement<T>(array: Array<T>, source: T, replacement: T) {
  const index = array.indexOf(this.source);
  array[index] = replacement;
}
