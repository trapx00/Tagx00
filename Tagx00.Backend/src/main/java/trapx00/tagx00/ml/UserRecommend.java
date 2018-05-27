package trapx00.tagx00.ml;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.dataservice.topic.TopicDataService;

public class UserRecommend {
    private final TopicDataService topicDataService;
    private final PublicMissionDataService publicMissionDataService;
    private final UserDataService userDataService;

    @Autowired
    public UserRecommend(TopicDataService topicDataService, PublicMissionDataService publicMissionDataService, UserDataService userDataService) {
        this.topicDataService = topicDataService;
        this.publicMissionDataService = publicMissionDataService;
        this.userDataService = userDataService;
    }
//
//    public ArrayList<String> getSimilarUser() {
//        ArrayList<String> result = new ArrayList<>();
//        User[] users=userDataService.findAllUsers();
//
//        double[][] userTagScoreTable=new double[users.length][]
//        Instance[] instances = publicMissionDataService.getInstances();
//
//    }
}
