import { PagingInfo } from "../PagingInfo";
import { CreditSelfRank } from "../userRank/CreditSelfRank";

export interface RequesterCreditBoardResponse {
  pagingInfo: PagingInfo
  creditBoardList: CreditSelfRank[]
}
