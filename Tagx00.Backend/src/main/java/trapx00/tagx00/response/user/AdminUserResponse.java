package trapx00.tagx00.response.user;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.admin.user.UserInfo;
import trapx00.tagx00.vo.user.info.UserInfoVo;

import java.util.List;

public class AdminUserResponse extends Response {
    private List<UserInfoVo> users;

    public AdminUserResponse(List<UserInfoVo> users) {
        this.users = users;
    }

    public List<UserInfoVo> getUsers() {
        return users;
    }

    public void setUsers(List<UserInfoVo> users) {
        this.users = users;
    }
}
