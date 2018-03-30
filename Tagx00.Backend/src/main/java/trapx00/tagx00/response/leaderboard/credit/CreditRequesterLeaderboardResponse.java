package trapx00.tagx00.response.leaderboard.credit;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardRequesterVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;

import java.util.List;

public class CreditRequesterLeaderboardResponse extends Response {
    private PagingInfoVo pagingInfoVo;
    private List<CreditLeaderboardRequesterVo> users;

    public CreditRequesterLeaderboardResponse() {
    }

    public CreditRequesterLeaderboardResponse(PagingInfoVo pagingInfoVo, List<CreditLeaderboardRequesterVo> users) {
        this.pagingInfoVo = pagingInfoVo;
        this.users = users;
    }

    public PagingInfoVo getPagingInfoVo() {
        return pagingInfoVo;
    }

    public void setPagingInfoVo(PagingInfoVo pagingInfoVo) {
        this.pagingInfoVo = pagingInfoVo;
    }

    public List<CreditLeaderboardRequesterVo> getUsers() {
        return users;
    }

    public void setUsers(List<CreditLeaderboardRequesterVo> users) {
        this.users = users;
    }
}
