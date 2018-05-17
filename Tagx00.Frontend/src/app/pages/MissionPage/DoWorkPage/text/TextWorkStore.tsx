import { WorkerService } from "../../../../api/WorkerService";
import { Inject, Injectable } from "react.di";

@Injectable
export class TextWorkStore {
  constructor(@Inject private workerService: WorkerService) {}



}
