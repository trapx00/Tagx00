package trapx00.tagx00.publicdatas.mission.audio.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

public class AudioWholeJob extends AudioJob {

    private TagDescriptionTuple tuple;

    public AudioWholeJob() {
    }

    public AudioWholeJob(AudioMissionType type, TagDescriptionTuple tuple) {
        super(type);
        this.tuple = tuple;
    }

    public TagDescriptionTuple getTuple() {
        return tuple;
    }

    public void setTuple(TagDescriptionTuple tuple) {
        this.tuple = tuple;
    }
}
