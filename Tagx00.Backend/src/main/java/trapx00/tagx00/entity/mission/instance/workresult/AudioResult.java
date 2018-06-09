package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.audio.AudioJob;

import javax.persistence.Embeddable;

@Embeddable
public class AudioResult extends WorkResult {
    private String audioUrl;
    private AudioJob job;

    public AudioResult() {

    }

    public AudioResult(String workResultId, boolean isDone, String audioUrl, AudioJob job) {
        super(workResultId, isDone);
        this.audioUrl = audioUrl;
        this.job = job;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public AudioJob getJob() {
        return job;
    }

    public void setJob(AudioJob job) {
        this.job = job;
    }
}
