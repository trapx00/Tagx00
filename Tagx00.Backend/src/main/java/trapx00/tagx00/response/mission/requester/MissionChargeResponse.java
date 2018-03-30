package trapx00.tagx00.response.mission.requester;

import trapx00.tagx00.response.Response;

public class MissionChargeResponse extends Response {
    private int remainingCredits;

    public MissionChargeResponse() {
    }

    public MissionChargeResponse(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }

    public int getRemainingCredits() {
        return remainingCredits;
    }

    public void setRemainingCredits(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }
}
