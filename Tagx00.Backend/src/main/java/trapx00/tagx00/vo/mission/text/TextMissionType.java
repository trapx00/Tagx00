package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.image.district.DistrictJob;
import trapx00.tagx00.publicdatas.mission.image.part.ImagePartJob;
import trapx00.tagx00.publicdatas.mission.image.whole.ImageWholeJob;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.publicdatas.mission.text.whole.TextWholeJob;

import java.io.Serializable;

public enum TextMissionType implements Serializable {

    WHOLE(TextWholeJob.class);

    public final Class<? extends TextJob> clazz;

    TextMissionType(Class<? extends TextJob> clazz) {
        this.clazz = clazz;
    }

    public Class<? extends TextJob> getClazz() {
        return clazz;
    }
}
