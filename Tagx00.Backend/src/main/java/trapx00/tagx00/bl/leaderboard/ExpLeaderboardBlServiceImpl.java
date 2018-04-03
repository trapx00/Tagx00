package trapx00.tagx00.bl.leaderboard;

import trapx00.tagx00.blservice.leaderboard.ExpLeaderboardBlService;
import trapx00.tagx00.response.leaderboard.exp.ExpLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.exp.ExpSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public class ExpLeaderboardBlServiceImpl implements ExpLeaderboardBlService {
    /**
     * get the paginginfo and the list of worker's exp
     * @param pagingQueryVo
     * @return  ExpLeaderboardResponse
     */
    @Override
    public ExpLeaderboardResponse expLeaderboard(PagingQueryVo pagingQueryVo) {
        return null;
    }
    /**
     * get the order and exp of the specific worker
     * @param workerUsername
     * @return ExpSpecificWorkerLeaderboardResponse
     */
    @Override
    public ExpSpecificWorkerLeaderboardResponse specificWorker(String workerUsername) {
        return null;
    }
}
