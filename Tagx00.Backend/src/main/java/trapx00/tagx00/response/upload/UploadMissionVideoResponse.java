package trapx00.tagx00.response.upload;

import trapx00.tagx00.response.Response;

public class UploadMissionVideoResponse extends Response {
    private String url;

    public UploadMissionVideoResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
