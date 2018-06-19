package trapx00.tagx00.vo.admin.instance;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.List;

public class InstanceStateTypeDistribution {
    private List<String> inProgress;
    private List<String> submitted;
    private List<String> finalized;
    private List<String> abandoned;

    public InstanceStateTypeDistribution(List<String> inProgress, List<String> submitted, List<String> finalized, List<String> abandoned) {
        this.inProgress = inProgress;
        this.submitted = submitted;
        this.finalized = finalized;
        this.abandoned = abandoned;
    }

    public List<String> getInProgress() {
        return inProgress;
    }

    public void setInProgress(List<String> inProgress) {
        this.inProgress = inProgress;
    }

    public List<String> getSubmitted() {
        return submitted;
    }

    public void setSubmitted(List<String> submitted) {
        this.submitted = submitted;
    }

    public List<String> getFinalized() {
        return finalized;
    }

    public void setFinalized(List<String> finalized) {
        this.finalized = finalized;
    }

    public List<String> getAbandoned() {
        return abandoned;
    }

    public void setAbandoned(List<String> abandoned) {
        this.abandoned = abandoned;
    }
}
