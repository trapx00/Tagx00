package trapx00.tagx00.bl.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.account.RequesterInfoBlService;
import trapx00.tagx00.blservice.account.WorkerInfoBlService;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.response.user.AdminUserResponse;
import trapx00.tagx00.util.Converter;
import trapx00.tagx00.vo.admin.credit.CreditInfo;
import trapx00.tagx00.vo.admin.credit.CreditTypeDistribution;
import trapx00.tagx00.vo.admin.instance.InstanceInfo;
import trapx00.tagx00.vo.admin.instance.InstanceStateTypeDistribution;
import trapx00.tagx00.vo.admin.mission.MissionBrief;
import trapx00.tagx00.vo.admin.mission.MissionInfo;
import trapx00.tagx00.vo.admin.mission.MissionStateTypeDistribution;
import trapx00.tagx00.vo.admin.user.UserInfo;
import trapx00.tagx00.vo.user.info.RequesterInfoVo;
import trapx00.tagx00.vo.user.info.UserInfoVo;
import trapx00.tagx00.vo.user.info.WorkerInfoVo;

import java.util.*;

@Service
public class AdminInfoBlServiceImpl implements AdminInfoBlService {
    private final PublicMissionDataService publicMissionDataService;
    private final UserDataService userDataService;
    private final RequesterInfoBlService requesterInfoBlService;
    private final WorkerInfoBlService workerInfoBlService;


    @Autowired
    public AdminInfoBlServiceImpl(PublicMissionDataService publicMissionDataService, UserDataService userDataService, RequesterInfoBlService requesterInfoBlService, WorkerInfoBlService workerInfoBlService) {
        this.publicMissionDataService = publicMissionDataService;
        this.userDataService = userDataService;
        this.requesterInfoBlService = requesterInfoBlService;
        this.workerInfoBlService = workerInfoBlService;
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
            instanceMap.put(type, new InstanceStateTypeDistribution(new ArrayList<>(),new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
            missionMap.put(type, new MissionStateTypeDistribution(new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
        }


        ArrayList<RequesterInfoVo> requesterInfoVos= new ArrayList<>();
        ArrayList<WorkerInfoVo> workerInfoVos = new ArrayList<>();
        HashMap<String, List<UserInfoVo>> userRegisterMap = new HashMap<>();

        User[] users = userDataService.findAllUsers();
        for (User user : users) {
            if (user.getRole().equals(Role.ADMIN)) {
                continue;
            }
            if (user.getRole().equals(Role.REQUESTER)) {

                requesterInfoVos.add(requesterInfoBlService.getRequesterInfo(user.getUsername()).getInfo());
                requesterCredits += user.getCredits();

            } else if (user.getRole().equals(Role.WORKER)) {
                workerInfoVos.add(workerInfoBlService.getWorkerInfo(user.getUsername()).getInfo());
                workerCredits += user.getCredits();
            }

            String date = Converter.generateDateStr(user.getRegisterDate());

            UserInfoVo vo = new UserInfoVo(user.getUsername(), user.getEmail(), user.getRole().getName(), Converter.generateDateStr(user.getRegisterDate()), userDataService.getUserAvatarUrl(user.getEmail()));
            if (userRegisterMap.containsKey(date)) {
                List<UserInfoVo> list = userRegisterMap.get(date);
                list.add(vo);
            } else {
                ArrayList<UserInfoVo> list = new ArrayList<>();
                list.add(vo);
                userRegisterMap.put(date, list);
            }


        }


        UserInfo userInfo = new UserInfo(requesterInfoVos, workerInfoVos, userRegisterMap);


        Mission[] missions = publicMissionDataService.getAllMissions();
        for (Mission mission : missions) {
            missionCredits += mission.getCredits();
            MissionStateTypeDistribution missionStateTypeDistribution = missionMap.get(mission.getMissionType());

            MissionBrief brief = new MissionBrief(mission.getMissionId(), mission.getMissionType(), mission.getMissionState());

            switch (mission.getMissionState()) {
                case ACTIVE:
                    missionStateTypeDistribution.getActive().add(brief);
                    break;
                case PENDING:
                    missionStateTypeDistribution.getPending().add(brief);
                    break;
                case ENDED:
                    missionStateTypeDistribution.getEnded().add(brief);
                    break;
            }

        }

        MissionInfo missionInfo =new MissionInfo(missionMap);

        Instance[] instances = publicMissionDataService.getInstances();
        HashMap<String, List<String>> acceptDateDistribution = new HashMap<>();

        for (Instance instance: instances) {
            InstanceStateTypeDistribution instanceStateTypeDistribution = instanceMap.get(instance.getMissionType());

            String date = Converter.generateDateStr(instance.getAcceptDate());

            if (acceptDateDistribution.containsKey(date)) {
                acceptDateDistribution.get(date).add(instance.getInstanceId());
            } else {
                ArrayList<String> strings = new ArrayList<>();
                strings.add(instance.getInstanceId());
                acceptDateDistribution.put(date, strings);
            }

            switch (instance.getMissionInstanceState()) {
                case IN_PROGRESS:
                    instanceStateTypeDistribution.getInProgress().add(instance.getInstanceId());
                    break;
                case ABANDONED:
                    instanceStateTypeDistribution.getAbandoned().add(instance.getInstanceId());
                    break;
                case SUBMITTED:
                    instanceStateTypeDistribution.getSubmitted().add(instance.getInstanceId());
                    break;
                case FINALIZED:
                    instanceStateTypeDistribution.getFinalized().add(instance.getInstanceId());
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

    @Override
    public AdminUserResponse getUsers() {
        ArrayList<UserInfoVo> userInfo = new ArrayList<>();
        User[] users = userDataService.findAllUsers();
        for (User user : users) {
            if (user.getRole().equals(Role.ADMIN)) {
                continue;
            }
            if (user.getRole().equals(Role.REQUESTER)) {
                userInfo.add(requesterInfoBlService.getRequesterInfo(user.getUsername()).getInfo());
            } else if (user.getRole().equals(Role.WORKER)) {
                userInfo.add(workerInfoBlService.getWorkerInfo(user.getUsername()).getInfo());
            }

        }
        return new AdminUserResponse(userInfo);
    }

}
