package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;

import java.util.List;

public class WordSegmentationResponse extends Response {
    private List<String> results;

    public WordSegmentationResponse(List<String> results) {
        this.results = results;
    }

    public List<String> getResults() {
        return results;
    }

    public void setResults(List<String> results) {
        this.results = results;
    }
}
