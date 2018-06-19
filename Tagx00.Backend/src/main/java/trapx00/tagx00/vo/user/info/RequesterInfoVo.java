package trapx00.tagx00.vo.user.info;

import trapx00.tagx00.entity.account.Role;

import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;

public class RequesterInfoVo extends UserInfoVo {
    private int submittedMissionCount;
    private int instanceCount;
    private int submittedInstanceCount;
    private int inProgressInstanceCount;
    private int finalizedInstanceCount;
    private int abandonedInstanceCount;


    public RequesterInfoVo(String username, String email, String registerDate, String avatarUrl, int submittedMissionCount, int instanceCount, int submittedInstanceCount, int inProgressInstanceCount, int finalizedInstanceCount, int abandonedInstanceCount) {
        super(username, email, Role.REQUESTER_NAME, registerDate, avatarUrl);
        this.submittedMissionCount = submittedMissionCount;
        this.instanceCount = instanceCount;
        this.submittedInstanceCount = submittedInstanceCount;
        this.inProgressInstanceCount = inProgressInstanceCount;
        this.finalizedInstanceCount = finalizedInstanceCount;
        this.abandonedInstanceCount = abandonedInstanceCount;
    }

    public int getAbandonedInstanceCount() {
        return abandonedInstanceCount;
    }

    public void setAbandonedInstanceCount(int abandonedInstanceCount) {
        this.abandonedInstanceCount = abandonedInstanceCount;
    }

    public int getSubmittedMissionCount() {
        return submittedMissionCount;
    }

    public void setSubmittedMissionCount(int submittedMissionCount) {
        this.submittedMissionCount = submittedMissionCount;
    }

    public int getInstanceCount() {
        return instanceCount;
    }

    public void setInstanceCount(int instanceCount) {
        this.instanceCount = instanceCount;
    }

    public int getSubmittedInstanceCount() {
        return submittedInstanceCount;
    }

    public void setSubmittedInstanceCount(int submittedInstanceCount) {
        this.submittedInstanceCount = submittedInstanceCount;
    }

    public int getInProgressInstanceCount() {
        return inProgressInstanceCount;
    }

    public void setInProgressInstanceCount(int inProgressInstanceCount) {
        this.inProgressInstanceCount = inProgressInstanceCount;
    }

    public int getFinalizedInstanceCount() {
        return finalizedInstanceCount;
    }

    public void setFinalizedInstanceCount(int finalizedInstanceCount) {
        this.finalizedInstanceCount = finalizedInstanceCount;
    }
}
