package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.GeneratedValue;
import trapx00.tagx00.entity.annotation.GenerationType;
import trapx00.tagx00.entity.annotation.Id;

public class WorkResult extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "isDone")
    private boolean isDone;

    public WorkResult() {
    }

    public WorkResult(boolean isDone) {
        this.isDone = isDone;
    }

    public boolean isDone() {
        return isDone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDone(boolean done) {
        isDone = done;
    }
}
