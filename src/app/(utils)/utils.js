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
    try {
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
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                });
            }
        );
    } catch (error) {
        console.error("Error saving to Airtable:", error);
        throw error;
    }
};

export const updateEntry = async (tierList, tierListName, id, recordId) => {
    console.log(tierList, tierListName, id, recordId);

    try {
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
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.get("id"));
                });
            }
        );
    } catch (error) {
        console.error("Error updating to Airtable:", error);
        throw error;
    }
};

export const saveTierList = async (tierList, tierListName, id, recordId) => {
    if (!id) {
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
