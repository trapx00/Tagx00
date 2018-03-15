package trapx00.tagx00.entity.mission.workresult;

import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;

@Table(name = "imageResult")
public class ImageResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @JsonSerialize
    @ElementCollection(targetClass = Integer.class)
    @Column(name = "imageJob")
    private ImageJob imageJob;

    @Column(name = "filename")
    private String url;
}
