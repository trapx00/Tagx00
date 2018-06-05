package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;

import javax.persistence.Embeddable;

@Embeddable
public class AudioResult extends WorkResult {
    private String audioUrl;
    private AudioJob job;
}
