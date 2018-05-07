package trapx00.tagx00.entity.mission.instance.workresult;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

@Embeddable
public class WorkResult {
    @Id
    private String workResultId;
    @Column(name = "isDone")
    private boolean isDone;

    public WorkResult() {
    }

    public WorkResult(String workResultId, boolean isDone) {
        this.workResultId = workResultId;
        this.isDone = isDone;
    }

    public String getWorkResultId() {
        return workResultId;
    }

    public void setWorkResultId(String workResultId) {
        this.workResultId = workResultId;
    }

    public WorkResult(boolean isDone) {
        this.isDone = isDone;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }
}
