package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.text.TextJob;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Embeddable
public class TextResult extends WorkResult {
    @Column(name = "textJob")
    private TextJob imageJob;

    @Column(name = "filename")
    private String url;

    public TextResult() {
    }

    public TextResult(String workResultId, boolean isDone, TextJob imageJob, String url) {
        super(workResultId, isDone);
        this.imageJob = imageJob;
        this.url = url;
    }

    public TextResult(boolean isDone, TextJob imageJob, String url) {
        super(isDone);
        this.imageJob = imageJob;
        this.url = url;
    }

    public TextJob getImageJob() {
        return imageJob;
    }

    public void setImageJob(TextJob imageJob) {
        this.imageJob = imageJob;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
