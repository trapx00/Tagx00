package trapx00.tagx00.vo.user.info;

import trapx00.tagx00.entity.account.Role;

import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;

public class RequesterInfoVo extends UserInfoVo {
    private int pendingMissionCount;
    private int activeMissionCount;
    private int endedMissionCount;

    public RequesterInfoVo(String username, String email, String registerDate, String avatarUrl, int pendingMissionCount, int activeMissionCount, int endedMissionCount) {
        super(username, email, Role.REQUESTER_NAME, registerDate, avatarUrl);
        this.pendingMissionCount = pendingMissionCount;
        this.activeMissionCount = activeMissionCount;
        this.endedMissionCount = endedMissionCount;
    }

    public int getPendingMissionCount() {
        return pendingMissionCount;
    }

    public void setPendingMissionCount(int pendingMissionCount) {
        this.pendingMissionCount = pendingMissionCount;
    }

    public int getActiveMissionCount() {
        return activeMissionCount;
    }

    public void setActiveMissionCount(int activeMissionCount) {
        this.activeMissionCount = activeMissionCount;
    }

    public int getEndedMissionCount() {
        return endedMissionCount;
    }

    public void setEndedMissionCount(int endedMissionCount) {
        this.endedMissionCount = endedMissionCount;
    }
}
