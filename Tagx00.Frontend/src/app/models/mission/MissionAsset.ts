export interface TagConfMap {
  [s: string]: number;
}


export interface MissionAsset {
  url: string;
  tagConfTuple: TagConfMap;
}
