package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.JsonSerialize;
import trapx00.tagx00.entity.annotation.Table;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

@Table(name = "imageInstance")
public class ImageInstance extends Instance {
    @JsonSerialize
    @Column(name = "imageResults")
    private List<ImageResult> imageResults;

    public ImageInstance() {
    }

    public ImageInstance(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, Date acceptDate, Date submitDate, boolean submitted, int missionId, double exp, int credits, List<ImageResult> imageResults) {
        super(instanceId, workerUsername, missionInstanceState, acceptDate, submitDate, submitted, missionId, exp, credits);
        this.imageResults = imageResults;
    }

    public List<ImageResult> getImageResults() {
        return imageResults;
    }

    public void setImageResults(List<ImageResult> imageResults) {
        this.imageResults = imageResults;
    }
}
