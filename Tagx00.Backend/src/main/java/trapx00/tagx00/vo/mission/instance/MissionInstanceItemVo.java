package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.io.Serializable;
import java.util.Date;

public class MissionInstanceItemVo implements Serializable {

    private int missionId;
    private String workerUsername;
    private MissionInstanceState state;
    private Date acceptDate;
    private Date submitDate;
    private int completedCount;
    private int totalCount;

    public MissionInstanceItemVo(int missionId, String workerUsername, MissionInstanceState state, Date acceptDate, Date submitDate, int completedCount, int totalCount) {
        this.missionId = missionId;
        this.workerUsername = workerUsername;
        this.state = state;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    }

    public int getMissionId() {
        return missionId;
    }

    public void setMissionId(int missionId) {
        this.missionId = missionId;
    }

    public String getWorkerUsername() {
        return workerUsername;
    }

    public void setWorkerUsername(String workerUsername) {
        this.workerUsername = workerUsername;
    }

    public MissionInstanceState getState() {
        return state;
    }

    public void setState(MissionInstanceState state) {
        this.state = state;
    }

    public Date getAcceptDate() {
        return acceptDate;
    }

    public void setAcceptDate(Date acceptDate) {
        this.acceptDate = acceptDate;
    }

    public Date getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(Date submitDate) {
        this.submitDate = submitDate;
    }

    public int getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(int completedCount) {
        this.completedCount = completedCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
