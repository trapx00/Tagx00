package trapx00.tagx00.response.leaderboard.credit;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardWorkerVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;

import java.util.List;

public class CreditWorkerLeaderboardResponse extends Response {
    private PagingInfoVo pagingInfoVo;
    private List<CreditLeaderboardWorkerVo> users;

    public CreditWorkerLeaderboardResponse() {
    }

    public CreditWorkerLeaderboardResponse(PagingInfoVo pagingInfoVo, List<CreditLeaderboardWorkerVo> users) {
        this.pagingInfoVo = pagingInfoVo;
        this.users = users;
    }

    public PagingInfoVo getPagingInfoVo() {
        return pagingInfoVo;
    }

    public void setPagingInfoVo(PagingInfoVo pagingInfoVo) {
        this.pagingInfoVo = pagingInfoVo;
    }

    public List<CreditLeaderboardWorkerVo> getUsers() {
        return users;
    }

    public void setUsers(List<CreditLeaderboardWorkerVo> users) {
        this.users = users;
    }
}
