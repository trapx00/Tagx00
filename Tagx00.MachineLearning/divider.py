import jieba.posseg as psg


class Divider:
    def cut(self, input):
        result = []
        for word in psg.cut(input):
            if self.isSatisfyingCondition(word):
                result.append(word.word)
        return result

    def isSatisfyingCondition(self, word):
        return word.flag.startswith('n') | word.flag.startswith('a') | word.flag.startswith('d') | word.flag.startswith(
            's')


divider = Divider()
