package trapx00.tagx00.response.mission;

public class ThreeModel {
    private String mtl;
    private String obj;

    public ThreeModel() {
    }

    public ThreeModel(String mtl, String obj) {
        this.mtl = mtl;
        this.obj = obj;
    }

    public String getMtl() {
        return mtl;
    }

    public void setMtl(String mtl) {
        this.mtl = mtl;
    }

    public String getObj() {
        return obj;
    }

    public void setObj(String obj) {
        this.obj = obj;
    }
}
