package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionDoesNotExistFromUsernameException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
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
     * query to get all instances of workers
     *
     * @param workerusername
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public MissionQueryResponse queryOnesAllMissions(String workerusername) throws MissionDoesNotExistFromUsernameException {

        MissionWorkerQueryItemVo[]result= workerMissionDataService.getInstanceByWorkerUsername(workerusername);

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
     * @param workerusername
     * @return whether the abortion is successful
     */
    @Override
    public SuccessResponse abort(int missionId, String workerusername) {
        workerMissionDataService.deleteInstance(missionId, workerusername) ;
        return new SuccessResponse("Success Delete");
    }

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param workerusername
     * @return MissionQueryDetailResponse the detail of the mission
     */
    @Override
    public MissionQueryDetailResponse getInstanceInformation(int missionId, String workerusername) throws InstanceNotExistException {
        InstanceDetailVo missionInstanceDetailVo= workerMissionDataService.getInstanceByUsernameAndMissionId(workerusername, missionId) ;
        if(missionInstanceDetailVo==null)
            throw new InstanceNotExistException();
        Mission mission=workerMissionDataService.getMissionByMissionId(missionInstanceDetailVo.getMissionId());
        MissionQueryDetailResponse missionQueryDetailResponse=new MissionQueryDetailResponse(new MissionRequesterQueryDetailVo(mission.getTitle(),
                mission.getDescription(),new MissionProperties(mission.getMissionType()),
                mission.getMissionState(),mission.getCoverUrl(),mission.getUrls()));
        return missionQueryDetailResponse;
    }


    /**
     * save the progress of the instance
     *
     * @param instanceVo
     * @return whether to save successful or not
     */
    @Override
    public SuccessResponse saveProgress(InstanceVo instanceVo) throws SystemException {
        workerMissionDataService.saveInstance(instanceVo);
        return new SuccessResponse("Success Save");
    }

    /**
     * save the progress of the instance and submit it
     *
     * @param instanceVo
     * @return whether to save and submit successful or not
     */
    @Override
    public SuccessResponse submit(InstanceVo instanceVo) throws SystemException {
        workerMissionDataService.saveInstance(instanceVo);
        return null;
    }
}
