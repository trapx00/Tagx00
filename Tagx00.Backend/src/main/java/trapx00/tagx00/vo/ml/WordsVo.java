package trapx00.tagx00.vo.ml;

import java.util.List;

public class WordsVo {
    private List<String> words;

    public WordsVo() {
    }

    public WordsVo(List<String> words) {
        this.words = words;
    }

    public List<String> getWords() {
        return words;
    }

    public void setWords(List<String> words) {
        this.words = words;
    }
}
