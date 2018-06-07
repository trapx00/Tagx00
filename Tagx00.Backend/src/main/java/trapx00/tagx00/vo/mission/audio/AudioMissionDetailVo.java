package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class AudioMissionDetailVo extends MissionDetailVo {
    private List<String> audioUrls;
    private List<AudioMissionType> audioMissionTypes;

    public AudioMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, MissionType missionType, List<String> audioUrls, List<AudioMissionType> audioMissionTypes) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.audioUrls = audioUrls;
        this.audioMissionTypes = audioMissionTypes;
    }

    public List<String> getAudioUrls() {
        return audioUrls;
    }

    public void setAudioUrls(List<String> audioUrls) {
        this.audioUrls = audioUrls;
    }

    public List<AudioMissionType> getAudioMissionTypes() {
        return audioMissionTypes;
    }

    public void setAudioMissionTypes(List<AudioMissionType> audioMissionTypes) {
        this.audioMissionTypes = audioMissionTypes;
    }
}
