package trapx00.tagx00.response.mission.requester;

import trapx00.tagx00.response.Response;

public class MissionRequestQueryResponse extends Response {
    private int remainingCredits;

    public MissionRequestQueryResponse() {
    }

    public MissionRequestQueryResponse(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }

    public int getRemainingCredits() {
        return remainingCredits;
    }

    public void setRemainingCredits(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }
}
