package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class ImageInstanceDetailVo extends InstanceDetailVo {

    private List<ImageResult> imageResults;

    public List<ImageResult> getImageResults() {
        return imageResults;
    }

    public void setImageResults(List<ImageResult> imageResults) {
        this.imageResults = imageResults;
    }

    public ImageInstanceDetailVo() {

    }

    public ImageInstanceDetailVo(InstanceVo instance, List<ImageResult> imageResults) {
        super(instance);
        this.imageResults = imageResults;
    }
}
