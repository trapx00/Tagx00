package trapx00.tagx00.entity.mission.instance.workresult;

import javax.persistence.Embeddable;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.io.Serializable;

@Embeddable
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class WorkResult implements Serializable {
    private String workResultId;
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

    public boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }
}
