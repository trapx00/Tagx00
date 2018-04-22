package trapx00.tagx00.bl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.account.WorkerInfoBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.account.WorkerInfoDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.user.WorkerInfoResponse;
import trapx00.tagx00.util.Converter;

@Service
public class WorkerInfoBlServiceImpl implements WorkerInfoBlService {
    private final WorkerInfoDataService workerInfoDataService;
    private final UserDataService userDataService;

    @Autowired
    public WorkerInfoBlServiceImpl(WorkerInfoDataService workerInfoDataService, UserDataService userDataService) {
        this.workerInfoDataService = workerInfoDataService;
        this.userDataService = userDataService;
    }

    /**
     * get workerinfo of exp credits level and instance count
     *
     * @param workerUsername
     * @return
     */
    @Override
    public WorkerInfoResponse getWorkerInfo(String workerUsername) {
        User user = userDataService.getUserByUsername(workerUsername);
        int completedMissionCount = 0;
        int inProgressMissionCount = 0;
        int abandonedMissionCount = 0;
        int finalizedMissionCount = 0;
        Instance[] instances = workerInfoDataService.getInstanceByWorkerUsername(workerUsername);
        int instancesLength = instances == null ? 0 : instances.length;
        int acceptedMissionCount = instancesLength;
        for (int i = 0; i < instancesLength; i++) {
            if (instances[i].getMissionInstanceState() == MissionInstanceState.SUBMITTED) {
                completedMissionCount++;
            } else if (instances[i].getMissionInstanceState() == MissionInstanceState.IN_PROGRESS) {
                inProgressMissionCount++;
            } else if (instances[i].getMissionInstanceState() == MissionInstanceState.ABANDONED) {
                abandonedMissionCount++;
            } else if (instances[i].getMissionInstanceState() == MissionInstanceState.FINALIZED) {
                finalizedMissionCount++;
            }
        }
        return new WorkerInfoResponse(Converter.userToWorkerInfoVo(user, completedMissionCount, acceptedMissionCount,
                inProgressMissionCount, abandonedMissionCount, finalizedMissionCount));
    }
}
