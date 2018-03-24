package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;

public class MissionCreateResponse extends Response {
    private String id;
    private String token;

    public MissionCreateResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public MissionCreateResponse(String id, String token) {
        this.id = id;
        this.token = token;
    }
}