package trapx00.tagx00.publicdatas.mission;

import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.image.ImageMissionPublicItemVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.vo.mission.text.TextInstanceDetailVo;
import trapx00.tagx00.vo.mission.text.TextMissionDetailVo;
import trapx00.tagx00.vo.mission.text.TextMissionProperties;
import trapx00.tagx00.vo.mission.text.TextMissionPublicItemVo;

public enum MissionType {
    IMAGE("IMAGE", ImageMissionProperties.class, ImageInstanceDetailVo.class, ImageMissionDetailVo.class, ImageMissionPublicItemVo.class),
    TEXT("TEXT", TextMissionProperties.class, TextInstanceDetailVo.class, TextMissionDetailVo.class, TextMissionPublicItemVo.class);

    public final Class<? extends MissionProperties> propertiesClass;
    public final Class<? extends InstanceDetailVo> instanceDetailVoClass;
    public final Class<? extends MissionDetailVo> missionDetailVoClass;
    public final Class<? extends MissionPublicItemVo> missionPublicItemVoClass;
    public final String name;

    MissionType(String name, Class<? extends MissionProperties> propertiesClass, Class<? extends InstanceDetailVo> instanceDetailVoClass, Class<? extends MissionDetailVo> missionDetailVoClass, Class<? extends MissionPublicItemVo> missionPublicItemVoClass) {
        this.name = name;
        this.propertiesClass = propertiesClass;
        this.instanceDetailVoClass = instanceDetailVoClass;
        this.missionDetailVoClass = missionDetailVoClass;
        this.missionPublicItemVoClass = missionPublicItemVoClass;
    }
}
