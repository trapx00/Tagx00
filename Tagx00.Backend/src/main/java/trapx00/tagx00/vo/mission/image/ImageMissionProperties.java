package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class ImageMissionProperties extends MissionProperties {
    private List<ImageMissionType> imageMissionTypes;

    public ImageMissionProperties(MissionType type, List<ImageMissionType> imageMissionTypes) {
        super(type);
        this.imageMissionTypes = imageMissionTypes;
    }
}
