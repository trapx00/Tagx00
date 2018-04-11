package trapx00.tagx00.blservice.leaderboard;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditWorkerLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public interface CreditWorkerLeaderboardBlService {

    /**
     * get the paginginfo and the list of worker's credit
     * @param pagingQueryVo
     * @return  CreditWorkerLeaderboardResponse
     */
    CreditWorkerLeaderboardResponse creditLeaderboard (PagingQueryVo pagingQueryVo) throws SystemException;

    /**
     * get the order and credit of the specific worker
     * @param workerUsername
     * @return CreditSpecificWorkerLeaderboardResponse
     */
    CreditSpecificWorkerLeaderboardResponse specificWorker(String workerUsername) throws SystemException;
}
