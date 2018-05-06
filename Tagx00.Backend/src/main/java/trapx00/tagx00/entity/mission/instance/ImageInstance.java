package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "imageInstance")
public class ImageInstance extends Instance {
    @Column(name = "imageResults")
    @ElementCollection(targetClass = ImageResult.class)
    private List<ImageResult> imageResults;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "imageMission_id")
    private ImageMission imageMission;

    public ImageInstance() {
    }

    public ImageInstance(List<ImageResult> imageResults) {
        this.imageResults = imageResults;
    }

    public ImageInstance(String instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, int missionId, double exp, double expRatio, int credits, String comment, List<ImageResult> imageResults, ImageMission imageMission) {
        super(instanceId, workerUsername, missionInstanceState, missionType, acceptDate, submitDate, submitted, missionId, exp, expRatio, credits, comment);
        this.imageResults = imageResults;
        this.imageMission = imageMission;
    }

    public List<ImageResult> getImageResults() {
        return imageResults;
    }

    public void setImageResults(List<ImageResult> imageResults) {
        this.imageResults = imageResults;
    }
}
