package trapx00.tagx00.vo.admin.instance;

import trapx00.tagx00.publicdatas.mission.MissionType;

public class InstanceStateTypeDistribution {
    private int inProgress;
    private int submitted;
    private int finalized;
    private int abandoned;

    public InstanceStateTypeDistribution(int inProgress, int submitted, int finalized, int abandoned) {
        this.inProgress = inProgress;
        this.submitted = submitted;
        this.finalized = finalized;
        this.abandoned = abandoned;
    }

    public int getInProgress() {
        return inProgress;
    }

    public void setInProgress(int inProgress) {
        this.inProgress = inProgress;
    }

    public int getSubmitted() {
        return submitted;
    }

    public void setSubmitted(int submitted) {
        this.submitted = submitted;
    }

    public int getFinalized() {
        return finalized;
    }

    public void setFinalized(int finalized) {
        this.finalized = finalized;
    }

    public int getAbandoned() {
        return abandoned;
    }

    public void setAbandoned(int abandoned) {
        this.abandoned = abandoned;
    }
}
