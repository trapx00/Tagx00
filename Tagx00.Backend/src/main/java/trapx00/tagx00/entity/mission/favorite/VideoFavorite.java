package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.AudioMission;
import trapx00.tagx00.entity.mission.VideoMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class VideoFavorite extends Favorite
{
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private VideoMission videoMission;

    public VideoFavorite() {
    }

    public VideoFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, VideoMission videoMission) {
        super(favoriteId, workerUsername, missionType, acceptDate);
        this.videoMission = videoMission;
    }

    public VideoMission getVideoMission() {
        return videoMission;
    }

    public void setVideoMission(VideoMission videoMission) {
        this.videoMission = videoMission;
    }
}
