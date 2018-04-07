package trapx00.tagx00.bl.admin;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.dataservice.admin.AdminInfoDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.user.AdminInfoResponse;

public class AdminInfoBlServiceImpl implements AdminInfoBlService {
    private final AdminInfoDataService adminInfoDataService;
    @Autowired
    public AdminInfoBlServiceImpl (AdminInfoDataService adminInfoDataService) {
        this.adminInfoDataService = adminInfoDataService;
    }
    /**
     * get the info of userCount,totalMissionCount,totalInstanceCount...
     * @return AdminInfoResponse the combination of the infomation
     */
    @Override
    public AdminInfoResponse getAdminInfo() {

        int userCount=adminInfoDataService.getUsers()==null?0:adminInfoDataService.getUsers().length;
        int totalMissionCount=adminInfoDataService.getMissions()==null?0:adminInfoDataService.getMissions().length;
        int totalInstanceCount=adminInfoDataService.getInstances()==null?0:adminInfoDataService.getInstances().length;
        int inProgressInstanceCount=0;
        int submittedInstanceCount=0;
        int finalizeInstanceCount=0;
        Instance[] instances=adminInfoDataService.getInstances();
        for(int i=0;i<totalInstanceCount;i++){
            if(instances[i].getMissionInstanceState().equals(MissionInstanceState.IN_PROGRESS))
                inProgressInstanceCount++;
            else if(instances[i].getMissionInstanceState().equals(MissionInstanceState.SUBMITTED))
                submittedInstanceCount++;
            else if(instances[i].getMissionInstanceState().equals(MissionInstanceState.FINALIZED))
                finalizeInstanceCount++;
        }
        return new AdminInfoResponse(
                userCount,totalMissionCount,totalInstanceCount,inProgressInstanceCount,submittedInstanceCount,finalizeInstanceCount
        );
    }
}
