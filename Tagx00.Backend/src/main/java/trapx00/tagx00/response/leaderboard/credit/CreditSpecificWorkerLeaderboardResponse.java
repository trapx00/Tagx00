package trapx00.tagx00.response.leaderboard.credit;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardWorkerVo;

public class CreditSpecificWorkerLeaderboardResponse extends Response {
    private CreditLeaderboardWorkerVo user;

    public CreditSpecificWorkerLeaderboardResponse() {
    }

    public CreditSpecificWorkerLeaderboardResponse(CreditLeaderboardWorkerVo user) {
        this.user = user;
    }

    public CreditLeaderboardWorkerVo getUser() {
        return user;
    }

    public void setUser(CreditLeaderboardWorkerVo user) {
        this.user = user;
    }
}
