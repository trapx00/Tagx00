package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.text.TextJob;

import javax.persistence.Embeddable;

@Embeddable
public class TextResult extends WorkResult {
    private String url;
    private TextJob textJob;


    public TextResult() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TextJob getTextJob() {
        return textJob;
    }

    public void setTextJob(TextJob textJob) {
        this.textJob = textJob;
    }
}
