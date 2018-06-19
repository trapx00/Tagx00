package trapx00.tagx00.vo.user.info;

import trapx00.tagx00.entity.account.Role;

public class WorkerInfoVo extends UserInfoVo {
    private int credits;
    private double exp;
    private int level;
    private int completedMissionCount;
    private int acceptedMissionCount;
    private int inProgressMissionCount;
    private int abandonedMissionCount;
    private int finalizedMissionCount;

    public WorkerInfoVo(String username, String email, String registerDate,String avatarUrl, int credits, double exp, int level, int completedMissionCount, int acceptedMissionCount, int inProgressMissionCount, int abandonedMissionCount, int finalizedMissionCount) {
        super(username, email, Role.WORKER_NAME, registerDate, avatarUrl);
        this.credits = credits;
        this.exp = exp;
        this.level = level;
        this.completedMissionCount = completedMissionCount;
        this.acceptedMissionCount = acceptedMissionCount;
        this.inProgressMissionCount = inProgressMissionCount;
        this.abandonedMissionCount = abandonedMissionCount;
        this.finalizedMissionCount = finalizedMissionCount;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public double getExp() {
        return exp;
    }

    public void setExp(double exp) {
        this.exp = exp;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getCompletedMissionCount() {
        return completedMissionCount;
    }

    public void setCompletedMissionCount(int completedMissionCount) {
        this.completedMissionCount = completedMissionCount;
    }

    public int getAcceptedMissionCount() {
        return acceptedMissionCount;
    }

    public void setAcceptedMissionCount(int acceptedMissionCount) {
        this.acceptedMissionCount = acceptedMissionCount;
    }

    public int getInProgressMissionCount() {
        return inProgressMissionCount;
    }

    public void setInProgressMissionCount(int inProgressMissionCount) {
        this.inProgressMissionCount = inProgressMissionCount;
    }

    public int getAbandonedMissionCount() {
        return abandonedMissionCount;
    }

    public void setAbandonedMissionCount(int abandonedMissionCount) {
        this.abandonedMissionCount = abandonedMissionCount;
    }

    public int getFinalizedMissionCount() {
        return finalizedMissionCount;
    }

    public void setFinalizedMissionCount(int finalizedMissionCount) {
        this.finalizedMissionCount = finalizedMissionCount;
    }
}
