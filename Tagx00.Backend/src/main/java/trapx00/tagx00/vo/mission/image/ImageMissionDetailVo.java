package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionAssetVo;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class ImageMissionDetailVo extends MissionDetailVo {

    private List<MissionAssetVo> missionAssetVos;
    private List<String> requesterTags;

    public ImageMissionDetailVo() {
    }

    public ImageMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, List<MissionAssetVo> missionAssetVos, List<String> requesterTags) {
        super(publicItem, missionState, requesterUsername, MissionType.IMAGE);
        this.missionAssetVos = missionAssetVos;
        this.requesterTags = requesterTags;
    }

    public List<MissionAssetVo> getMissionAssetVos() {
        return missionAssetVos;
    }

    public void setMissionAssetVos(List<MissionAssetVo> missionAssetVos) {
        this.missionAssetVos = missionAssetVos;
    }

    public List<String> getRequesterTags() {
        return requesterTags;
    }

    public void setRequesterTags(List<String> requesterTags) {
        this.requesterTags = requesterTags;
    }
}
