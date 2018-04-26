import { PagingInfo } from "../PagingInfo";
import { CreditLeaderboardWorkerVo } from "../userRank/CreditSelfRank";

export interface WorkerCreditBoardResponse {
  pagingInfo: PagingInfo
  users: CreditLeaderboardWorkerVo[]
}
