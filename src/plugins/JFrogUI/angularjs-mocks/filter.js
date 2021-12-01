import { VueFactory } from "../../../services/VueFactory";

export function AngularFilterServiceMock(filterName) {
    const { Vue } = VueFactory.getInstance();
    return Vue.filter(filterName);
}
