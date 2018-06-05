package trapx00.tagx00.publicdatas.mission.audio.part;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

import java.util.List;

public class AudioPartJob extends AudioJob {

    private List<AudioPartTuple> tupleList;

    public AudioPartJob() {
        super(AudioMissionType.PART);
    }
}
