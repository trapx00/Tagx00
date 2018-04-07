package trapx00.tagx00.bl.account;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.blservice.account.RequesterInfoBlService;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.user.RequesterInfoResponse;
import trapx00.tagx00.util.Converter;
import trapx00.tagx00.util.MissionUtil;


public class RequesterInfoBlServiceImpl implements RequesterInfoBlService{


    private final RequesterInfoDataService requesterInfoDataService;
    private final UserDataService userDataService;

    @Autowired
    public RequesterInfoBlServiceImpl (RequesterInfoDataService requesterInfoDataService,UserDataService userDataService) {
        this.requesterInfoDataService = requesterInfoDataService;
        this.userDataService=userDataService;
    }
    /**
     *  get requesterinfo such as missionCount and instanceCount
     * @param username
     * @return RequesterInfoResponse
     */
    @Override
    public RequesterInfoResponse getRequesterInfo(String username) {
        User user=requesterInfoDataService.getUserByUsername(username);
        int submittedMissionCount=0;
        int instanceCount=0;
        int awaitingCommentInstanceCount=0;
        int inProgressInstanceCount=0;
        int finalizedInstanceCount=0;
        Mission[]missions=requesterInfoDataService.getMissionsByRequesterUsername(username);
        submittedMissionCount=missions.length;
        for(int i=0;i<submittedMissionCount;i++){
            Instance[] instances=requesterInfoDataService.getInstancesByMissionId(missions[i].getMissionId(),
                    missions[i].getMissionType() );
            int instanceLength=instances==null? 0:instances.length;
            for(int j=0;j<instanceLength;j++){
                instanceCount++;
                if(instances[j].getMissionInstanceState().equals(MissionInstanceState.SUBMITTED))
                    awaitingCommentInstanceCount++;
                else if(instances[j].getMissionInstanceState().equals(MissionInstanceState.IN_PROGRESS))
                    inProgressInstanceCount++;
                else if(instances[j].getMissionInstanceState().equals(MissionInstanceState.FINALIZED))
                    finalizedInstanceCount++;
            }
        }
        return new RequesterInfoResponse(Converter.userToRequesterInfoVo(user,submittedMissionCount,
                instanceCount,awaitingCommentInstanceCount,inProgressInstanceCount,finalizedInstanceCount
                ));
    }
}
