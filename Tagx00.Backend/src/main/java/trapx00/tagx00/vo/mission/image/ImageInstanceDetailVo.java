package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.entity.mission.workresult.ImageResult;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.Date;
import java.util.List;

public class ImageInstanceDetailVo extends InstanceDetailVo {

    private List<ImageResult> results;

    public ImageInstanceDetailVo(InstanceVo instance, List<ImageResult> results) {
        super(instance);
        this.results = results;
    }
}
