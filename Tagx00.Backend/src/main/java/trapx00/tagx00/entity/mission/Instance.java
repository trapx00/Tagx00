package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.entity.mission.workresult.ImageResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

@Table(name = "instance")
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


    @JsonSerialize
    @Column(name = "imageResults")
    private List<ImageResult> imageResults;

    public List<ImageResult> getImageResults() {
        return imageResults;
    }

    public Instance() {
    }

    public Instance(String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean submitted, List<ImageResult> imageResults) {
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.submitted = submitted;
        this.missionId = missionId;
        this.imageResults = imageResults;
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
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public void setImageResults(List<ImageResult> imageResults) {
        this.imageResults = imageResults;
    }
}
