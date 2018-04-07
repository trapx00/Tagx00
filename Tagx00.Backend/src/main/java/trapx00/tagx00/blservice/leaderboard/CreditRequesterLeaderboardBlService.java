package trapx00.tagx00.blservice.leaderboard;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.leaderboard.credit.CreditRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificRequesterLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public interface CreditRequesterLeaderboardBlService {


    /**
     * get the paginginfo and the list of requester's credit
     * @param pagingQueryVo
     * @return  CreditRequesterLeaderboardResponse
     */
    CreditRequesterLeaderboardResponse creditLeaderboard(PagingQueryVo pagingQueryVo) throws SystemException;

    /**
     * get the order and credit of the specific requester
     * @param requesterUsername
     * @return CreditSpecificRequesterLeaderboardResponse
     */
    CreditSpecificRequesterLeaderboardResponse specificRequester(String requesterUsername) throws SystemException;
}
