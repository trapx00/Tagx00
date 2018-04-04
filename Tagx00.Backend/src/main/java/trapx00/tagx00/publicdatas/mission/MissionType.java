package trapx00.tagx00.publicdatas.mission;

import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

public enum MissionType {
    IMAGE("image", ImageMissionProperties.class);

    public final Class<? extends MissionProperties> propertiesClass;
    public final String name;

    MissionType(String name, Class<? extends MissionProperties> propertiesClass) {
        this.name = name;
        this.propertiesClass = propertiesClass;
    }
}
