package trapx00.tagx00.dataservice.topic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.pay.PayVo;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

public class TopicDataServiceTest {
    @Autowired
    private TopicDataService topicDataService ;

    @Before
    public void setUp() throws Exception {

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void isTopicExists() {
        assertEquals(false,topicDataService.isTopicExists("不知道"));
    }

    @Test
    public void addTopic() {
        try{
            topicDataService.addTopic("国画");
            assertEquals(true,topicDataService.isTopicExists("国画"));
        }catch (SystemException e){

        }

    }

    @Test
    public void getAllTopics() {
        try {
            topicDataService.addTopic("国画");

            assertEquals(1,topicDataService.getAllTopics().size());
        }catch (SystemException e){

        }


    }

    @Test
    public void deleteTopics() {
        try{
            topicDataService.addTopic("金庸");
            ArrayList<Integer> p=new ArrayList<>();
            p.add(1);
            topicDataService.deleteTopics(p);
            assertEquals(false,topicDataService.isTopicExists("金庸"));
        }catch (SystemException e){

        }


    }
}
