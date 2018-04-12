import { PagingInfo } from "../../PagingInfo";
import { MissionPublicItem } from "../../mission/Mission";

export interface MissionPublicResponse {
  pagingInfoVo: PagingInfo;
  items: MissionPublicItem[];
}
