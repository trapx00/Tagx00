package trapx00.tagx00.vo.user.info;

import java.io.Serializable;

public class RequesterInfoVo implements Serializable {
    private String username;
    private String email;
    private int submittedMissionCount;
    private int instanceCount;
    private int submittedInstanceCount;
    private int inProgressInstanceCount;
    private int finalizedInstanceCount;
    private int abandonedInstanceCount;
    
    public RequesterInfoVo() {
    }

    public RequesterInfoVo(String username, String email, int submittedMissionCount, int instanceCount, int submittedInstanceCount, int inProgressInstanceCount, int finalizedInstanceCount, int abandonedInstanceCount) {
        this.username = username;
        this.email = email;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
