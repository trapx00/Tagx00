package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class ImageFavorite extends Favorite {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private ImageMission imageMission;

    public ImageFavorite() {
    }

    public ImageFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, ImageMission imageMission) {
        super(favoriteId, workerUsername, missionType, acceptDate);
        this.imageMission = imageMission;
    }

    public ImageMission getImageMission() {
        return imageMission;
    }

    public void setImageMission(ImageMission imageMission) {
        this.imageMission = imageMission;
    }
}
