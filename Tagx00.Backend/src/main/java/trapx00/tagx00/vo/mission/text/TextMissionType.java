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

    public final Class<? extends TextJob> jobClass;
    public final Class<? extends TextMissionSetting> settingClass;

    TextMissionType(Class<? extends TextJob> jobClass, Class<? extends TextMissionSetting> settingClass) {
        this.jobClass = jobClass;
        this.settingClass = settingClass;
    }

    public Class<? extends TextJob> getJobClass() {
        return jobClass;
    }

    public Class<? extends TextMissionSetting> getSettingClass() {
        return settingClass;
    }
}
