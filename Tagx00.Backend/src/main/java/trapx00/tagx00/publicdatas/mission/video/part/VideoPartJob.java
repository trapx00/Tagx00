package trapx00.tagx00.publicdatas.mission.video.part;

import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

import java.util.List;

public class VideoPartJob  extends VideoJob {

    private List<VideoPartTuple> tuples;

    public VideoPartJob(VideoMissionType type, List<VideoPartTuple> tuples) {
        super(type);
        this.tuples = tuples;
    }

    public List<VideoPartTuple> getTuples() {
        return tuples;
    }

    public void setTuples(List<VideoPartTuple> tuples) {
        this.tuples = tuples;
    }
}
