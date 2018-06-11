package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.publicdatas.mission.audio.part.AudioPartJob;
import trapx00.tagx00.publicdatas.mission.audio.whole.AudioWholeJob;

import java.io.Serializable;


public enum AudioMissionType implements Serializable {
    WHOLE(AudioWholeJob.class),
    PART(AudioPartJob.class);


    private Class<? extends AudioJob> jobClass;

    AudioMissionType(Class<? extends AudioJob> jobClass) {
        this.jobClass = jobClass;
    }

    public Class<? extends AudioJob> getJobClass() {
        return jobClass;

    }
}
