const paginate = (query, { page, page_size }) => {
  page_size = Number(page_size) > 0 ? Number(page_size) : 5;
  page = Number(page) > 0 ? Number(page) - 1 : 0;

  const offset = Number(page) * Number(page_size);
  const limit = Number(page_size);

  return {
    ...query,
    offset,
    limit,
  };
};

module.exports = paginate;
