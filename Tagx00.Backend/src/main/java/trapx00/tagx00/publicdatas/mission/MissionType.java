package trapx00.tagx00.publicdatas.mission;

import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

public enum MissionType {
    IMAGE(ImageMissionProperties.class);

    public final Class<? extends MissionProperties> propertiesClass;

    MissionType(Class<? extends MissionProperties> propertiesClass) {
        this.propertiesClass = propertiesClass;
    }
}
