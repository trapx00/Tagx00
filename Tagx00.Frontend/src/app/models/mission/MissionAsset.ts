export interface TagConfTuple {
  tag: string;
  confidence: number;
}


export interface MissionAsset {
  url: string;
  tagConfTuple: TagConfTuple[];
}
