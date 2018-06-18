package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.mission.AudioMission;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.instance.workresult.AudioResult;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class AudioInstance extends Instance {
    @Column(name = "audioResults")
    @ElementCollection(targetClass = AudioResult.class)
    @Lob
    private List<AudioResult> audioResults;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private AudioMission audioMission;

    public AudioInstance() {
    }

    public AudioInstance(String instanceId, String workerUsername, MissionInstanceState missionInstanceState, MissionType missionType, Date acceptDate, Date submitDate, boolean submitted, String missionId, double exp, double expRatio, int credits, String comment, List<AudioResult> audioResults, AudioMission audioMission) {
        super(instanceId, workerUsername, missionInstanceState, missionType, acceptDate, submitDate, submitted, missionId, exp, expRatio, credits, comment);
        this.audioResults = audioResults;
        this.audioMission = audioMission;
    }

    public List<AudioResult> getAudioResults() {
        return audioResults;
    }

    public void setAudioResults(List<AudioResult> audioResults) {
        this.audioResults = audioResults;
    }

    public AudioMission getAudioMission() {
        return audioMission;
    }

    public void setAudioMission(AudioMission audioMission) {
        this.audioMission = audioMission;
    }
}
