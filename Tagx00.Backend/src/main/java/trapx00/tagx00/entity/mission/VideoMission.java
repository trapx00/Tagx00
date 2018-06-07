package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.favorite.AudioFavortie;
import trapx00.tagx00.entity.mission.favorite.VideoFavortie;
import trapx00.tagx00.entity.mission.instance.AudioInstance;
import trapx00.tagx00.entity.mission.instance.VideoInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class VideoMission extends Mission {
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = String.class)
    private List<String> allowedTags;
    @Column(name = "videoUrls")
    @ElementCollection(targetClass = String.class)
    private List<String> videoUrls;
    @Column(name = "videoMissionType")
    @ElementCollection(targetClass = VideoMissionType.class)
    private List<VideoMissionType> videoMissionTypes;
    @OneToMany(mappedBy = "videoMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<VideoInstance> videoInstances;
    @OneToMany(mappedBy = "videoMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<VideoFavortie> videoFavorties;

    public VideoMission() {
    }

    public VideoMission(String missionId, String title, String description, List<String> topics, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, List<String> browserUsers, boolean allowCustomTag, List<String> allowedTags, List<String> videoUrls, List<VideoMissionType> videoMissionTypes, List<VideoInstance> videoInstances, List<VideoFavortie> videoFavorties) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.videoUrls = videoUrls;
        this.videoMissionTypes = videoMissionTypes;
        this.videoInstances = videoInstances;
        this.videoFavorties = videoFavorties;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getVideoUrls() {
        return videoUrls;
    }

    public void setVideoUrls(List<String> videoUrls) {
        this.videoUrls = videoUrls;
    }

    public List<VideoMissionType> getVideoMissionTypes() {
        return videoMissionTypes;
    }

    public void setVideoMissionTypes(List<VideoMissionType> videoMissionTypes) {
        this.videoMissionTypes = videoMissionTypes;
    }

    public List<VideoInstance> getVideoInstances() {
        return videoInstances;
    }

    public void setVideoInstances(List<VideoInstance> videoInstances) {
        this.videoInstances = videoInstances;
    }

    public List<VideoFavortie> getVideoFavorties() {
        return videoFavorties;
    }

    public void setVideoFavorties(List<VideoFavortie> videoFavorties) {
        this.videoFavorties = videoFavorties;
    }
}
