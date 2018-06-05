package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.List;

public class AudioMissionPublicItemVo extends MissionPublicItemVo {

    private boolean allowCustomTag;
    private List<String> allowedTags;
    public List<AudioMissionType> missionTypes;

}
