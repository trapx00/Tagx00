package trapx00.tagx00.vo.mission.video;


import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.publicdatas.mission.video.part.VideoPartJob;
import trapx00.tagx00.publicdatas.mission.video.whole.VideoWholeJob;

import java.io.Serializable;

public enum VideoMissionType implements Serializable {

    WHOLE(VideoWholeJob.class),
    PART(VideoPartJob.class);

    public final Class<? extends VideoJob> clazz;

    VideoMissionType(Class<? extends VideoJob> clazz) {
        this.clazz = clazz;
    }

    public Class<? extends VideoJob> getClazz() {
        return clazz;
    }
}
