package trapx00.tagx00.datacollect;

import net.sf.json.JSONObject;
import trapx00.tagx00.util.ApiUtil;

import java.io.*;

public class DataCollector {

    private static final String akId = "LTAIfeJPa5mmsKhL";
    private static final String akSecret = "Dfz3Tj7Tyuojl84vSBHX7E9eluivj5";
    private static final String imageHostUrl = "https://dtplus-cn-shanghai.data.aliyuncs.com/image/tag";

    public static void main(String[] args) {
        try {
            File file = new File("/Users/apple/Documents/workspace/java/SE3/Tagx00.MachineLearning/data/proval/TagedData.txt");
            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file, true)));

            for (int i = 0; i < 2; i++) {
                String url = "https://images.shobserver.com/news/690_390/2018/1/10/a3dd9cc4-c094-44e0-84e2-69c00c4bc1f2.jpg";
                String body = "{\"type\":0," +
                        "\"image_url\":\"" + url + "\"}";
                String response = JSONObject.fromObject(ApiUtil.sendPost(imageHostUrl, body, akId, akSecret)).get("tags").toString();
                out.write(response);
                out.newLine();
            }
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
