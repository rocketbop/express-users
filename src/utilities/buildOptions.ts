/**
 * @module buildOptions
 * buildOptions for Sequelize
 * Sequelize takes an options object, that can be quite complex
 * We only support one query param right now though
 */

const SortDirections = {
    ASC: 'ASC',
    DESC: 'DESC',
};

interface QueryOptions {
    created?: string;
}

const buildOptions = (query: QueryOptions = {}) => {
    const created = query['created'];
    if (created && (created === SortDirections.ASC || created === SortDirections.DESC)) {
        return {
            order: [['createdAt', created]],
        };
    } else {
        return {};
    }
};

export default buildOptions;
export type { QueryOptions as QueryOptionsType };
export { SortDirections };
