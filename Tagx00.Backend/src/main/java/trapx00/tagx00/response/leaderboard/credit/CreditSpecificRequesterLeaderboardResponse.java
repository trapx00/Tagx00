package trapx00.tagx00.response.leaderboard.credit;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardRequesterVo;

public class CreditSpecificRequesterLeaderboardResponse extends Response {
    private CreditLeaderboardRequesterVo user;

    public CreditSpecificRequesterLeaderboardResponse() {
    }

    public CreditSpecificRequesterLeaderboardResponse(CreditLeaderboardRequesterVo user) {
        this.user = user;
    }

    public CreditLeaderboardRequesterVo getUser() {
        return user;
    }

    public void setUser(CreditLeaderboardRequesterVo user) {
        this.user = user;
    }
}
