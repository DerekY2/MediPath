/** @type { ActionRun } */
export const run = async ({ params, logger, api, connections }) => {
  const { symptoms } = params;

  if (!symptoms) {
    throw new Error("Entry is blank; please enter your symptoms");
  }

  const response = await connections.openai.embeddings.create({
    input: symptoms,
    model: "text-embedding-ada-002",
  });

  const entries = await api.entry.findMany({
    sort: {
      embedding: {
        cosineSimilarityTo: response.data[0].embedding,
      },
    },
    first: 1,
    select: {
      id: true,
      diagnosis: true,
    },
  });
  
  // const filteredEntries = entries.filter(
  //   (entry, index) => entries.findIndex((m) => m.diagnosis === entry.diagnosis) === index
  // );
  return entries;
  };

  export const params = {
    symptoms: { type: "string" },
  };
;