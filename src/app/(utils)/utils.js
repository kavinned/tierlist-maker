import Airtable from "airtable";

const airtable = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN,
});
const base = airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export const transformToDatabaseFormat = (tierList, tierListName) => {
    return {
        fields: {
            id: Date.now().toString(),
            name: tierListName,
            items: JSON.stringify(tierList),
        },
    };
};

export const transformFromDatabaseFormat = (data) => {
    return {
        id: data.fields.id,
        items: JSON.parse(data.fields.items),
        tierListName: data.fields.name,
    };
};

export const createEntry = async (tierList, tierListName) => {
    return new Promise((resolve, reject) => {
        base("Table 1").create(
            [
                {
                    fields: {
                        id: Date.now().toString(),
                        tierListName: tierListName,
                        items: JSON.stringify(tierList),
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    records.forEach(function (record) {
                        resolve({ records, recordId: record.getId() });
                    });
                }
            }
        );
    });
};

export const updateEntry = async (tierList, tierListName, id, recordId) => {
    // console.log(tierList, tierListName, id, recordId);

    return new Promise((resolve, reject) => {
        base("Table 1").update(
            [
                {
                    id: recordId,
                    fields: {
                        id: id,
                        tierListName: tierListName,
                        items: JSON.stringify(tierList),
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    records.forEach(function (record) {
                        console.log(record.get("id"));
                    });
                    resolve(records);
                }
            }
        );
    });
};

export const saveTierList = async (tierList, tierListName, id, recordId) => {
    if (!recordId) {
        return createEntry(tierList, tierListName);
    } else {
        return updateEntry(tierList, tierListName, id, recordId);
    }
};

export const getRecordById = async (id) => {
    try {
        const records = await base("Table 1")
            .select({
                filterByFormula: `{id} = '${id}'`,
            })
            .firstPage();

        if (records && records.length > 0) {
            return records[0];
        }
        throw new Error("Record not found");
    } catch (error) {
        console.error("Error finding record:", error);
        throw error;
    }
};
