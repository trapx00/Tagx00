package trapx00.tagx00.vo.mission.missiontype;

public class ImageMissionVo extends MissionVo {
    public ImageMissionJobType jobType;

    public ImageMissionVo(ImageMissionJobType jobType) {
        super(MissionType.IMAGE);
        this.jobType = jobType;
    }
}
