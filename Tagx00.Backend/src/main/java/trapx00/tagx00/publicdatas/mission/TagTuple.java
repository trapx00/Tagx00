package trapx00.tagx00.publicdatas.mission;

import java.io.Serializable;
import java.util.List;

public class TagTuple implements Serializable {
    private String tag;
    private List<String> descriptions;

    public TagTuple() {
    }

    public TagTuple(String tag, List<String> descriptions) {
        this.tag = tag;
        this.descriptions = descriptions;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public List<String> getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(List<String> descriptions) {
        this.descriptions = descriptions;
    }
}
