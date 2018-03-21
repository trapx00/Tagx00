package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class ImageInstanceDetailVo extends InstanceDetailVo {

    private List<Integer> imageIds;

    public List<Integer> getImageIds() {
        return imageIds;
    }

    public void setImageIds(List<Integer> imageIds) {
        this.imageIds = imageIds;
    }

    public ImageInstanceDetailVo(InstanceVo instance, List<Integer> imageIds) {
        super(instance);
        this.imageIds = imageIds;
    }
}
