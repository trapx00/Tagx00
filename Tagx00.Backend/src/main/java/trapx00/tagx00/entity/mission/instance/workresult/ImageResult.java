package trapx00.tagx00.entity.mission.instance.workresult;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.entity.annotation.JsonSerialize;
import trapx00.tagx00.entity.annotation.Table;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;

@Table(name = "imageResult")
public class ImageResult extends WorkResult {
    @JsonSerialize
    @ElementCollection(targetClass = java.lang.Integer.class)
    @Column(name = "imageJob")
    private ImageJob imageJob;

    @Column(name = "filename")
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
