import { PagingInfo } from "../PagingInfo";
import { CreditLeaderboardWorkerVo } from "../userRank/CreditSelfRank";

export interface RequesterCreditBoardResponse {
  pagingInfo: PagingInfo
  users: CreditLeaderboardWorkerVo[]
}
