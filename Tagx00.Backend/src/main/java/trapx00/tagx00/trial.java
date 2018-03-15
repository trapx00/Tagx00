package trapx00.tagx00;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.image.whole.ImageWholeJob;
import trapx00.tagx00.util.PathUtil;
import trapx00.tagx00.vo.mission.image.ImageJobType;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class trial {
    public static void main(String[] args) {
        ArrayList<String> arrayList = new ArrayList<>();
        arrayList.add("123");
        TagDescriptionTuple tagDescriptionTuple = new TagDescriptionTuple(null, arrayList);
        tagDescriptionTuple.setDescriptions(arrayList);
        ImageWholeJob imageJob = new ImageWholeJob(ImageJobType.WHOLE, tagDescriptionTuple);
        ImageJob trial = imageJob;

        try {
            FileOutputStream fileOut =
                    new FileOutputStream(PathUtil.getSerPath()+"trial.ser");
            ObjectOutputStream out = new ObjectOutputStream(fileOut);
            out.writeObject(trial);
            out.close();
            fileOut.close();
            System.out.println("Serialized data is saved in /tmp/employee.ser");
        } catch (IOException i) {
            i.printStackTrace();
        }
    }
}
