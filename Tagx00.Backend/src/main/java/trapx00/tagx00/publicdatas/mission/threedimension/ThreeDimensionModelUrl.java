package trapx00.tagx00.publicdatas.mission.threedimension;

public class ThreeDimensionModelUrl {
    private String objUrl;
    private String mtlUrl;

    public ThreeDimensionModelUrl() {
    }

    public ThreeDimensionModelUrl(String objUrl, String mtlUrl) {
        this.objUrl = objUrl;
        this.mtlUrl = mtlUrl;
    }

    public String getObjUrl() {
        return objUrl;
    }

    public void setObjUrl(String objUrl) {
        this.objUrl = objUrl;
    }

    public String getMtlUrl() {
        return mtlUrl;
    }

    public void setMtlUrl(String mtlUrl) {
        this.mtlUrl = mtlUrl;
    }
}
