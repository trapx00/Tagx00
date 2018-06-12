package trapx00.tagx00.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import trapx00.tagx00.config.jsonAdapter.*;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionJob;
import trapx00.tagx00.publicdatas.mission.video.VideoJob;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

public class GsonFactory {
    public static Gson get() {
        return new GsonBuilder()
            .registerTypeAdapter(MissionProperties.class, new MissionPropertiesAdapter())
            .registerTypeAdapter(InstanceDetailVo.class, new InstanceDetailAdapter())
            .registerTypeAdapter(MissionDetailVo.class, new MissionDetailAdapter())
            .registerTypeAdapter(MissionPublicItemVo.class, new MissionPublicItemAdapter())
            .registerTypeAdapter(TextMissionSetting.class, new TextMissionSettingAdapter())
            .registerTypeAdapter(TextJob.class, new TextJobAdapter())
            .registerTypeAdapter(ImageJob.class, new ImageJobAdapter())
            .registerTypeAdapter(AudioJob.class, new AudioJobAdapter())
            .registerTypeAdapter(VideoJob.class, new VideoJobAdapter())
            .registerTypeAdapter(ThreeDimensionJob.class, new ThreeDimensionJobAdapter())
            .create();
    }
}
