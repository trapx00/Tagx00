package trapx00.tagx00.publicdatas.mission;

import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

public enum MissionType {
    IMAGE("IMAGE", ImageMissionProperties.class, ImageInstanceDetailVo.class);

    public final Class<? extends MissionProperties> propertiesClass;
    public final Class<? extends InstanceDetailVo> instanceDetailVoClass;
    public final String name;

    MissionType(String name, Class<? extends MissionProperties> propertiesClass, Class<? extends InstanceDetailVo> instanceDetailVoClass) {
        this.name = name;
        this.propertiesClass = propertiesClass;
        this.instanceDetailVoClass = instanceDetailVoClass;
    }
}
