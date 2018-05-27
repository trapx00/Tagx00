package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class ImageMissionProperties extends MissionProperties {

    private boolean allowCustomTag;
    private List<String> allowedTags;
    private List<ImageMissionType> imageMissionTypes;

    public ImageMissionProperties() {
    }

    public ImageMissionProperties(boolean allowCustomTag, List<String> allowedTags, List<ImageMissionType> imageMissionTypes) {
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.imageMissionTypes = imageMissionTypes;
    }

    public ImageMissionProperties(MissionType type, boolean allowCustomTag, List<String> allowedTags, List<ImageMissionType> imageMissionTypes) {
        super(type);
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.imageMissionTypes = imageMissionTypes;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }

    public List<ImageMissionType> getImageMissionTypes() {
        return imageMissionTypes;
    }

    public void setImageMissionTypes(List<ImageMissionType> imageMissionTypes) {
        this.imageMissionTypes = imageMissionTypes;
    }
}
