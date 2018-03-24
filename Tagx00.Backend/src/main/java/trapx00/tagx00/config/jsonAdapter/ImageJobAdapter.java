package trapx00.tagx00.config.jsonAdapter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.google.gson.*;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.io.IOException;
import java.lang.reflect.Type;

public class ImageJobAdapter implements JsonDeserializer<ImageJob> {

    @Override
    public ImageJob deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        Gson gson = new Gson();
        return gson.fromJson(json,
            ImageMissionType.valueOf(
                json.getAsJsonObject().get("type").getAsString()
            ).clazz);
    }
}
