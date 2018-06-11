package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.ThreeDimensionMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class ThreeDimensionFavorite extends Favorite {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private ThreeDimensionMission threeDimensionMission;

    public ThreeDimensionFavorite() {

    }

    public ThreeDimensionFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, ThreeDimensionMission threeDimensionMission) {
        super(favoriteId, workerUsername, missionType, acceptDate);
        this.threeDimensionMission = threeDimensionMission;
    }

    public ThreeDimensionMission getThreeDimensionMission() {
        return threeDimensionMission;
    }

    public void setThreeDimensionMission(ThreeDimensionMission threeDimensionMission) {
        this.threeDimensionMission = threeDimensionMission;
    }
}
