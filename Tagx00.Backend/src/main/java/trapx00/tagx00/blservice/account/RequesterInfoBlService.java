package trapx00.tagx00.blservice.account;

import org.springframework.stereotype.Service;
import trapx00.tagx00.response.user.RequesterInfoResponse;

@Service
public interface RequesterInfoBlService {

    /**
     *  get requesterinfo such as missionCount and instanceCount
     * @param username
     * @return RequesterInfoResponse
     */
    RequesterInfoResponse getRequesterInfo (String username);
}
