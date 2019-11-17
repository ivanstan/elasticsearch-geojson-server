import {Client} from "@elastic/elasticsearch";

class ElasticSearchIndex {
  private readonly client: Client;
  private readonly name: string;

  public constructor(client: Client, name: string) {
    this.client = client;
    this.name = name;
  }

  public async create() {
    return await this.client.indices.create({
      index: this.name,
    });
  }

  public async delete() {
    return await this.client.indices.delete({
      index: this.name,
    });
  }

}

// (new ElasticSearchIndex())

// deleteIndex().catch(response => console.log(response));
// createIndex().catch(response => console.log(response));
