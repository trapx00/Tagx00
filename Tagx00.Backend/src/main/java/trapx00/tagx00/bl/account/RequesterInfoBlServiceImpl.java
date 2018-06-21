package trapx00.tagx00.bl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.account.RequesterInfoBlService;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.response.user.RequesterInfoResponse;
import trapx00.tagx00.util.Converter;
import trapx00.tagx00.vo.user.info.RequesterInfoVo;

@Service
public class RequesterInfoBlServiceImpl implements RequesterInfoBlService {


    private final RequesterInfoDataService requesterInfoDataService;
    private final UserDataService userDataService;

    @Autowired
    public RequesterInfoBlServiceImpl(RequesterInfoDataService requesterInfoDataService, UserDataService userDataService) {
        this.requesterInfoDataService = requesterInfoDataService;
        this.userDataService = userDataService;
    }

    /**
     * get requesterinfo such as missionCount and instanceCount
     *
     * @param username
     * @return RequesterInfoResponse
     */
    @Override
    public RequesterInfoResponse getRequesterInfo(String username) {
        User user = userDataService.getUserByUsername(username);
        int pending = 0;
        int active = 0;
        int ended =0;
        Mission[] missions = requesterInfoDataService.getMissionsByRequesterUsername(username);

        for (Mission m : missions) {
            switch (m.getMissionState()) {
                case PENDING:
                    pending++;
                    break;
                case ENDED:
                    ended++;
                    break;
                case ACTIVE:
                    active++;
                    break;
            }
        }

        return new RequesterInfoResponse(
            new RequesterInfoVo(
                username,
                user.getEmail(),
                Converter.generateDateStr(user.getRegisterDate()),
                userDataService.getUserAvatarUrl(user.getEmail()),
                pending,
                active,
                ended
            ));
    }
}
