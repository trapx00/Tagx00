package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.publicdatas.mission.text.classification.TextClassificationJob;
import trapx00.tagx00.publicdatas.mission.text.keyword.TextKeywordsJob;

import java.io.Serializable;

public enum TextMissionType implements Serializable {

    CLASSIFICATION(TextClassificationJob.class),
    KEYWORDS(TextKeywordsJob.class);

    public final Class<? extends TextJob> clazz;

    TextMissionType(Class<? extends TextJob> clazz) {
        this.clazz = clazz;
    }

    public Class<? extends TextJob> getClazz() {
        return clazz;
    }
}
