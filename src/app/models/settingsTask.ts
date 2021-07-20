import {type} from "os";

export class SettingsTask {

  allowed_tries: number;
  time_check_amount: number;
  attributes: Array<Attribute>
  annotator?: Annotator;
  countdown_time?: number;
  blacklist_batches: Array<string>;
  whitelist_batches: Array<string>;
  messages?: Array<string>;
  documentTimes?: Object;

  constructor(
    data = null as JSON
  ) {
    if(data) {
      if ('domains_to_filter' in data) {
        data['domains_filter'] = data['domains_to_filter']
        delete data['domains_to_filter']
      }
    }
    this.allowed_tries =  data ? parseInt((data["allowed_tries"])) : 0;
    this.time_check_amount = data? parseInt((data["time_check_amount"])): 0;
    this.attributes = new Array<Attribute>()
    if (data) {
      if ('attributes' in data) {
        let attributes = data["attributes"] as Array<JSON>
        for (let attribute of attributes) this.attributes.push(new Attribute(attribute))
      }
    }
    this.annotator =          data ?  data["annotator"] ? new Annotator(data["annotator"]) : null : null;
    this.countdown_time =     data ?   data["countdown_time"] ? parseInt((data["countdown_time"])): null : null;
    this.documentTimes =      data ? data["documentTimes"] ? new Object(data['documentTimes']) : null : null;
    this.blacklist_batches = new Array<string>();
    if(data) if('blacklist_batches' in data) for (let batch of data["blacklist_batches"] as Array<string>) this.blacklist_batches.push(batch)
    this.whitelist_batches = new Array<string>();
    if(data) if('whitelist_batches' in data) for (let batch of data["whitelist_batches"] as Array<string>) this.whitelist_batches.push(batch)
    this.messages = new Array<string>();
    if(data) {
      if (data['messages']) {
        for (let message of data["messages"]) this.messages.push(message)
      }
    }
  }

}

export class Attribute {

  show: boolean;
  annotate: boolean;

  constructor(
    data: JSON
  ) {
    this.show = data["show"];
    this.annotate = data["annotate"];
  }

}

export class Annotator {

  type: string;
  values?: Array<Object>

  constructor(
    data: JSON
  ) {
    this.type =     data["type"];
    this.values =     data["values"] ? data["values"]  : null;
  }

}
