package trapx00.tagx00.publicdatas.mission.image;

import trapx00.tagx00.vo.mission.image.ImageJobType;

import java.io.Serializable;

public class ImageJob implements Serializable{
    private ImageJobType type;

    public ImageJob(ImageJobType type) {
        this.type = type;
    }

    public ImageJobType getType() {
        return type;
    }

    public void setType(ImageJobType type) {
        this.type = type;
    }
}
