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
        int submittedMissionCount = 0;
        int instanceCount = 0;
        int submittedInstanceCount = 0;
        int inProgressInstanceCount = 0;
        int finalizedInstanceCount = 0;
        int abandonedInstanceCount = 0;
        Mission[] missions = requesterInfoDataService.getMissionsByRequesterUsername(username);
        if (missions == null)
            return null;
        submittedMissionCount = missions.length;
        for (int i = 0; i < submittedMissionCount; i++) {
            Instance[] instances = requesterInfoDataService.getInstancesByMissionId(missions[i].getMissionId(),
                    missions[i].getMissionType());
            int instanceLength = instances == null ? 0 : instances.length;
            for (int j = 0; j < instanceLength; j++) {
                instanceCount++;
                switch (instances[j].getMissionInstanceState()) {
                    case SUBMITTED:
                        submittedInstanceCount++;
                        break;
                    case IN_PROGRESS:
                        inProgressInstanceCount++;
                        break;
                    case FINALIZED:
                        finalizedInstanceCount++;
                        break;
                    case ABANDONED:
                        abandonedInstanceCount++;
                        break;
                }
            }
        }
        return new RequesterInfoResponse(Converter.userToRequesterInfoVo(user, userDataService.getUserAvatarUrl(user.getEmail()) , submittedMissionCount,
                instanceCount, submittedInstanceCount, inProgressInstanceCount, finalizedInstanceCount,
            abandonedInstanceCount
        ));
    }
}
