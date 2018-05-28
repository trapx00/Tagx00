package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionClassificationSetting;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionKeywordsSettings;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.publicdatas.mission.text.classification.TextClassificationJob;
import trapx00.tagx00.publicdatas.mission.text.keyword.TextKeywordsJob;

import java.io.Serializable;

public enum TextMissionType implements Serializable {

    CLASSIFICATION(TextClassificationJob.class, TextMissionClassificationSetting.class),
    KEYWORDS(TextKeywordsJob.class, TextMissionKeywordsSettings.class);

    public final Class<? extends TextJob> clazz;
    public final Class<? extends TextMissionSetting> textMissionClazz;

    TextMissionType(Class<? extends TextJob> clazz, Class<? extends TextMissionSetting> textMissionClazz) {
        this.clazz = clazz;
        this.textMissionClazz = textMissionClazz;
    }

    public Class<? extends TextJob> getClazz() {
        return clazz;
    }

    public Class<? extends TextMissionSetting> getTextMissionClazz() {
        return textMissionClazz;
    }
}
