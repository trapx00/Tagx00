package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;

public class ThreeModelGetResponse extends Response {
    private ThreeModel model;

    public ThreeModelGetResponse() {
    }

    public ThreeModelGetResponse(ThreeModel model) {
        this.model = model;
    }

    public ThreeModel getModel() {
        return model;
    }

    public void setModel(ThreeModel model) {
        this.model = model;
    }
}
