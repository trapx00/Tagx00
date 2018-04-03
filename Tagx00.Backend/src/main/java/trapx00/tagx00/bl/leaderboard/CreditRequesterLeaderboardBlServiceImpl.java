package trapx00.tagx00.bl.leaderboard;

import trapx00.tagx00.blservice.leaderboard.CreditRequesterLeaderboardBlService;
import trapx00.tagx00.response.leaderboard.credit.CreditRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificRequesterLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public class CreditRequesterLeaderboardBlServiceImpl implements CreditRequesterLeaderboardBlService {
    /**
     * get the paginginfo and the list of requester's credit
     * @param pagingQueryVo
     * @return  CreditRequesterLeaderboardResponse
     */
    @Override
    public CreditRequesterLeaderboardResponse creditLeaderboard(PagingQueryVo pagingQueryVo) {
        return null;
    }
    /**
     * get the order and credit of the specific requester
     * @param requesterUsername
     * @return CreditSpecificRequesterLeaderboardResponse
     */
    @Override
    public CreditSpecificRequesterLeaderboardResponse specificRequester(String requesterUsername) {
        return null;
    }
}
