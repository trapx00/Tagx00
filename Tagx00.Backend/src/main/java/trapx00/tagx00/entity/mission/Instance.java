package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

@Table(name = "instance")
public class Instance extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "missionId")
    private int missionId;

    @Column(name = "totalCount")
    private int totalCount;

    @Column(name = "missionInstanceState")
    private MissionInstanceState missionInstanceState;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "submitDate")
    private Date submitDate;


    @ElementCollection(targetClass = Integer.class)
    @Column(name = "imageIds")
    private List<Integer> imageIds;

    @Column(name = "isSubmitted")
    private boolean isSubmitted;

    public Instance(int missionId,String workerUsername, MissionInstanceState missionInstanceState, Date acceptDate, Date submitDate, List<Integer> imageIds, boolean isSubmitted) {
        this.id = id;
        this.missionId=missionId;
        this.workerUsername = workerUsername;
        this.missionInstanceState = missionInstanceState;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.imageIds = imageIds;
        this.isSubmitted = isSubmitted;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getMissionId() {
        return missionId;
    }

    public void setMissionId(int missionId) {
        this.missionId = missionId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
