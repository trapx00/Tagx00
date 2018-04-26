package trapx00.tagx00.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.publicdatas.mission.MissionState;

import java.util.Date;

@Aspect
@Component
public class MissionStateAspect {
    @Autowired
    private ImageMissionDao imageMissionDao;

    @Pointcut("execution(public * trapx00.tagx00.data.mission.*.*(..))")
    public void missionAccess() {
    }

    @Before("missionAccess()")
    public void doUpdateMissionState() {
        updateAllMissionState();
    }

    private void updateAllMissionState() {
        for (ImageMission imageMission : imageMissionDao.findAll()) {
            MissionState missionState = getMissionState(imageMission.getStart(), imageMission.getEnd());
            if (missionState != imageMission.getMissionState()) {
                imageMission.setMissionState(missionState);
                imageMissionDao.saveMission(imageMission);
            }
        }
    }

    private MissionState getMissionState(Date startDate, Date endDate) {
        double nowTime = new Date().getTime();
        if (startDate.getTime() > nowTime) {
            return MissionState.PENDING;
        } else if (startDate.getTime() <= nowTime && endDate.getTime() >= nowTime) {
            return MissionState.ACTIVE;
        } else {
            return MissionState.ENDED;
        }
    }
}
