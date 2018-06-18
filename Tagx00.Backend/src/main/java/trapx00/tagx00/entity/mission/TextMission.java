package trapx00.tagx00.entity.mission;


import trapx00.tagx00.entity.mission.instance.TextInstance;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "textMission")
public class TextMission extends Mission {
    @Column(name = "textTokens")
    @OneToMany(mappedBy = "textMission", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private Set<TextToken> textTokens;
    @Column(name = "textMissionSettings")
    @ElementCollection(targetClass = TextMissionSetting.class)
    private List<TextMissionSetting> textMissionSettings;
    @OneToMany(mappedBy = "textMission", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<TextInstance> textInstances;

    public TextMission() {
    }

    public TextMission(String missionId, String title, String description, List<String> topics, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, Set<TextToken> textTokens, List<TextMissionSetting> textMissionSettings, List<TextInstance> textInstances) {
        super(missionId, title, description, topics, MissionType.TEXT, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel);
        this.textTokens = textTokens;
        this.textMissionSettings = textMissionSettings;
        this.textInstances = textInstances;
    }

    public Set<TextToken> getTextTokens() {
        return textTokens;
    }

    public void setTextTokens(Set<TextToken> textTokens) {
        this.textTokens = textTokens;
    }

    public List<TextMissionSetting> getTextMissionSettings() {
        return textMissionSettings;
    }

    public void setTextMissionSettings(List<TextMissionSetting> textMissionSettings) {
        this.textMissionSettings = textMissionSettings;
    }

    public List<TextInstance> getTextInstances() {
        return textInstances;
    }

    public void setTextInstances(List<TextInstance> textInstances) {
        this.textInstances = textInstances;
    }
}
