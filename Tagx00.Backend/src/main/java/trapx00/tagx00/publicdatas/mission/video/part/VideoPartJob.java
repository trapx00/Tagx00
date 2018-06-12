package trapx00.tagx00.publicdatas.mission.video.part;

import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

import java.util.List;


public class VideoPartJob extends VideoJob {

    private List<VideoPartTuple> tupleList;

    public List<VideoPartTuple> getTupleList() {
        return tupleList;
    }

    public VideoPartJob(List<VideoPartTuple> tupleList) {
        super(VideoMissionType.PART);
        this.tupleList = tupleList;
    }

    public void setTupleList(List<VideoPartTuple> tupleList) {
        this.tupleList = tupleList;
    }


    public VideoPartJob() {
        super(VideoMissionType.PART);
    }
}
