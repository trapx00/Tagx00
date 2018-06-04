package trapx00.tagx00.publicdatas.mission.video.part;

import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

public class VideoPartJob extends VideoJob {

    private VideoPartTuple tuple;

    public VideoPartJob() {
        super(VideoMissionType.PART);
    }
}
