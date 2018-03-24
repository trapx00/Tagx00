package trapx00.tagx00.publicdatas.mission.image;

import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.io.Serializable;

public class ImageJob implements Serializable {
    private ImageMissionType type;

    public ImageJob() {
    }

    public ImageJob(ImageMissionType type) {
        this.type = type;
    }

    public ImageMissionType getType() {
        return type;
    }

    public void setType(ImageMissionType type) {
        this.type = type;
    }
}
