import {diseaseMapping} from './mappings.js';

/** @type { ActionRun } */
export const run = async ({ logger, api, connections }) => {
  const response = await fetch(
    "https://datasets-server.huggingface.co/rows?dataset=duxprajapati%2Fsymptom-disease-dataset&config=default&split=train&offset=5701&length=100",
    {
      method: "GET",
      headers:{"Content-Type":"application/json"}
    }
  );

  const responseJson = await response.json();
  logger.info({responseJson}, "returned db")

  const entries = responseJson.rows.map((entry)=>({
    symptoms: entry.row.text,
    diagnosis: Object.keys(diseaseMapping).find(key=>diseaseMapping[key]==entry.row.label),
    embedding: []
  }));
  logger.info("mapped properties");
  // get prompt for vector embedding
  const input = responseJson.rows.map(
    (entry)=>`${entry.row.text} are the symptoms of ${Object.keys(diseaseMapping).find(key=>diseaseMapping[key]==entry.row.label)}`
  );
  logger.info("created embed prompt");
  const embeddings = await connections.openai.embeddings.create({
    input,
    model:"text-embedding-ada-002"
  })
  logger.info("got embed");
  embeddings.data.forEach((entryEmbed, i)=>{
    entries[i].embedding=entryEmbed.embedding;
  })

  await api.internal.entry.bulkCreate(entries)
};
