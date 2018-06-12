package trapx00.tagx00.entity.mission.instance;

import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.instance.workresult.TextResult;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class TextInstance extends Instance {
    @Transient
    private List<TextResult> textResults;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private TextMission textMission;

    public TextInstance() {

    }

    public TextInstance(List<TextResult> textResults, TextMission textMission) {
        this.textResults = textResults;
        this.textMission = textMission;
    }

    public TextInstance(String instanceId,
                        String workerUsername,
                        MissionInstanceState missionInstanceState,
                        MissionType missionType, Date acceptDate,
                        Date submitDate, boolean submitted, String missionId, double exp,
                        double expRatio, int credits, String comment, List<TextResult> textResults,
                        TextMission textMission) {
        super(instanceId, workerUsername, missionInstanceState, missionType, acceptDate, submitDate, submitted, missionId, exp, expRatio, credits, comment);
        this.textResults = textResults;
        this.textMission = textMission;
    }

    public List<TextResult> getTextResults() {
        return textResults;
    }

    public void setTextResults(List<TextResult> textResults) {
        this.textResults = textResults;
    }

    public TextMission getTextMission() {
        return textMission;
    }

    public void setTextMission(TextMission textMission) {
        this.textMission = textMission;
    }
}
