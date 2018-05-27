package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;

import javax.persistence.Embeddable;

@Embeddable
public class ImageResult extends WorkResult {
    private ImageJob imageJob;
    private String url;

    public ImageResult() {
    }

    public ImageResult(ImageJob imageJob, String url) {
        this.imageJob = imageJob;
        this.url = url;
    }

    public ImageJob getImageJob() {
        return imageJob;
    }

    public void setImageJob(ImageJob imageJob) {
        this.imageJob = imageJob;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
