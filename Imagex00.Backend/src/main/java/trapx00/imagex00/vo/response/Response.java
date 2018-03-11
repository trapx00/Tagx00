package trapx00.imagex00.vo.response;

public class Response {
    private int infoCode;
    private String description;

    public Response(int infoCode, String description) {
        this.infoCode = infoCode;
        this.description = description;
    }

    public int getInfoCode() {
        return infoCode;
    }

    public void setInfoCode(int infoCode) {
        this.infoCode = infoCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
