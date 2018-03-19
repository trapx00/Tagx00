package trapx00.tagx00.data.fileservice;

import net.sf.json.JSONObject;
import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.exception.daoexception.IdDoesNotExistException;
import trapx00.tagx00.util.AnnotationUtil;

import java.io.*;
import java.lang.reflect.Field;
import java.util.ArrayList;

public interface FileService<T> {

    /**
     * save the entity
     *
     * @param entity the entity object
     * @return the entity if success else return null
     */
     T saveTuple(T entity);

    /**
     * find a entity
     *
     * @param info the key info to find
     * @return the entity
     */
    T findOne(String info, Class<T> clazz);

    void delete(String id, Class<T> clazz);


    T[] findOnes(String info,Class<T> clazz);
}

