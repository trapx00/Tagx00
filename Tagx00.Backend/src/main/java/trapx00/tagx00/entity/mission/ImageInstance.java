package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.entity.annotation.Table;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

@Table(name = "instance")
public class ImageInstance extends Instance {
    @ElementCollection(targetClass = Integer.class)
    @Column(name = "resultIds")
    private List<Integer> resultIds;
    
    public List<Integer> getResultIds() {
        return resultIds;
    }

    public void setResultIds(List<Integer> resultIds) {
        this.resultIds = resultIds;
    }

    public ImageInstance() {
    }

    public ImageInstance(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted, List<Integer> resultIds) {
        super(instanceId, workerUsername, missionInstanceState, missionId, acceptDate, submitDate, isSubmitted);
        this.resultIds = resultIds;
    }


}
