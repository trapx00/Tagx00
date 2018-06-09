package trapx00.tagx00.publicdatas.mission.audio.part;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

import java.util.List;

public class AudioPartJob extends AudioJob {

    private List<AudioPartTuple> tupleList;


    public List<AudioPartTuple> getTupleList() {
        return tupleList;
    }

    public AudioPartJob(List<AudioPartTuple> tupleList) {
        super(AudioMissionType.PART);
        this.tupleList = tupleList;
    }

    public void setTupleList(List<AudioPartTuple> tupleList) {
        this.tupleList = tupleList;
    }


    public AudioPartJob() {
        super(AudioMissionType.PART);
    }
}
