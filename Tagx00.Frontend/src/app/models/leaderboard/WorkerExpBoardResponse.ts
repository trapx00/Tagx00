import { PagingInfo } from "../PagingInfo";
import { ExpSelfRank } from "../userRank/ExpSelfRank";

export interface WorkerExpBoardResponse {
  pagingInfo: PagingInfo
  expBoardList: ExpSelfRank[]
}
