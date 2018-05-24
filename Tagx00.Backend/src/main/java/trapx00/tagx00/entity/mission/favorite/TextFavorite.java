package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "textFavorite")
public class TextFavorite extends Favorite {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "textMission_id")
    private TextMission textMission;

    public TextFavorite( ) {
    }

    public TextFavorite(String favoriteId, String workerUsername, MissionType missionType, Date acceptDate, String missionId, TextMission textMission) {
        super(favoriteId, workerUsername, missionType, acceptDate, missionId);
        this.textMission = textMission;
    }

    public TextMission getTextMission() {
        return textMission;
    }

    public void setTextMission(TextMission textMission) {
        this.textMission = textMission;
    }
}
