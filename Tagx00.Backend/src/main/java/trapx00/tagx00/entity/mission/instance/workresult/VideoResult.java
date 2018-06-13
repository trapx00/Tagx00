package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.video.VideoJob;

import javax.persistence.Embeddable;

@Embeddable
public class VideoResult extends WorkResult {
    private String videoUrl;
    private VideoJob job;

    public VideoResult() {
    }

    public VideoResult(String workResultId, boolean isDone, String videoUrl, VideoJob job) {
        super(workResultId, isDone);
        this.videoUrl = videoUrl;
        this.job = job;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public VideoJob getJob() {
        return job;
    }

    public void setJob(VideoJob job) {
        this.job = job;
    }
}
