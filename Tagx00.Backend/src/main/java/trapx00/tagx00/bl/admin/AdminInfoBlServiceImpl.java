package trapx00.tagx00.bl.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.vo.mission.requester.MissionDateNumVo;

import java.util.ArrayList;
import java.util.Date;

@Service
public class AdminInfoBlServiceImpl implements AdminInfoBlService {
    private final PublicMissionDataService publicMissionDataService;
    private final UserDataService userDataService;

    @Autowired
    public AdminInfoBlServiceImpl(PublicMissionDataService publicMissionDataService, UserDataService userDataService) {
        this.publicMissionDataService = publicMissionDataService;
        this.userDataService = userDataService;
    }

    /**
     * get the info of userCount,totalMissionCount,totalInstanceCount...
     *
     * @return AdminInfoResponse the combination of the information
     */
    @Override
    public AdminInfoResponse getAdminInfo() {

        User[] users = userDataService.findAllUsers();
        ArrayList<User> userResult = new ArrayList<>();
        for (User user : users) {
            if (!user.getRoles().contains(Role.ADMIN)) {
                userResult.add(user);
            }
        }
        users = userResult.toArray(new User[userResult.size()]);
        Mission[] missions = publicMissionDataService.getAllMissions();
        Instance[] instances = publicMissionDataService.getInstances();
        int userCount = users.length;
        int totalMissionCount = missions.length;
        int pendingMissionCount = 0;
        int activeMissionCount = 0;
        int endedMissionCount = 0;
        int totalInstanceCount = instances.length;
        int inProgressInstanceCount = 0;
        int submittedInstanceCount = 0;
        int finalizeInstanceCount = 0;
        ArrayList<MissionDateNumVo> missionDateNumVos = new ArrayList<>();
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
            boolean isExist = false;
            for (MissionDateNumVo missionDateNumVo : missionDateNumVos) {
                if (missionDateNumVo.getDate().equals(generateDateStr(instance.getAcceptDate()))) {
                    missionDateNumVo.setNum(missionDateNumVo.getNum() + 1);
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                missionDateNumVos.add(new MissionDateNumVo(generateDateStr(instance.getAcceptDate()), 1));
            }
        }
        for (Mission mission : missions) {
            switch (mission.getMissionState()) {
                case PENDING:
                    pendingMissionCount++;
                    break;
                case ACTIVE:
                    activeMissionCount++;
                    break;
                case ENDED:
                    endedMissionCount++;
                    break;
            }
        }
        return new AdminInfoResponse(userCount, totalMissionCount, pendingMissionCount, activeMissionCount, endedMissionCount, totalInstanceCount, inProgressInstanceCount, submittedInstanceCount, finalizeInstanceCount, missionDateNumVos);
    }

    private String generateDateStr(Date date) {
        return date.getYear() + "-" + date.getMonth() + "-" + date.getDay();
    }
}
