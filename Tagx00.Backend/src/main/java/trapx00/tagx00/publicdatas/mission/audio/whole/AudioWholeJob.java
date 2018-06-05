package trapx00.tagx00.publicdatas.mission.audio.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

public class AudioWholeJob extends AudioJob {

    private TagDescriptionTuple tuple;

    public AudioWholeJob() {
        super(AudioMissionType.WHOLE);
    }
}
