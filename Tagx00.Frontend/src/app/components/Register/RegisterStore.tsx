import {action, computed, observable} from "mobx";

class RegisterStore {
    @observable private step: number = 0;
    @action public nextStep = () => {
        this.step++;
    };
    @action public backStep = () => {
        this.step--;
    };

    @computed
    public get currentStep() {
        return this.step;
    }
}

export const registerStore = new RegisterStore();