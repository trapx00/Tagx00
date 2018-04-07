package trapx00.tagx00.data.admin;

import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.dataservice.admin.AdminInfoDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;

import java.util.ArrayList;

@Service
public class AdminInfoDataServiceImpl implements AdminInfoDataService {
    private final UserDao userDao;
    private final ImageMissionDao imageMissionDao;
    private final ImageInstanceDao imageInstanceDao;

    public AdminInfoDataServiceImpl(UserDao userDao, ImageMissionDao imageMissionDao, ImageInstanceDao imageInstanceDao) {
        this.userDao = userDao;
        this.imageMissionDao = imageMissionDao;
        this.imageInstanceDao = imageInstanceDao;
    }

    /**
     * get all userInfo
     *
     * @return
     */
    @Override
    public User[] getUsers() {
        ArrayList<User> userArrayList = new ArrayList<>();
        return userArrayList.toArray(new User[userArrayList.size()]);
    }

    /**
     * get all MissionsInfo
     *
     * @return Mission
     */
    @Override
    public Mission[] getMissions() {
        ArrayList<Mission> missionArrayList = new ArrayList<>();

        missionArrayList.addAll(imageMissionDao.findAll());

        return missionArrayList.toArray(new Mission[missionArrayList.size()]);
    }

    /**
     * get all InstanceInfo
     *
     * @return Instance
     */
    @Override
    public Instance[] getInstances() {
        ArrayList<Instance> instanceArrayList = new ArrayList<>();

        instanceArrayList.addAll(imageInstanceDao.findAll());

        return instanceArrayList.toArray(new Instance[instanceArrayList.size()]);
    }
}
