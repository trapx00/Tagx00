package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.io.Serializable;
import java.util.Date;

public class InstanceVo implements Serializable {


    private int instanceId;

    public int getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(int instanceId) {
        this.instanceId = instanceId;
    }

    public String getWorkerUsername() {
        return workerUsername;
    }

    public void setWorkerUsername(String workerUsername) {
        this.workerUsername = workerUsername;
    }

    public MissionInstanceState getMissionInstanceState() {
        return missionInstanceState;
    }

    public void setMissionInstanceState(MissionInstanceState missionInstanceState) {
        this.missionInstanceState = missionInstanceState;
    }

    public int getMissionId() {
        return missionId;
    }

    public void setMissionId(int missionId) {
        this.missionId = missionId;
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

    public boolean isSubmitted() {
        return isSubmitted;
    }

    public void setSubmitted(boolean submitted) {
        isSubmitted = submitted;
    }

    public int getCompletedJobsCount() {
        return completedJobsCount;
    }

    public void setCompletedJobsCount(int completedJobsCount) {
        this.completedJobsCount = completedJobsCount;
    }

    public InstanceVo() {
    }

    public InstanceVo(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        this.instanceId = instanceId;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.missionId = missionId;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.isSubmitted = isSubmitted;
        this.completedJobsCount = completedJobsCount;
    }

    private String workerUsername;


    private MissionInstanceState missionInstanceState;


    private int missionId;


    private Date acceptDate;


    private Date submitDate;


    private boolean isSubmitted;

    private int completedJobsCount;

}
