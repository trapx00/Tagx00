package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.io.Serializable;
import java.util.Date;

public class InstanceVo implements Serializable {

    private String instanceId;
    private double expRatio;
    private double exp;
    private int credits;
    private String comment;

    public String getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(String instanceId) {
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

    public String getMissionId() {
        return missionId;
    }

    public void setMissionId(String missionId) {
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

    public double getExpRatio() {
        return expRatio;
    }

    public void setExpRatio(double expRatio) {
        this.expRatio = expRatio;
    }

    public double getExp() {
        return exp;
    }

    public void setExp(double exp) {
        this.exp = exp;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public InstanceVo() {
    }

    public InstanceVo(String instanceId, double expRatio, double exp, int credits, String comment,

                      String workerUsername, MissionInstanceState missionInstanceState,

                      String missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        this.instanceId = instanceId;
        this.expRatio = expRatio;
        this.exp = exp;
        this.credits = credits;
        this.comment = comment;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.missionId = missionId;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.isSubmitted = isSubmitted;
        this.completedJobsCount = completedJobsCount;
    }

    public InstanceVo(double expRatio, double exp, int credits, String comment, String workerUsername, MissionInstanceState missionInstanceState, String missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        this.expRatio = expRatio;
        this.exp = exp;
        this.credits = credits;
        this.comment = comment;
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


    private String missionId;


    private Date acceptDate;


    private Date submitDate;


    private boolean isSubmitted;


    private int completedJobsCount;


}
