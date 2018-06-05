package trapx00.tagx00.publicdatas.mission.video.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

public class VideoWholeJob extends VideoJob {
    private TagDescriptionTuple tuple;

    public VideoWholeJob(TagDescriptionTuple tuple) {
        super(VideoMissionType.WHOLE);
        this.tuple = tuple;
    }
}
