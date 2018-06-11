package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.mission.VideoMission;
import trapx00.tagx00.entity.mission.instance.workresult.VideoResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class VideoInstance extends Instance {
    @Column(name = "videoResults")
    @Lob
    @ElementCollection(targetClass = VideoResult.class)
    private List<VideoResult> videoResults;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private VideoMission videoMission;

    public VideoInstance() {

    }

    public VideoInstance(String instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, String missionId, double exp, double expRatio, int credits, String comment, List<VideoResult> videoResults, VideoMission videoMission) {
        super(instanceId, workerUsername, missionInstanceState, missionType, acceptDate, submitDate, submitted, missionId, exp, expRatio, credits, comment);
        this.videoResults = videoResults;
        this.videoMission = videoMission;
    }

    public List<VideoResult> getVideoResults() {
        return videoResults;
    }

    public void setVideoResults(List<VideoResult> videoResults) {
        this.videoResults = videoResults;
    }

    public VideoMission getVideoMission() {
        return videoMission;
    }

    public void setVideoMission(VideoMission videoMission) {
        this.videoMission = videoMission;
    }
}
