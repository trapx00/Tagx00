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
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.vo.admin.credit.CreditInfo;
import trapx00.tagx00.vo.admin.credit.CreditTypeDistribution;
import trapx00.tagx00.vo.admin.instance.InstanceInfo;
import trapx00.tagx00.vo.admin.instance.InstanceStateTypeDistribution;
import trapx00.tagx00.vo.admin.mission.MissionInfo;
import trapx00.tagx00.vo.admin.mission.MissionStateTypeDistribution;
import trapx00.tagx00.vo.admin.user.UserInfo;
import trapx00.tagx00.vo.admin.user.UserRegisterDate;
import trapx00.tagx00.vo.mission.requester.MissionDateNumVo;

import java.util.*;

import static trapx00.tagx00.publicdatas.mission.MissionState.*;

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


        int workerCredits = 0;
        int requesterCredits = 0;
        int missionCredits = 0;

        HashMap<MissionType, ArrayList<Integer>> creditData = new HashMap<>();
        HashMap<MissionType, InstanceStateTypeDistribution> instanceMap = new HashMap<>();
        HashMap<MissionType, MissionStateTypeDistribution> missionMap = new HashMap<>();
        for (MissionType type: MissionType.values()) {
            creditData.put(type, new ArrayList<>());
            instanceMap.put(type, new InstanceStateTypeDistribution(0,0,0,0));
            missionMap.put(type, new MissionStateTypeDistribution(0,0,0,0));
        }


        int requesterCount = 0;
        int workerCount = 0;
        HashMap<String, Integer> userRegisterMap = new HashMap<>();

        User[] users = userDataService.findAllUsers();
        for (User user : users) {
            if (user.getRole().equals(Role.ADMIN)) {
                continue;
            }
            if (user.getRole().equals(Role.REQUESTER)) {

                requesterCount++;
                requesterCredits += user.getCredits();

            } else if (user.getRole().equals(Role.WORKER)) {
                workerCount++;
                workerCredits += user.getCredits();
            }

            String date = generateDateStr(user.getRegisterDate());

            userRegisterMap.put(date, userRegisterMap.getOrDefault(date, 0)+1);

        }


        UserInfo userInfo = new UserInfo(requesterCount, workerCount, userRegisterMap);


        Mission[] missions = publicMissionDataService.getAllMissions();
        for (Mission mission : missions) {
            missionCredits += mission.getCredits();
            MissionStateTypeDistribution missionStateTypeDistribution = missionMap.get(mission.getMissionType());
            switch (mission.getMissionState()) {
                case ACTIVE:
                    missionStateTypeDistribution.setActive(missionStateTypeDistribution.getActive()+1);
                    break;
                case PENDING:
                    missionStateTypeDistribution.setPending(missionStateTypeDistribution.getPending()+1);
                    break;
                case ENDED:
                    missionStateTypeDistribution.setEnded(missionStateTypeDistribution.getEnded()+1);
                    break;
            }

        }

        MissionInfo missionInfo =new MissionInfo(missionMap);

        Instance[] instances = publicMissionDataService.getInstances();
        HashMap<String, Integer> acceptDateDistribution = new HashMap<>();

        for (Instance instance: instances) {
            InstanceStateTypeDistribution instanceStateTypeDistribution = instanceMap.get(instance.getMissionType());

            String date = generateDateStr(instance.getAcceptDate());

            acceptDateDistribution.put(
                date,
                acceptDateDistribution.getOrDefault(date, 0)+1
            );
            switch (instance.getMissionInstanceState()) {
                case IN_PROGRESS:
                    instanceStateTypeDistribution.setInProgress(instanceStateTypeDistribution.getInProgress()+1);
                    break;
                case ABANDONED:
                    instanceStateTypeDistribution.setAbandoned(instanceStateTypeDistribution.getAbandoned()+1);
                    break;
                case SUBMITTED:
                    instanceStateTypeDistribution.setSubmitted(instanceStateTypeDistribution.getSubmitted()+1);
                    break;
                case FINALIZED:
                    instanceStateTypeDistribution.setFinalized(instanceStateTypeDistribution.getFinalized()+1);
                    // add credit
                    creditData.get(instance.getMissionType()).add(instance.getCredits());
                    break;
            }
        }



        InstanceInfo instanceInfo = new InstanceInfo(acceptDateDistribution, instanceMap);

        // calculate credit data

        HashMap<MissionType, CreditTypeDistribution> creditMap = new HashMap<>();

        for (MissionType type: MissionType.values()) {
            ArrayList<Integer> data = creditData.get(type);

            if (data.size() == 0) {
                creditMap.put(type, new CreditTypeDistribution(0,0,0,0,0));
                continue;
            }

            data.sort(Comparator.comparingInt(x -> x));

            int low = data.get(0);

            int q1 = data.get(data.size()/4);

            int median = data.get(data.size()/2);

            int q3 = data.get(data.size()*3/4);

            int high = data.get(data.size()-1);

            creditMap.put(type, new CreditTypeDistribution(low,q1,median,q3,high));

        }

        CreditInfo creditInfo = new CreditInfo(requesterCredits, workerCredits, missionCredits, creditMap);



        return new AdminInfoResponse(
            missionInfo,
            instanceInfo,
            userInfo,
            creditInfo
        );
    }

    private String generateDateStr(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);  //use java.util.Date object as arguement
        return cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH)+1) + "-" + cal.get(Calendar.DAY_OF_MONTH);
    }
}
