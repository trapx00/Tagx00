package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Column;
import javax.persistence.Id;
import java.util.Date;

public class Favorite {
    @Id
    @Column(name = "favoriteId")
    private String favoriteId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "MissionType")
    private MissionType missionType;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "missionId")
    private String missionId;

    public Favorite() {
    }

    public Favorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, String missionId) {
        this.favoriteId = favoriteId;
        this.workerUsername = workerUsername;
        this.missionType = missionType;
        this.acceptDate = acceptDate;
        this.missionId = missionId;
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

    public String getMissionId() {
        return missionId;
    }

    public void setMissionId(String missionId) {
        this.missionId = missionId;
    }
}
