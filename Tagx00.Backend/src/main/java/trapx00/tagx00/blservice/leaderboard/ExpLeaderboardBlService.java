package trapx00.tagx00.blservice.leaderboard;

import trapx00.tagx00.response.leaderboard.exp.ExpLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.exp.ExpSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public interface ExpLeaderboardBlService {

    /**
     * get the paginginfo and the list of worker's exp
     * @param pagingQueryVo
     * @return  ExpLeaderboardResponse
     */
    ExpLeaderboardResponse expLeaderboard(PagingQueryVo pagingQueryVo);

    /**
     * get the order and exp of the specific worker
     * @param workerUsername
     * @return ExpSpecificWorkerLeaderboardResponse
     */
    ExpSpecificWorkerLeaderboardResponse specificWorker(String workerUsername);
}
