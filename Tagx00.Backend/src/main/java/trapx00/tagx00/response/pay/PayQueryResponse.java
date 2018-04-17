package trapx00.tagx00.response.pay;

import trapx00.tagx00.response.Response;

public class PayQueryResponse extends Response {
    private int credits;

    public PayQueryResponse() {
    }

    public PayQueryResponse(int credits) {
        this.credits = credits;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
