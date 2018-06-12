package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "instance")
public class Instance {
    @Id
    private String instanceId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "missionInstanceState")
    @Enumerated(EnumType.STRING)
    private MissionInstanceState missionInstanceState;

    @Column(name = "MissionType")
    @Enumerated(EnumType.STRING)
    private MissionType missionType;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "submitDate")
    private Date submitDate;

    @Column(name = "submitted")
    private boolean submitted;

    @Column(name = "missionId")
    private String missionId;

    @Column(name = "exp")
    private double exp;

    @Column(name = "expRatio")
    private double expRatio;

    @Column(name = "credits")
    private int credits;

    @Column(name = "comment")
    private String comment;

    public Instance() {
    }

    public Instance(String instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, String missionId, double exp, double expRatio, int credits, String comment) {
        this.instanceId = instanceId;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.missionType = missionType;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.submitted = submitted;
        this.missionId = missionId;
        this.exp = exp;
        this.expRatio = expRatio;
        this.credits = credits;
        this.comment = comment;
    }

    public String getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(String instanceId) {
        this.instanceId = instanceId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public double getExpRatio() {
        return expRatio;
    }

    public void setExpRatio(double expRatio) {
        this.expRatio = expRatio;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
