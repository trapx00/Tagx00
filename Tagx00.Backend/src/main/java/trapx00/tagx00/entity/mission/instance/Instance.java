package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;

public class Instance extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "instanceId")
    private int instanceId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @EnumTranslate(targetClass = MissionInstanceState.class)
    @Column(name = "missionInstanceState")
    private MissionInstanceState missionInstanceState;

    @EnumTranslate(targetClass = MissionType.class)
    @Column(name = "MissionType")
    private MissionType missionType;

    @JsonSerialize
    @Column(name = "acceptDate")
    private Date acceptDate;

    @JsonSerialize
    @Column(name = "submitDate")
    private Date submitDate;

    @Column(name = "submitted")
    private boolean submitted;

    @Column(name = "missionId")
    private int missionId;

    @Column(name = "exp")
    private double exp;

    @Column(name = "credits")
    private int credits;



    @Column(name="comment")
    private String comment;

    public Instance() {
    }

    public Instance(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, int missionId, double exp, int credits) {
        this.instanceId = instanceId;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.missionType = missionType;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.submitted = submitted;
        this.missionId = missionId;
        this.exp = exp;
        this.credits = credits;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
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
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
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
}
