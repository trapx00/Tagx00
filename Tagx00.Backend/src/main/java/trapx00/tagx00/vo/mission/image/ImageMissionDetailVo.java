package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionDetailVo extends MissionDetailVo {

    private List<String> imageUrls;

    private List<ImageMissionType> imageMissionTypes;

    public ImageMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState) {
        super(publicItem, missionState);
    }
}
