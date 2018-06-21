package trapx00.tagx00.datacollect;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class DataObject {
    private String url;
    private List<String> tags;
    private List<TagConfTuple> response;
    private List<TagConfTuple> baiduResponse;

    public DataObject(String url, List<String> tags, List<TagConfTuple> response, List<TagConfTuple> baiduResponse) {
        this.url = url;
        this.tags = tags;
        this.response = response;
        this.baiduResponse = baiduResponse;
    }


    public List<TagConfTuple> getBaiduResponse() {
        return baiduResponse;
    }

    public void setBaiduResponse(List<TagConfTuple> baiduResponse) {
        this.baiduResponse = baiduResponse;
    }

    public DataObject() {
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
