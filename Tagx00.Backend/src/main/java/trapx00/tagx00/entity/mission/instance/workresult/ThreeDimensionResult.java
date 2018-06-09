package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionJob;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionModelUrl;

import javax.persistence.Entity;

@Entity
public class ThreeDimensionResult extends WorkResult {

    private String token;
    private ThreeDimensionJob job;

    public ThreeDimensionResult() {
    }

    public ThreeDimensionResult(String workResultId, boolean isDone, String token, ThreeDimensionJob job) {
        super(workResultId, isDone);
        this.token = token;
        this.job = job;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ThreeDimensionJob getJob() {
        return job;
    }

    public void setJob(ThreeDimensionJob job) {
        this.job = job;
    }
}
