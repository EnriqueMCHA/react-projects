export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: unknown }) => {
  const response = await fetch(
    `https://randomuser.me/api/?results=5&seed=rike&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await response.json();
  const currentPage = Number(res.info.page) + 1;
  const nextCursor = currentPage > 2 ? undefined : currentPage;

  return {
    users: res.results,
    nextCursor,
  };
};