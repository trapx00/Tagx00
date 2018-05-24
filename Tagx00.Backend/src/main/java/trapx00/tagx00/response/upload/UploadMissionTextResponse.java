package trapx00.tagx00.response.upload;

import trapx00.tagx00.response.Response;

public class UploadMissionTextResponse extends Response {
    private String url;

    public UploadMissionTextResponse() {
    }

    public UploadMissionTextResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
