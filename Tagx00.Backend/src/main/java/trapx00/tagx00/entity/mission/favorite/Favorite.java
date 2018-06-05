package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "favorite")
public class Favorite {
    @Id
    private String favoriteId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "MissionType")
    private MissionType missionType;

    @Column(name = "acceptDate")
    private Date acceptDate;

    public Favorite() {
    }

    public Favorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate) {
        this.favoriteId = favoriteId;
        this.workerUsername = workerUsername;
        this.missionType = missionType;
        this.acceptDate = acceptDate;
    }

    public String getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(String favoriteId) {
        this.favoriteId = favoriteId;
    }

    public String getWorkerUsername() {
        return workerUsername;
    }

    public void setWorkerUsername(String workerUsername) {
        this.workerUsername = workerUsername;
    }

    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
    }

    public Date getAcceptDate() {
        return acceptDate;
    }

    public void setAcceptDate(Date acceptDate) {
        this.acceptDate = acceptDate;
    }
}
