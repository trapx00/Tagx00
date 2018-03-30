package trapx00.tagx00.response.pay;

import trapx00.tagx00.response.Response;

public class PayResponse extends Response {
    private int remainingCredits;

    public PayResponse() {
    }

    public PayResponse(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }

    public int getRemainingCredits() {
        return remainingCredits;
    }

    public void setRemainingCredits(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }
}
