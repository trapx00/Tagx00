package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

@Table(name = "instance")
public class ImageInstance extends Instance {

    @ElementCollection(targetClass = Integer.class)
    @Column(name = "resultIds")
    private List<Integer> resultIds;

}
