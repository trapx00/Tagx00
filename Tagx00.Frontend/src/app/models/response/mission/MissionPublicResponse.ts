import { PagingInfo } from "../../PagingInfo";
import { MissionPublicItem } from "../../mission/MissionPublicItem";

export interface MissionPublicResponse {
  pagingInfoVo: PagingInfo;
  items: MissionPublicItem[];
}
