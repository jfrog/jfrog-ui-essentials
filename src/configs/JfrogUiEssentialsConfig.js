export const jfrogUiEssentialsConfig = () => {
    let injections = $jfrog.get(['$qProvider']);
    injections.$qProvider.errorOnUnhandledRejections(false);
}
