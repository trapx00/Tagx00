package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.text.TextJob;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TextResult extends WorkResult {
    @Column(name = "textJob")
    private TextJob textJob;

    @Column(name = "filename")
    private String url;

    public TextResult() {
    }

    public TextResult(String workResultId, boolean isDone, TextJob textJob, String url) {
        super(workResultId, isDone);
        this.textJob = textJob;
        this.url = url;
    }

    public TextResult(boolean isDone, TextJob textJob, String url) {
        super(isDone);
        this.textJob = textJob;
        this.url = url;
    }

    public TextJob getTextJob() {
        return textJob;
    }

    public void setTextJob(TextJob textJob) {
        this.textJob = textJob;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
