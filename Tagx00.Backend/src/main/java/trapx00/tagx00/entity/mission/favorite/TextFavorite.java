package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class TextFavorite extends Favorite {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private TextMission textMission;

    public TextFavorite() {
    }

    public TextFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, TextMission textMission) {
        super(favoriteId, workerUsername, missionType, acceptDate);
        this.textMission = textMission;
    }

    public TextMission getTextMission() {
        return textMission;
    }

    public void setTextMission(TextMission textMission) {
        this.textMission = textMission;
    }
}
