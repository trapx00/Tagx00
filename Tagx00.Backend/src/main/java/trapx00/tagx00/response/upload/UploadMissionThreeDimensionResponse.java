package trapx00.tagx00.response.upload;

import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionModelUrl;
import trapx00.tagx00.response.Response;

public class UploadMissionThreeDimensionResponse extends Response {
    private String url; // the url for the file uploaded

    public UploadMissionThreeDimensionResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
