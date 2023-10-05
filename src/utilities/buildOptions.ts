/**
 * @module buildOptions
 * buildOptions for Sequelize
 * Sequelize takes an options object, that can be quite complex
 * We only support one query param right now though
 */

interface QueryOptions {
    created?: string;
}

const buildOptions = (query: QueryOptions = {}) => {
    const created = query['created'];
    if (created) {
        return {
            order: [['createdAt', created]],
        };
    } else {
        return {};
    }
};

export default buildOptions;
