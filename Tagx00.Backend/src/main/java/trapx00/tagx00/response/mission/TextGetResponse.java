package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;

public class TextGetResponse extends Response {
    private String text;

    public TextGetResponse() {
    }

    public TextGetResponse(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
