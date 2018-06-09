package trapx00.tagx00.datacollect;

import net.sf.json.JSONObject;
import trapx00.tagx00.util.ApiUtil;

import java.io.*;

public class DataCollector {

    private static final String akId = "LTAIfeJPa5mmsKhL";
    private static final String akSecret = "Dfz3Tj7Tyuojl84vSBHX7E9eluivj5";
    private static final String imageHostUrl = "https://dtplus-cn-shanghai.data.aliyuncs.com/image/tag";
    private static final int DATA_NUM = 110;

    public static void main(String[] args) {
        try {
            String[] urls = new String[DATA_NUM];
            int randomStart = (int) (Math.random() * 10000);
            File file = new File("/Users/apple/Documents/workspace/java/SE3/Tagx00.MachineLearning/data/proval/train.txt");
            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file, true)));
            File dataFile = new File("/Users/apple/Downloads/fall11_urls.txt");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(dataFile)));
            for (int j = 0; j < randomStart; j++) {
                bufferedReader.readLine();
            }
            for (int i = 0; i < DATA_NUM; i++) {
                for (int j = 0; j < 2000; j++) {
                    bufferedReader.readLine();
                }
                String line = bufferedReader.readLine();
                urls[i] = bufferedReader.readLine().split("\t")[1];
            }
            bufferedReader.close();

            for (int i = 0; i < DATA_NUM; i++) {
                String url = urls[i];
                String body = "{\"type\":0," +
                        "\"image_url\":\"" + url + "\"}";
                try {
                    String response = JSONObject.fromObject(ApiUtil.sendPost(imageHostUrl, body, akId, akSecret)).get("tags").toString();
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.element("url", url);
                    jsonObject.element("response", response);
                    out.write(jsonObject.toString());
                    out.newLine();
                    out.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
