package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;

public class Instance extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "instanceId")
    private int instanceId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "missionInstanceState")
    private MissionInstanceState missionInstanceState;

    @JsonSerialize
    @Column(name = "acceptDate")
    private Date acceptDate;

    @JsonSerialize
    @Column(name = "submitDate")
    private Date submitDate;

    @Column(name = "isSubmitted")
    private boolean isSubmitted;

    @Column(name = "missionId")
    private int missionId;

    public Instance() {
    }

    public Instance(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted) {
        this.instanceId = instanceId;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.missionId = missionId;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.isSubmitted = isSubmitted;
    }

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
}
