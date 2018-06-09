package trapx00.tagx00.publicdatas.mission.text.classification;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.TagTuple;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.vo.mission.text.TextMissionType;

import java.util.List;

public class TextClassificationJob extends TextJob {
    private List<TagTuple> tagTuples;

    public TextClassificationJob() {
    }

    public TextClassificationJob(List<TagTuple> tagTuples) {
        super(TextMissionType.CLASSIFICATION);
        this.tagTuples = tagTuples;
    }

    public List<TagTuple> getTagTuples() {
        return tagTuples;
    }

    public void setTagTuples(List<TagTuple> tagTuples) {
        this.tagTuples = tagTuples;
    }
}
