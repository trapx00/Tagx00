package trapx00.tagx00.publicdatas.mission.text;

import trapx00.tagx00.vo.mission.text.TextMissionType;

import java.io.Serializable;

public class TextJob implements Serializable {
    private TextMissionType type;

    public TextMissionType getType() {
        return type;
    }

    public void setType(TextMissionType type) {
        this.type = type;
    }

    public TextJob(TextMissionType type) {
        this.type = type;
    }

    public TextJob() {
    }
}



