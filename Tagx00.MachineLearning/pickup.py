import jieba.analyse


class Pickup:
    def pickup(self, content):
        trank = jieba.analyse.TextRank()
        trank.span = 5
        words = trank.textrank(content, topK=2,
                               allowPOS=['ns', 'n', 'vn', 'v', 'nr', 'x'])
        return words


pickup = Pickup()
