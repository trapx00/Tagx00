package trapx00.tagx00.response.user;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.admin.credit.CreditInfo;
import trapx00.tagx00.vo.admin.instance.InstanceInfo;
import trapx00.tagx00.vo.admin.instance.InstanceStateTypeDistribution;
import trapx00.tagx00.vo.admin.mission.MissionInfo;
import trapx00.tagx00.vo.admin.mission.MissionStateTypeDistribution;
import trapx00.tagx00.vo.admin.user.UserInfo;
import trapx00.tagx00.vo.mission.requester.MissionDateNumVo;

import java.util.ArrayList;

public class AdminInfoResponse extends Response {

    private MissionInfo mission;
    private InstanceInfo instance;
    private UserInfo user;
    private CreditInfo credit;

    public AdminInfoResponse(MissionInfo mission, InstanceInfo instance, UserInfo user, CreditInfo credit) {
        this.mission = mission;
        this.instance = instance;
        this.user = user;
        this.credit = credit;
    }

    public MissionInfo getMission() {
        return mission;
    }

    public void setMission(MissionInfo mission) {
        this.mission = mission;
    }

    public InstanceInfo getInstance() {
        return instance;
    }

    public void setInstance(InstanceInfo instance) {
        this.instance = instance;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public CreditInfo getCredit() {
        return credit;
    }

    public void setCredit(CreditInfo credit) {
        this.credit = credit;
    }
}
