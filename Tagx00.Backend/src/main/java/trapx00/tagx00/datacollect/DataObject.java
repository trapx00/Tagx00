package trapx00.tagx00.datacollect;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class DataObject {
    private String url;
    private List<String> tags;
    private List<TagConfTuple> response;

    public DataObject() {
    }

    public DataObject(String url, List<String> tags, List<TagConfTuple> response) {
        this.url = url;
        this.tags = tags;
        this.response = response;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<TagConfTuple> getResponse() {
        return response;
    }

    public void setResponse(List<TagConfTuple> response) {
        this.response = response;
    }
}
