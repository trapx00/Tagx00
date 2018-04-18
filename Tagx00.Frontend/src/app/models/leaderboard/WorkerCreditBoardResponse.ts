import { PagingInfo } from "../PagingInfo";
import { CreditSelfRank } from "../userRank/CreditSelfRank";

export interface WorkerCreditBoardResponse {
  pagingInfo: PagingInfo
  creditBoardList: CreditSelfRank[]
}
