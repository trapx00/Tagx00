package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.entity.mission.MissionAsset;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class ImageMissionDetailVo extends MissionDetailVo {

    private List<MissionAsset> missionAssets;

    private List<ImageMissionType> imageMissionTypes;

    public ImageMissionDetailVo() {
    }

    public ImageMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, MissionType missionType, List<MissionAsset> missionAssets, List<ImageMissionType> imageMissionTypes) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.missionAssets = missionAssets;
        this.imageMissionTypes = imageMissionTypes;
    }

    public List<MissionAsset> getMissionAssets() {
        return missionAssets;
    }

    public void setMissionAssets(List<MissionAsset> missionAssets) {
        this.missionAssets = missionAssets;
    }

    public List<ImageMissionType> getImageMissionTypes() {
        return imageMissionTypes;
    }

    public void setImageMissionTypes(List<ImageMissionType> imageMissionTypes) {
        this.imageMissionTypes = imageMissionTypes;
    }
}
