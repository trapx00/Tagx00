package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.vo.mission.image.ImageJobType;
import trapx00.tagx00.vo.mission.missiontype.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.List;

public class ImageMissionVo extends MissionVo {
    public ImageJobType jobType;
    private List<ImageJob> jobs;

    public ImageMissionVo(ImageJobType jobType) {
        super(MissionType.IMAGE);
        this.jobType = jobType;
    }
}
