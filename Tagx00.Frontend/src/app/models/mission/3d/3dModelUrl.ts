export interface ThreeDimensionModelUrl {
  objUrl: string;
  mtlUrl: string;
}

export function modelUrlEquals(url1: ThreeDimensionModelUrl, url2: ThreeDimensionModelUrl) {
  if (!url1 || !url2) {
    return false;
  }
  return url1.mtlUrl === url2.mtlUrl && url1.objUrl=== url2.objUrl;
}
