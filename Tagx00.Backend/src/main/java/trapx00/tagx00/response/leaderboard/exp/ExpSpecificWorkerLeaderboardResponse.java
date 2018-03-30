package trapx00.tagx00.response.leaderboard.exp;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.ExpLeaderboardUserVo;

public class ExpSpecificWorkerLeaderboardResponse extends Response {
    private ExpLeaderboardUserVo user;

    public ExpSpecificWorkerLeaderboardResponse() {
    }

    public ExpSpecificWorkerLeaderboardResponse(ExpLeaderboardUserVo user) {
        this.user = user;
    }

    public ExpLeaderboardUserVo getUser() {
        return user;
    }

    public void setUser(ExpLeaderboardUserVo user) {
        this.user = user;
    }
}
