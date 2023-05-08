export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.iframe = this.document.getElementById("triggerIframe");
  }

  async init() {
    await this.iframe.enableCombine("trigger");
    let dimensions = await this.iframe.combine.size();
    this.iframe.style.height = dimensions.height + "px";
    this.resizeObserver();
  }

  async resizeObserver() {
    while (true) {
      await this.iframe.combine.resizeObserver();
      let dimensions = await this.iframe.combine.size();
      this.iframe.style.height = dimensions.height + "px";
    }
  }

  async setConfig(config) {
    this.config = config;
    this.iframeSrc = new URL(config.api);
    this.iframeSrc.pathname = "/triggerCreator/";
    this.iframeSrc = this.iframeSrc.href;
    this.iframe.src = this.iframeSrc;

    this.initPromise = this.init();
    await this.initPromise;
  }

  async setValue(v) {
    await this.initPromise;
    this.value = v;
    this.iframe.combine.setTriggerConfig(v.config);
  }

  async getValue() {
    return {
      evaluate: this.config.evaluate,
      api: this.config.api,
      config: await this.iframe.combine.getTriggerConfig(),
    };
  }
}
