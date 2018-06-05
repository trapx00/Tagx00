package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class AudioMissionProperties extends MissionProperties {

    public AudioMissionProperties() {
        super(MissionType.AUDIO);
    }

    private boolean allowCustomTag;
    private List<String> tags;
    private List<AudioMissionType> audioMissionTypes;
}
