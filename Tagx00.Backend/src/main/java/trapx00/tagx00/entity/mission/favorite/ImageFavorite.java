package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "imageFavorite")
public class ImageFavorite extends Favorite {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_id")
    private ImageMission imageMission;

    public ImageFavorite() {
    }

    public ImageFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, int missionId, ImageMission imageMission) {
        super(favoriteId, workerUsername, missionType, acceptDate, missionId);
        this.imageMission = imageMission;
    }

    public ImageMission getImageMission() {
        return imageMission;
    }

    public void setImageMission(ImageMission imageMission) {
        this.imageMission = imageMission;
    }
}
