package trapx00.tagx00.publicdatas.mission;

import java.io.Serializable;
import java.util.List;

public class TagDescriptionTuple implements Serializable {
    private List<TagTuple> tagTuples;
    private List<String> descriptions;

    public TagDescriptionTuple(List<TagTuple> tagTuples, List<String> descriptions) {
        this.tagTuples = tagTuples;
        this.descriptions = descriptions;
    }

    public List<TagTuple> getTagTuples() {
        return tagTuples;
    }

    public void setTagTuples(List<TagTuple> tagTuples) {
        this.tagTuples = tagTuples;
    }

    public List<String> getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(List<String> descriptions) {
        this.descriptions = descriptions;
    }
}
