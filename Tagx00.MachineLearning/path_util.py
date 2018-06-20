import os


class PathUtil():
    @staticmethod
    def get_path():
        # return "./data/"
        return "/Users/apple/Documents/workspace/java/SE3/Tagx00.MachineLearning/data/"

    @staticmethod
    def init_path():
        PathUtil.mkdir(PathUtil.get_path() + "proval")
        PathUtil.mkdir(PathUtil.get_path() + "trainmodels")
        with open(PathUtil.get_path() + "proval/test.txt", "w") as file:
            file.write(
                "{'url': 'http://tagx00.oos-bj2.ctyunapi.cn/image_image-2_2?AWSAccessKeyId=c4582dec5d0809103126"
                "&Expires=9223372036854775&Signature=onaf5Pg7iLi4OobUf9tDUewNyAg%3D', 'tags': ['勋章'], 'response': [{"
                "'tag': '宝座', 'confidence': 0.59}, {'tag': '波洛领带', 'confidence': 0.14}, {'tag': '胸甲', 'confidence': "
                "0.13}, {'tag': '搭扣', 'confidence': 0.12}, {'tag': '勋章', 'confidence': 0.3}]}")
            file.write('\n')
            file.write(
                "{'url': 'http://tagx00.oos-bj2.ctyunapi.cn/image_image-2_2?AWSAccessKeyId=c4582dec5d0809103126"
                "&Expires=9223372036854775&Signature=onaf5Pg7iLi4OobUf9tDUewNyAg%3D', 'tags': ['勋章'], 'response': [{"
                "'tag': '宝座', 'confidence': 0.59}, {'tag': '波洛领带', 'confidence': 0.14}, {'tag': '胸甲', 'confidence': "
                "0.13}, {'tag': '搭扣', 'confidence': 0.12}, {'tag': '勋章', 'confidence': 0.3}]}")
            file.write('\n')
            file.write(
                "{'url': 'http://tagx00.oos-bj2.ctyunapi.cn/image_image-2_2?AWSAccessKeyId=c4582dec5d0809103126"
                "&Expires=9223372036854775&Signature=onaf5Pg7iLi4OobUf9tDUewNyAg%3D', 'tags': ['勋章'], 'response': [{"
                "'tag': '宝座', 'confidence': 0.59}, {'tag': '波洛领带', 'confidence': 0.14}, {'tag': '胸甲', 'confidence': "
                "0.13}, {'tag': '搭扣', 'confidence': 0.12}, {'tag': '勋章', 'confidence': 0.3}]}")
        with open(PathUtil.get_path() + "proval/train_aliyun.txt", "w") as file:
            file.write(
                "{'url': 'http://tagx00.oos-bj2.ctyunapi.cn/image_image-2_2?AWSAccessKeyId=c4582dec5d0809103126"
                "&Expires=9223372036854775&Signature=onaf5Pg7iLi4OobUf9tDUewNyAg%3D', 'tags': ['勋章'], 'response': [{"
                "'tag': '宝座', 'confidence': 0.59}, {'tag': '波洛领带', 'confidence': 0.14}, {'tag': '胸甲', 'confidence': "
                "0.13}, {'tag': '搭扣', 'confidence': 0.12}, {'tag': '勋章', 'confidence': 0.3}]}")

        with open(PathUtil.get_path() + "proval/train_baidu.txt", "w") as file:
            file.write(
                "{'url': 'http://tagx00.oos-bj2.ctyunapi.cn/image_image-2_2?AWSAccessKeyId=c4582dec5d0809103126"
                "&Expires=9223372036854775&Signature=onaf5Pg7iLi4OobUf9tDUewNyAg%3D', 'tags': ['勋章'], 'response': [{"
                "'tag': '宝座', 'confidence': 0.59}, {'tag': '波洛领带', 'confidence': 0.14}, {'tag': '胸甲', 'confidence': "
                "0.13}, {'tag': '搭扣', 'confidence': 0.12}, {'tag': '勋章', 'confidence': 0.3}]}")

    @staticmethod
    def mkdir(path):
        folder = os.path.exists(path)
        if not folder:  # 判断是否存在文件夹如果不存在则创建为文件夹
            os.makedirs(path)  # makedirs 创建文件时如果路径不存在会创建这个路径
            print
            "---  new folder...  ---"
            print
            "---  OK  ---"
        else:
            print
            "---  There is this folder!  ---"
