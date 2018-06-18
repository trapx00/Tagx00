package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.mission.ThreeDimensionMission;
import trapx00.tagx00.entity.mission.instance.workresult.ThreeDimensionResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class ThreeDimensionInstance extends Instance {
    @Column(name = "threeDimensionResults")
    @ElementCollection(targetClass = ThreeDimensionResult.class)
    @Transient
    private List<ThreeDimensionResult> threeDimensionResults;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private ThreeDimensionMission threeDimensionMission;

    public ThreeDimensionInstance() {
    }

    public List<ThreeDimensionResult> getThreeDimensionResults() {
        return threeDimensionResults;
    }

    public void setThreeDimensionResults(List<ThreeDimensionResult> threeDimensionResults) {
        this.threeDimensionResults = threeDimensionResults;
    }

    public ThreeDimensionMission getThreeDimensionMission() {
        return threeDimensionMission;
    }

    public void setThreeDimensionMission(ThreeDimensionMission threeDimensionMission) {
        this.threeDimensionMission = threeDimensionMission;
    }

    public ThreeDimensionInstance(String instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, String missionId, double exp, double expRatio, int credits, String comment, List<ThreeDimensionResult> threeDimensionResults, ThreeDimensionMission threeDimensionMission) {
        super(instanceId, workerUsername, missionInstanceState, missionType, acceptDate, submitDate, submitted, missionId, exp, expRatio, credits, comment);
        this.threeDimensionResults = threeDimensionResults;

        this.threeDimensionMission = threeDimensionMission;
    }
}
