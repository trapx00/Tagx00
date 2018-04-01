package trapx00.tagx00.response.leaderboard.exp;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.ExpLeaderboardUserVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;

import java.util.List;

public class ExpLeaderboardResponse extends Response {
    private PagingInfoVo pagingInfoVo;
    private List<ExpLeaderboardUserVo> users;

    public ExpLeaderboardResponse() {
    }

    public ExpLeaderboardResponse(PagingInfoVo pagingInfoVo, List<ExpLeaderboardUserVo> users) {
        this.pagingInfoVo = pagingInfoVo;
        this.users = users;
    }

    public PagingInfoVo getPagingInfoVo() {
        return pagingInfoVo;
    }

    public void setPagingInfoVo(PagingInfoVo pagingInfoVo) {
        this.pagingInfoVo = pagingInfoVo;
    }

    public List<ExpLeaderboardUserVo> getUsers() {
        return users;
    }

    public void setUsers(List<ExpLeaderboardUserVo> users) {
        this.users = users;
    }
}
