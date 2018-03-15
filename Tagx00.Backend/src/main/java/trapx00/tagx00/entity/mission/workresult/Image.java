package trapx00.tagx00.entity.mission.workresult;

import trapx00.tagx00.entity.annotation.*;

import java.util.List;

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @ElementCollection(targetClass = Integer.class)
    @Column(name = "sentId")
    private List<Integer> sentId;

    @Column(name = "filename")
    private String url;
}
