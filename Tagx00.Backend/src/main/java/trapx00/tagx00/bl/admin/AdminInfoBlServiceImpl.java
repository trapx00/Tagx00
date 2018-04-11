package trapx00.tagx00.bl.admin;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.dataservice.admin.AdminInfoDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.dataservice.admin.AdminInfoDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.response.user.AdminInfoResponse;

@Service
public class AdminInfoBlServiceImpl implements AdminInfoBlService {
    private final AdminInfoDataService adminInfoDataService;


    @Autowired
    public AdminInfoBlServiceImpl(AdminInfoDataService adminInfoDataService) {
        this.adminInfoDataService = adminInfoDataService;
    }

    /**
     * get the info of userCount,totalMissionCount,totalInstanceCount...
     *
     * @return AdminInfoResponse the combination of the information
     */
    @Override
    public AdminInfoResponse getAdminInfo() {

        User[] users = adminInfoDataService.getUsers();
        Mission[] missions = adminInfoDataService.getMissions();
        Instance[] instances = adminInfoDataService.getInstances();
        int userCount = users.length;
        int totalMissionCount = missions.length;
        int totalInstanceCount = instances.length;
        int inProgressInstanceCount = 0;
        int submittedInstanceCount = 0;
        int finalizeInstanceCount = 0;
        for (Instance instance : instances) {
            switch (instance.getMissionInstanceState()) {
                case IN_PROGRESS:
                    inProgressInstanceCount++;
                    break;
                case SUBMITTED:
                    submittedInstanceCount++;
                    break;
                case FINALIZED:
                    finalizeInstanceCount++;
                    break;
            }
        }
        return new AdminInfoResponse(userCount, totalMissionCount, totalInstanceCount, inProgressInstanceCount, submittedInstanceCount, finalizeInstanceCount);
    }
}
