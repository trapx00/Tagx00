package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.image.district.DistrictJob;
import trapx00.tagx00.publicdatas.mission.image.part.ImagePartJob;
import trapx00.tagx00.publicdatas.mission.image.whole.ImageWholeJob;

import java.io.Serializable;

public enum ImageMissionType implements Serializable {
    DISTRICT(DistrictJob.class),
    WHOLE(ImageWholeJob.class),
    PART(ImagePartJob.class);

    public final Class<? extends ImageJob> clazz;
    ImageMissionType(Class<? extends ImageJob> clazz) {
        this.clazz = clazz;
    }
}
