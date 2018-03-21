package trapx00.tagx00.entity.mission.workresult;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;

@Table(name = "imageResult")
public class Integer extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "instanceId")
    private int instanceId;

    @JsonSerialize
    @ElementCollection(targetClass = java.lang.Integer.class)
    @Column(name = "imageJob")
    private ImageJob imageJob;

    @Column(name = "filename")
    private String url;

    public Integer() {
    }

    public Integer(ImageJob imageJob, String url) {
        this.imageJob = imageJob;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
