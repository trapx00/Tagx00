package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.publicdatas.mission.audio.part.AudioPartJob;
import trapx00.tagx00.publicdatas.mission.audio.whole.AudioWholeJob;

import java.io.Serializable;

public enum AudioMissionType implements Serializable {
    PART(AudioPartJob.class),
    WHOLE(AudioWholeJob.class);

    public final Class<? extends AudioJob> clazz;

    AudioMissionType(Class<? extends AudioJob> clazz) {
        this.clazz = clazz;
    }

    public Class<? extends AudioJob> getClazz() {
        return clazz;
    }
}
