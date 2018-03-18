package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionDoesNotExistFromUsernameException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryDetailVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;
import trapx00.tagx00.vo.mission.worker.MissionWorkerQueryItemVo;

import java.util.Arrays;

@Service
public class WorkerMissionBlServiceImpl implements WorkerMissionBlService {
    private final WorkerMissionDataService workerMissionDataService;

    @Autowired
    public WorkerMissionBlServiceImpl(WorkerMissionDataService workerMissionDataService){
        this.workerMissionDataService=workerMissionDataService;
    }

    /**
     * query to get all missions of workers
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public MissionQueryResponse queryOnesAllMissions(String username) throws MissionDoesNotExistFromUsernameException {

        MissionWorkerQueryItemVo[]result= workerMissionDataService.getMissionByUsername(username);

        if(result==null)
            throw new MissionDoesNotExistFromUsernameException();
        MissionRequesterQueryItemVo[]requesterQueryItemVos=new MissionRequesterQueryItemVo[result.length];
        for(int i=0;i<requesterQueryItemVos.length;i++){
            Mission mission=workerMissionDataService.getMissionByMissionId(result[i].getMissionId());
            requesterQueryItemVos[i]=new MissionRequesterQueryItemVo(result[i].getTitle(),
                    result[i].getDescription(),result[i].getMission(),mission.getMissionState(),
                    result[i].getCoverUrl());
        }
        return new MissionQueryResponse(Arrays.asList(requesterQueryItemVos));
    }

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param username
     * @return whether the abortion is successful
     */
    @Override
    public SuccessResponse abort(int missionId, String username) {
        workerMissionDataService.deleteInstance(missionId, username) ;
        return new SuccessResponse("Success Delete");
    }

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param username
     * @return MissionQueryDetailResponse the detail of the mission
     */
    @Override
    public MissionQueryDetailResponse getInstanceInformation(int missionId, String username) throws InstanceNotExistException {
        MissionInstanceDetailVo missionInstanceDetailVo= workerMissionDataService.getInstanceByUsernameAndMissionId(username, missionId) ;
        if(missionInstanceDetailVo==null)
            throw new InstanceNotExistException();
        Mission mission=workerMissionDataService.getMissionByMissionId(missionInstanceDetailVo.getMissionId());
        MissionQueryDetailResponse missionQueryDetailResponse=new MissionQueryDetailResponse(new MissionRequesterQueryDetailVo(mission.getTitle(),
                mission.getDescription(),new MissionVo(mission.getMissionType()),
                mission.getMissionState(),mission.getCoverUrl(),mission.getUrls()));
        return missionQueryDetailResponse;
    }


    /**
     * save the progress of the instance
     *
     * @param missionInstanceItemVo
     * @return whether to save successful or not
     */
    @Override
    public SuccessResponse saveProgress(MissionInstanceItemVo missionInstanceItemVo) throws SystemException {
        workerMissionDataService.saveInstance(missionInstanceItemVo);
        return new SuccessResponse("Success Save");
    }

    /**
     * save the progress of the instance and submit it
     *
     * @param missionInstanceItemVo
     * @return whether to save and submit successful or not
     */
    @Override
    public SuccessResponse submit(MissionInstanceItemVo missionInstanceItemVo) throws SystemException {
        workerMissionDataService.saveInstance(missionInstanceItemVo);
        return null;
    }
}
