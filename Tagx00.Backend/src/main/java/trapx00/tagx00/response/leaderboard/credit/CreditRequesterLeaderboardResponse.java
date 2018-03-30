package trapx00.tagx00.response.leaderboard.credit;

import trapx00.tagx00.vo.leaderboard.CreditLeaderboardRequesterVo;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardWorkerVo;
import trapx00.tagx00.vo.paging.PagingInfo;

import java.util.List;

public class CreditRequesterLeaderboardResponse {
    private PagingInfo pagingInfo;
    private List<CreditLeaderboardRequesterVo> users;
}
