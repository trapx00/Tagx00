package trapx00.tagx00.publicdatas.mission.audio.part;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

import java.util.List;

public class AudioPartJob extends AudioJob {

    private List<AudioPartTuple> tuples;

    public AudioPartJob() {
    }

    public AudioPartJob(AudioMissionType type, List<AudioPartTuple> tuples) {
        super(type);
        this.tuples = tuples;
    }

    public List<AudioPartTuple> getTuples() {
        return tuples;
    }

    public void setTuples(List<AudioPartTuple> tuples) {
        this.tuples = tuples;
    }
}
