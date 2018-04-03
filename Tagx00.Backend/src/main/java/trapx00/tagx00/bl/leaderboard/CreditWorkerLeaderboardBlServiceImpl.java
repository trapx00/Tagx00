package trapx00.tagx00.bl.leaderboard;

import trapx00.tagx00.blservice.leaderboard.CreditWorkerLeaderboardBlService;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditWorkerLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public class CreditWorkerLeaderboardBlServiceImpl implements CreditWorkerLeaderboardBlService {
    /**
     * get the paginginfo and the list of worker's credit
     * @param pagingQueryVo
     * @return  CreditWorkerLeaderboardResponse
     */
    @Override
    public CreditWorkerLeaderboardResponse creditLeaderboard(PagingQueryVo pagingQueryVo) {
        return null;
    }
    /**
     * get the order and credit of the specific worker
     * @param workerUsername
     * @return CreditSpecificWorkerLeaderboardResponse
     */
    @Override
    public CreditSpecificWorkerLeaderboardResponse specificWorker(String workerUsername) {
        return null;
    }
}
