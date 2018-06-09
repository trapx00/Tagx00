package trapx00.tagx00.response.upload;

import trapx00.tagx00.response.Response;

public class UploadMissionAudioResponse extends Response {
    private String url;

    public UploadMissionAudioResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
