package trapx00.tagx00.publicdatas.mission.text.keyword;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.vo.mission.text.TextMissionType;

public class TextKeywordsJob extends TextJob {
    private TagDescriptionTuple tuple;

    public TextKeywordsJob (TextMissionType type, TagDescriptionTuple tuple) {
        super(type);
        this.tuple = tuple;
    }

    public TagDescriptionTuple getTuple() {
        return tuple;
    }

    public void setTuple(TagDescriptionTuple tuple) {
        this.tuple = tuple;
    }
}
