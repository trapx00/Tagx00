export class TagTuple {
  tag: string;
  description: string[];

  constructor(params: Partial<TagTuple> = {}) {
    Object.assign(this,params);
  }
}


export class TagDescriptionTuple {
  tuples: TagTuple;
  descriptions: string[];


  constructor(params: Partial<TagDescriptionTuple> = {}) {
    Object.assign(this,params);
  }
}
