package trapx00.tagx00.publicdatas.mission.text.keyword;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.TagTuple;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.vo.mission.text.TextMissionType;

import java.util.List;

public class TextKeywordsJob extends TextJob {
    private List<TagTuple> tagTuples;

    public TextKeywordsJob(TextMissionType type, List<TagTuple> tagTuples) {
        super(type);
        this.tagTuples = tagTuples;
    }

    public TextKeywordsJob(List<TagTuple> tagTuples) {
        super(TextMissionType.KEYWORDS);
        this.tagTuples = tagTuples;
    }

    public List<TagTuple> getTagTuples() {
        return tagTuples;
    }

    public void setTagTuples(List<TagTuple> tagTuples) {
        this.tagTuples = tagTuples;
    }
}
