package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;

import java.util.Map;

public class ImageIdentificationResponse extends Response {
    private Map<String, Double> objects;

    public ImageIdentificationResponse() {
    }

    public ImageIdentificationResponse(Map<String, Double> objects) {
        this.objects = objects;
    }

    public Map<String, Double> getObjects() {
        return objects;
    }

    public void setObjects(Map<String, Double> objects) {
        this.objects = objects;
    }
}
