import { PagingInfo } from "../PagingInfo";
import { ExpLeaderboardUserVo } from "../userRank/ExpSelfRank";

export interface WorkerExpBoardResponse {
  pagingInfo: PagingInfo
  users: ExpLeaderboardUserVo[]
}
