package trapx00.tagx00.util;

import trapx00.tagx00.entity.account.TempUser;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.topic.TagConfTuple;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.user.UserSaveVo;
import trapx00.tagx00.vo.user.info.RequesterInfoVo;
import trapx00.tagx00.vo.user.info.WorkerInfoVo;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Converter {
    /**
     * convert userSaveVo to tempUser
     *
     * @param userSaveVo the userSaveVo
     * @param code       the validation code
     * @return the user
     */
    public static TempUser userSaveVoToTempUser(UserSaveVo userSaveVo, String code) {
        return new TempUser(userSaveVo.getUsername(),
            userSaveVo.getPassword(),
            userSaveVo.getEmail(),
            userSaveVo.getRole(),
            code,
            new Date(Instant.now().toEpochMilli())
        );
    }

    public static User tempUserToUser(TempUser tempUser) {
        return new User(
            tempUser.getUsername(),
            tempUser.getPassword(),
            tempUser.getEmail(),
            tempUser.getRole(), 0, 0,
            tempUser.getRegisterDate()
        );
    }

    public static RequesterInfoVo userToRequesterInfoVo(User user, int submittedMissionCount,
                                                        int instanceCount, int awaitingCommentInstanceCount,
                                                        int inProgressInstanceCount, int finalizedInstanceCount, int abandonedInstanceCount) {
        return new RequesterInfoVo(user.getUsername(), user.getEmail(), submittedMissionCount,
                instanceCount, awaitingCommentInstanceCount, inProgressInstanceCount,
                finalizedInstanceCount, abandonedInstanceCount);
    }

    public static WorkerInfoVo userToWorkerInfoVo(User user, int completedMissionCount, int acceptedMissionCount, int inProgressMissionCount, int abandonedMissionCount, int finalizedMissionCount) {
        return new WorkerInfoVo(user.getUsername(), user.getEmail(), user.getCredits(), user.getExp(), LevelUtil.calculateLevel(user.getExp()),
                completedMissionCount, acceptedMissionCount, inProgressMissionCount, abandonedMissionCount, finalizedMissionCount);
    }

    public static InstanceDetailVo instanceToInstanceDetailResponse(Instance instance) {
        return new InstanceDetailVo();
    }

    public static Map<String, Double> tagConfTupleListToMap(List<TagConfTuple> tagConfTuples) {
        Map<String, Double> map = new HashMap<>();
        for (TagConfTuple tagConfTuple : tagConfTuples) {
            map.put(tagConfTuple.getTag(), tagConfTuple.getConfidence());
        }
        return map;
    }

    public static List<TagConfTuple> MapToTagConfTupleList(Map<String, Double> map) {
        List<TagConfTuple> tagConfTupleList = new ArrayList<>();
        map.forEach((tag, confidence) -> tagConfTupleList.add(new TagConfTuple(tag, confidence)));
        return tagConfTupleList;
    }
}
