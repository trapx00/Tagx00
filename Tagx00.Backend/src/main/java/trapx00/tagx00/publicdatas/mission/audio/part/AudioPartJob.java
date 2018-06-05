package trapx00.tagx00.publicdatas.mission.audio.part;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

public class AudioPartJob extends AudioJob {

    private AudioPartTuple tuple;

    public AudioPartJob() {
        super(AudioMissionType.PART);
    }
}
