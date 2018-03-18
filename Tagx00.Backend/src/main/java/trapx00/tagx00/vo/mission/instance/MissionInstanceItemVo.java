package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

public class MissionInstanceItemVo {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;
    private int missionId;
    private String workerUsername;
    private MissionInstanceState state;
    private Date acceptDate;

    public List<Integer> getImageIds() {
        return imageIds;
    }

    public void setImageIds(List<Integer> imageIds) {
        this.imageIds = imageIds;
    }

    public boolean isSubmitted() {
        return isSubmitted;
    }

    public void setSubmitted(boolean submitted) {
        isSubmitted = submitted;
    }

    private List<Integer> imageIds;
    private boolean isSubmitted;

    public MissionInstanceItemVo(int id,int missionId, String workerUsername, MissionInstanceState state, Date acceptDate, Date submitDate, int completedCount, int totalCount) {
        this.id=id;
        this.missionId = missionId;
        this.workerUsername = workerUsername;
        this.state = state;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
        this.isSubmitted=false;
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

    private Date submitDate;
    private int completedCount;
    private int totalCount;


}
